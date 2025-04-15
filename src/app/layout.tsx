import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Legião de Maria',
    default: 'Legião de Maria',
  },
  description:
    'Sistema feito para facilitar o processo de escrita da Ata, Relatórios e outras atividades da Legião de Maria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`flex flex-col min-h-screen ${poppins.className}`}>
        <header className="border-b">
          <div className="container flex mx-auto h-16 items-center">
            <h1 className="text-2xl font-bold">Legião Web</h1>
            <nav className="ml-auto flex gap-4">
              <Link href="/curia/minute/new">
                <Button variant="default" className="cursor-pointer">
                  Nova Ata
                </Button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 container mx-auto py-10">{children}</main>
        <footer className="border-t py-6">
          <div className="container mx-auto flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              Legião Web - Sistema de Gerenciamento
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
