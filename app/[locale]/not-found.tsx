import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function LocaleNotFound() {
  return (
    <Container className="py-20">
      <h1 className="font-serif text-4xl">Страница не найдена</h1>
      <p className="mt-3 text-muted">Page not found.</p>
      <div className="mt-6 flex gap-4">
        <Link href="/ru" className="underline">
          На главную
        </Link>
        <Link href="/en" className="underline">
          Home
        </Link>
      </div>
    </Container>
  );
}
