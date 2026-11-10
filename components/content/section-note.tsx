import { MarkdownView } from "@/components/content/markdown";
import { Container } from "@/components/layout/container";

export function SectionNote({ body }: { body: string }) {
  if (!body.trim()) return null;
  return (
    <Container className="pt-10">
      <article className="prose-academic max-w-3xl text-lg leading-relaxed">
        <MarkdownView source={body} />
      </article>
    </Container>
  );
}
