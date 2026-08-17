import { NextResponse } from 'next/server'
import { BIBLE_BOOKS_BY_SLUG } from '@/lib/bible-books'

type ApiVerse = { verse: number; text: string }
type ApiResponse = { reference?: string; verses?: ApiVerse[]; error?: string }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const book = searchParams.get('book') ?? ''
  const chapter = Number(searchParams.get('chapter'))

  const bookInfo = BIBLE_BOOKS_BY_SLUG.get(book)

  if (!bookInfo || !Number.isInteger(chapter) || chapter < 1 || chapter > bookInfo.chapters) {
    return NextResponse.json({ error: 'Leitura inválida.' }, { status: 400 })
  }

  try {
    const bookPath = book.replace(/\s+/g, '+')
    const response = await fetch(
      `https://bible-api.com/${bookPath}+${chapter}?translation=almeida`,
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
