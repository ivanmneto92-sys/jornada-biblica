import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// acessíveis sem sessão; usuário autenticado é redirecionado pra fora delas
const GUEST_ONLY_PATHS = ['/entrar', '/cadastro', '/recuperar-senha']
// acessíveis sem sessão, mas também alcançáveis por quem já tem sessão
// (o link de recuperação de senha cria uma sessão temporária antes de chegar aqui)
const ALWAYS_PUBLIC_PATHS = ['/redefinir-senha', '/politica-de-privacidade', '/termos-de-uso']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))
  const isAlwaysPublicPath = ALWAYS_PUBLIC_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  if (!user && !isGuestOnlyPath && !isAlwaysPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/entrar'
    return NextResponse.redirect(url)
  }

  if (user && isGuestOnlyPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
