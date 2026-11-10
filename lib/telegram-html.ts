export type TelegramPost = {
  id: string;
  channel: string;
  date: string;
  datetime: string;
  text: string;
  image?: string;
  url: string;
};

function character(code: number) {
  if (!Number.isInteger(code) || code < 0 || code > 0x10ffff) return "";
  return String.fromCodePoint(code);
}

function decode(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => character(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => character(parseInt(code, 16)));
}

function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, "");
}

function safeHttp(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    return undefined;
  }
  return undefined;
}

export function htmlToText(html: string) {
  const withLinks = html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(
    /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href: string, label: string) => {
      const safe = safeHttp(decode(href));
      const text = decode(stripTags(label)).trim();
      if (!safe) return text;
      if (!text || text === safe) return safe;
      return `${text} (${safe})`;
    },
  );
  return decode(stripTags(withLinks))
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 8000);
}

function postImage(chunk: string) {
  const matches = chunk.matchAll(/background-image:\s*url\((['"]?)([^'")]+)\1\)/gi);
  for (const match of matches) {
    let url = decode(match[2]);
    if (url.startsWith("//")) url = `https:${url}`;
    if (!url.startsWith("https://")) continue;
    try {
      const host = new URL(url).hostname;
      if (/^cdn\d+\.telesco\.pe$/.test(host)) return url;
    } catch {
      continue;
    }
  }
  return undefined;
}

export function parseTelegramChannel(html: string, channel: string): TelegramPost[] {
  const marks = [...html.matchAll(/<div class="([^"]*)" data-post="([A-Za-z0-9_]+)\/(\d+)"/g)];
  const posts: TelegramPost[] = [];

  for (let index = 0; index < marks.length; index += 1) {
    const mark = marks[index];
    const className = mark[1] ?? "";
    const name = mark[2] ?? "";
    const id = mark[3] ?? "";
    if (!className.includes("tgme_widget_message") || className.includes("service")) continue;
    if (name.toLowerCase() !== channel.toLowerCase()) continue;

    const start = mark.index ?? 0;
    const end = marks[index + 1]?.index ?? start + 30000;
    const chunk = html.slice(start, end);
    const datetime = chunk.match(/<time[^>]*datetime="([^"]+)"/)?.[1];
    if (!datetime || !/^\d{4}-\d{2}-\d{2}/.test(datetime)) continue;

    const textHtml = chunk.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
    const text = htmlToText(textHtml);
    const image = postImage(chunk);
    if (!text && !image) continue;

    posts.push({
      id,
      channel: name,
      date: datetime.slice(0, 10),
      datetime,
      text,
      image,
      url: `https://t.me/${name}/${id}`,
    });
  }

  return posts;
}
