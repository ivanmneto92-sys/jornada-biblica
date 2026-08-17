import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Termos de Uso · Jornada Bíblica',
}

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-6 px-4 pt-6 pb-10 sm:px-6 sm:pt-10">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Voltar
      </Link>

      <h1 className="font-serif text-2xl">Termos de Uso</h1>
      <p className="text-sm text-muted-foreground">Última atualização: agosto de 2026.</p>

      <Card>
        <CardContent className="flex flex-col gap-6 text-sm leading-relaxed text-pretty">
          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Sobre o app</h2>
            <p>
              Jornada Bíblica é um app gratuito e sem fins comerciais, criado para ajudar pessoas
              a ler e entender a Bíblia através de jornadas guiadas de leitura, anotações e
              acompanhamento de progresso.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Sua conta</h2>
            <p>
              Você é responsável por manter sua senha em segurança. Use um e-mail válido: é por
              ele que confirmamos seu cadastro e enviamos links de recuperação de senha.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Conteúdo bíblico</h2>
            <p>
              Os textos bíblicos exibidos no app são de tradução em domínio público (Almeida) e
              fornecidos por um serviço de terceiros. Fazemos o possível para manter o texto
              disponível, mas não garantimos disponibilidade contínua desse serviço externo.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Seu conteúdo</h2>
            <p>
              Anotações, respostas e versículos que você guarda são seus. Usamos esse conteúdo
              apenas para exibir de volta para você dentro do app — não o publicamos, compartilhamos
              ou usamos para nenhum outro fim.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Cancelamento</h2>
            <p>
              Você pode excluir sua conta a qualquer momento pelo app (Perfil → Excluir conta).
              Isso remove permanentemente seu login e todos os seus dados.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Alterações</h2>
            <p>
              Podemos atualizar estes termos conforme o app evolui. Mudanças relevantes serão
              comunicadas dentro do próprio app.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
