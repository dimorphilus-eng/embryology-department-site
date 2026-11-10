import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { site } from "@/content/site";
import { parseTelegramChannel, type TelegramPost } from "@/lib/telegram-html";

const ttlMs = 20_000;
const archiveLimit = 200;

type Memory = { at: number; posts: TelegramPost[] };

let memory: Memory | null = null;
let pending: Promise<TelegramPost[]> | null = null;

export function channelUsername() {
  return normalizeChannel(process.env.TELEGRAM_CHANNEL?.trim() || site.telegram);
}

function normalizeChannel(value: string) {
  const fromUrl = value.match(/(?:https?:\/\/)?(?:www\.)?t\.me\/(?:s\/)?@?([A-Za-z0-9_]{3,32})/i);
  if (fromUrl?.[1]) return fromUrl[1];
  const plain = value.trim().replace(/^@/, "");
  if (/^[A-Za-z0-9_]{3,32}$/.test(plain)) return plain;
  return null;
}

function archiveFile() {
  return path.join(process.cwd(), "data", "telegram.json");
}

function readArchive(channel: string): TelegramPost[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(archiveFile(), "utf8")) as { channel?: string; posts?: TelegramPost[] };
    if (parsed.channel?.toLowerCase() !== channel.toLowerCase() || !Array.isArray(parsed.posts)) return [];
    return parsed.posts.filter((post) => post && post.channel?.toLowerCase() === channel.toLowerCase() && /^\d+$/.test(post.id));
  } catch {
    return [];
  }
}

function writeArchive(channel: string, posts: TelegramPost[]) {
  try {
    const file = archiveFile();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, `${JSON.stringify({ channel, posts }, null, 2)}\n`);
    fs.renameSync(tmp, file);
  } catch {
    // The feed still renders from memory when the disk is read-only.
  }
}

function merge(current: TelegramPost[], fresh: TelegramPost[]) {
  const byId = new Map<string, TelegramPost>();
  for (const post of current) byId.set(post.id, post);
  for (const post of fresh) byId.set(post.id, post);
  return [...byId.values()]
    .sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
    .slice(0, archiveLimit);
}

function previewUrl(channel: string) {
  const origin = process.env.TELEGRAM_PREVIEW_ORIGIN?.trim().replace(/\/$/, "");
  if (origin && /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(origin)) {
    return `${origin}/s/${channel}`;
  }
  return `https://t.me/s/${channel}`;
}

async function fetchPreview(channel: string) {
  const response = await fetch(previewUrl(channel), {
    headers: {
      accept: "text/html",
      "user-agent": "EmbryologyDepartmentSite/1.0",
    },
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) return [];
  return parseTelegramChannel(await response.text(), channel);
}

async function load(channel: string) {
  const archive = readArchive(channel);
  let fresh: TelegramPost[] = [];
  try {
    fresh = await fetchPreview(channel);
  } catch {
    fresh = [];
  }
  const posts = merge(archive, fresh);
  if (fresh.length > 0) {
    const changed = fresh.some((post) => {
      const previous = archive.find((item) => item.id === post.id);
      return !previous || previous.text !== post.text || previous.image !== post.image;
    });
    if (changed || archive.length !== posts.length) writeArchive(channel, posts);
  }
  memory = { at: Date.now(), posts };
  return posts;
}

export const getTelegramPosts = cache(async (): Promise<TelegramPost[]> => {
  const channel = channelUsername();
  if (!channel) return [];
  if (memory && Date.now() - memory.at < ttlMs) return memory.posts;
  if (!pending) {
    pending = load(channel).finally(() => {
      pending = null;
    });
  }
  return pending;
});

export async function getTelegramPost(id: string) {
  if (!/^\d{1,15}$/.test(id)) return undefined;
  const posts = await getTelegramPosts();
  return posts.find((post) => post.id === id);
}
