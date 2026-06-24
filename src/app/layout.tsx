import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Em Memória — José Marcos Melo Damasceno Junior",
  description:
    "Página memorial em homenagem a José Marcos Melo Damasceno Junior. Compartilhe suas lembranças e deixe uma mensagem de carinho.",
  keywords: ["memorial", "homenagem", "lembrança", "in memoriam"],
  openGraph: {
    title: "Em Memória — José Marcos Melo Damasceno Junior",
    description: "Compartilhe suas lembranças e deixe uma mensagem de carinho.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
