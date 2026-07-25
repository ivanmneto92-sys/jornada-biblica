import { NextResponse } from 'next/server'
import { PERIODS } from '@/lib/journey'

type ApiVerse = { verse: number; text: string }
type ApiResponse = { reference?: string; verses?: ApiVerse[]; error?: string }

const allowedSlugs = new Set(PERIODS.map((p) => p.bookSlug))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const book = searchParams.get('book') ?? ''
  const chapter = Number(searchParams.get('chapter'))

  if (!allowedSlugs.has(book) || !Number.isInteger(chapter) || chapter < 1 || chapter > 28) {
    return NextResponse.json({ error: 'Leitura inválida.' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://bible-api.com/${book}+${chapter}?translation=almeida`,
      { next: { revalidate: 60 * 60 * 24 * 30 } },
    )

    if (!response.ok) {
      return NextResponse.json({ error: 'Não foi possível carregar o texto.' }, { status: 502 })
    }

    const data = (await response.json()) as ApiResponse

    if (!data.verses?.length) {
      return NextResponse.json({ error: 'Texto não encontrado.' }, { status: 404 })
    }

    return NextResponse.json({
      reference: data.reference ?? '',
      translation: 'João Ferreira de Almeida',
      verses: data.verses.map((v) => ({ verse: v.verse, text: v.text.replace(/\s+/g, ' ').trim() })),
    })
  } catch {
    return NextResponse.json({ error: 'Não foi possível carregar o texto.' }, { status: 502 })
  }
}
