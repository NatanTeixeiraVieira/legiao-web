import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Legião de Maria',
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
      <body className={poppins.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
