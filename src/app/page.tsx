import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <h1 className="text-2xl font-bold">Legião Web</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="/curia/ata/nova">
              <Button variant="default">Nova Ata</Button>
            </Link>
            <Link href="/curia/atas">
              <Button variant="outline">Listar Atas</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Módulo CÚRIA</h2>
          <p className="text-muted-foreground max-w-[600px]">
            Sistema para gerenciamento de atas, relatórios e atividades da
            Cúria.
          </p>
          <div className="flex gap-4">
            <Link href="/curia/ata/nova">
              <Button size="lg">Criar Nova Ata</Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            Legião Web - Sistema de Gerenciamento
          </p>
        </div>
      </footer>
    </div>
  );
}
