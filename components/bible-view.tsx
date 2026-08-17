'use client'

import { useMemo, useState } from 'react'
import { BookOpen, ChevronLeft, History, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ChapterReader } from '@/components/chapter-reader'
import { PERIODS } from '@/lib/journey'
import {
  BIBLE_BOOKS,
  BIBLE_BOOKS_BY_SLUG,
  JOURNEY_BOOK_SLUGS,
  NT_GROUPS,
  OT_GROUPS,
  type BibleBook,
  type Testament,
} from '@/lib/bible-books'
import { periodColor } from '@/lib/period-colors'
import { useBibleHistory } from '@/lib/use-bible-history'
import { cn } from '@/lib/utils'

type View =
  | { step: 'books' }
  | { step: 'chapters'; book: BibleBook }
  | { step: 'reader'; book: BibleBook; chapter: number }

function journeyPeriodIndex(bookName: string) {
  return PERIODS.find((period) => period.bookName === bookName)?.index
}

export function BibleView() {
  const [testament, setTestament] = useState<Testament>('NT')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>({ step: 'books' })
  const { lastRead, recordRead } = useBibleHistory()

  const normalizedQuery = query.trim().toLowerCase()
  const journeyBooks = useMemo(
    () => BIBLE_BOOKS.filter((book) => JOURNEY_BOOK_SLUGS.has(book.slug)),
    [],
  )

  const visibleBooks = useMemo(
    () =>
      BIBLE_BOOKS.filter((book) =>
        normalizedQuery ? book.name.toLowerCase().includes(normalizedQuery) : book.testament === testament,
      ),
    [normalizedQuery, testament],
  )

  const groups = normalizedQuery
    ? Array.from(new Set(visibleBooks.map((book) => book.group)))
    : testament === 'AT'
      ? OT_GROUPS
      : NT_GROUPS

  const openBook = (book: BibleBook) => setView({ step: 'chapters', book })
  const openChapter = (book: BibleBook, chapter: number) => {
    recordRead({ bookSlug: book.slug, bookName: book.name, chapter })
    setView({ step: 'reader', book, chapter })
  }

  if (view.step === 'reader') {
    return (
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setView({ step: 'chapters', book: view.book })}
          className="flex w-fit items-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          {view.book.name}
        </button>
        <ChapterReader
          bookSlug={view.book.slug}
          chapter={view.chapter}
          reference={`${view.book.name} ${view.chapter}`}
        />
      </div>
    )
  }

  if (view.step === 'chapters') {
    const { book } = view
    return (
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setView({ step: 'books' })}
          className="flex w-fit items-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Livros
        </button>
        <h2 className="font-serif text-2xl">{book.name}</h2>
        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-7">
          {Array.from({ length: book.chapters }, (_, index) => index + 1).map((chapter) => (
            <li key={chapter}>
              <button
                type="button"
                onClick={() => openChapter(book, chapter)}
                className="flex size-11 w-full items-center justify-center rounded-lg border border-border bg-card text-sm font-medium tabular-nums transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {chapter}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar um livro..."
          className="pl-10"
          aria-label="Buscar livro da Bíblia"
        />
      </div>

      {!normalizedQuery && (
        <>
          <div className="flex rounded-full border border-border bg-card p-1">
            {(['NT', 'AT'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTestament(option)}
                className={cn(
                  'flex-1 rounded-full py-2.5 text-sm font-medium transition-colors',
                  testament === option
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {option === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
              </button>
            ))}
          </div>

          {lastRead && (
            <button
              type="button"
              onClick={() => {
                const book = BIBLE_BOOKS_BY_SLUG.get(lastRead.bookSlug)
                if (book) openChapter(book, lastRead.chapter)
              }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <History className="size-4 text-secondary-foreground" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">Continuar lendo</span>
                <span className="font-serif text-base">
                  {lastRead.bookName} {lastRead.chapter}
                </span>
              </span>
            </button>
          )}

          <section className="flex flex-col gap-3">
            <h3 className="font-serif text-lg">Sua jornada atual</h3>
            <div className="grid grid-cols-3 gap-2">
              {journeyBooks.map((book) => {
                const index = journeyPeriodIndex(book.name)
                const color = index ? periodColor(index) : null
                return (
                  <button
                    key={book.slug}
                    type="button"
                    onClick={() => openBook(book)}
                    className={cn(
                      'flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl border px-3 py-3 text-center text-sm font-medium transition-colors',
                      color ? cn(color.border, color.bg, color.text) : 'border-border bg-card',
                    )}
                  >
                    <BookOpen className="size-4" aria-hidden="true" />
                    {book.name}
                  </button>
                )
              })}
            </div>
          </section>
        </>
      )}

      {groups.map((group) => {
        const groupBooks = visibleBooks.filter((book) => book.group === group)
        if (groupBooks.length === 0) return null
        return (
          <section key={group} className="flex flex-col gap-3">
            <h3 className="font-serif text-lg">{group}</h3>
            <div className="grid grid-cols-3 gap-2">
              {groupBooks.map((book) => (
                <button
                  key={book.slug}
                  type="button"
                  onClick={() => openBook(book)}
                  className="min-h-11 rounded-xl border border-border bg-card px-3 py-3 text-sm font-medium text-pretty transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {book.name}
                </button>
              ))}
            </div>
          </section>
        )
      })}

      {normalizedQuery && visibleBooks.length === 0 && (
        <p className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
          Nenhum livro encontrado para &quot;{query}&quot;.
        </p>
      )}
    </div>
  )
}
