import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Política de Privacidade · Jornada Bíblica',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-6 px-4 pt-6 pb-10 sm:px-6 sm:pt-10">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Voltar
      </Link>

      <h1 className="font-serif text-2xl">Política de Privacidade</h1>
      <p className="text-sm text-muted-foreground">Última atualização: agosto de 2026.</p>

      <Card>
        <CardContent className="flex flex-col gap-6 text-sm leading-relaxed text-pretty">
          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Quais dados coletamos</h2>
            <p>
              Para criar sua conta, coletamos seu nome e e-mail. Durante o uso do app, guardamos o
              seu progresso de leitura (dias concluídos, sequência de dias), as anotações,
              perguntas e versículos que você escolhe guardar, e suas preferências de leitura
              (como tamanho de fonte).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Como usamos seus dados</h2>
            <p>
              Usamos esses dados exclusivamente para fazer o app funcionar: manter sua sessão
              conectada, sincronizar seu progresso entre aparelhos e mostrar seu histórico de
              leitura. Não vendemos, alugamos nem compartilhamos seus dados com terceiros para
              fins de publicidade. Não exibimos anúncios.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Onde seus dados ficam</h2>
            <p>
              Seus dados são armazenados de forma segura no Supabase (banco de dados
              PostgreSQL com autenticação), protegidos por regras de acesso que garantem que
              apenas você pode ver seu próprio progresso e suas próprias anotações.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Seus direitos</h2>
            <p>
              Você pode apagar seu progresso a qualquer momento (Perfil → Recomeçar a jornada) ou
              excluir sua conta permanentemente (Perfil → Excluir conta), o que remove seu login e
              todos os seus dados de forma irreversível.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-serif text-lg text-foreground">Contato</h2>
            <p>
              Dúvidas sobre privacidade? Escreva para{' '}
              <a href="mailto:ivanm.neto92@gmail.com" className="underline underline-offset-4">
                ivanm.neto92@gmail.com
              </a>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
