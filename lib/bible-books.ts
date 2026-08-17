export type Testament = 'AT' | 'NT'

export type BibleBook = {
  slug: string
  name: string
  testament: Testament
  group: string
  chapters: number
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento — Pentateuco
  { slug: 'genesis', name: 'Gênesis', testament: 'AT', group: 'Pentateuco', chapters: 50 },
  { slug: 'exodus', name: 'Êxodo', testament: 'AT', group: 'Pentateuco', chapters: 40 },
  { slug: 'leviticus', name: 'Levítico', testament: 'AT', group: 'Pentateuco', chapters: 27 },
  { slug: 'numbers', name: 'Números', testament: 'AT', group: 'Pentateuco', chapters: 36 },
  { slug: 'deuteronomy', name: 'Deuteronômio', testament: 'AT', group: 'Pentateuco', chapters: 34 },
  // Antigo Testamento — Históricos
  { slug: 'joshua', name: 'Josué', testament: 'AT', group: 'Históricos', chapters: 24 },
  { slug: 'judges', name: 'Juízes', testament: 'AT', group: 'Históricos', chapters: 21 },
  { slug: 'ruth', name: 'Rute', testament: 'AT', group: 'Históricos', chapters: 4 },
  { slug: '1 samuel', name: '1 Samuel', testament: 'AT', group: 'Históricos', chapters: 31 },
  { slug: '2 samuel', name: '2 Samuel', testament: 'AT', group: 'Históricos', chapters: 24 },
  { slug: '1 kings', name: '1 Reis', testament: 'AT', group: 'Históricos', chapters: 22 },
  { slug: '2 kings', name: '2 Reis', testament: 'AT', group: 'Históricos', chapters: 25 },
  { slug: '1 chronicles', name: '1 Crônicas', testament: 'AT', group: 'Históricos', chapters: 29 },
  { slug: '2 chronicles', name: '2 Crônicas', testament: 'AT', group: 'Históricos', chapters: 36 },
  { slug: 'ezra', name: 'Esdras', testament: 'AT', group: 'Históricos', chapters: 10 },
  { slug: 'nehemiah', name: 'Neemias', testament: 'AT', group: 'Históricos', chapters: 13 },
  { slug: 'esther', name: 'Ester', testament: 'AT', group: 'Históricos', chapters: 10 },
  // Antigo Testamento — Poéticos
  { slug: 'job', name: 'Jó', testament: 'AT', group: 'Poéticos', chapters: 42 },
  { slug: 'psalms', name: 'Salmos', testament: 'AT', group: 'Poéticos', chapters: 150 },
  { slug: 'proverbs', name: 'Provérbios', testament: 'AT', group: 'Poéticos', chapters: 31 },
  { slug: 'ecclesiastes', name: 'Eclesiastes', testament: 'AT', group: 'Poéticos', chapters: 12 },
  { slug: 'song of solomon', name: 'Cantares', testament: 'AT', group: 'Poéticos', chapters: 8 },
  // Antigo Testamento — Profetas Maiores
  { slug: 'isaiah', name: 'Isaías', testament: 'AT', group: 'Profetas Maiores', chapters: 66 },
  { slug: 'jeremiah', name: 'Jeremias', testament: 'AT', group: 'Profetas Maiores', chapters: 52 },
  { slug: 'lamentations', name: 'Lamentações', testament: 'AT', group: 'Profetas Maiores', chapters: 5 },
  { slug: 'ezekiel', name: 'Ezequiel', testament: 'AT', group: 'Profetas Maiores', chapters: 48 },
  { slug: 'daniel', name: 'Daniel', testament: 'AT', group: 'Profetas Maiores', chapters: 12 },
  // Antigo Testamento — Profetas Menores
  { slug: 'hosea', name: 'Oséias', testament: 'AT', group: 'Profetas Menores', chapters: 14 },
  { slug: 'joel', name: 'Joel', testament: 'AT', group: 'Profetas Menores', chapters: 3 },
  { slug: 'amos', name: 'Amós', testament: 'AT', group: 'Profetas Menores', chapters: 9 },
  { slug: 'obadiah', name: 'Obadias', testament: 'AT', group: 'Profetas Menores', chapters: 1 },
  { slug: 'jonah', name: 'Jonas', testament: 'AT', group: 'Profetas Menores', chapters: 4 },
  { slug: 'micah', name: 'Miquéias', testament: 'AT', group: 'Profetas Menores', chapters: 7 },
  { slug: 'nahum', name: 'Naum', testament: 'AT', group: 'Profetas Menores', chapters: 3 },
  { slug: 'habakkuk', name: 'Habacuque', testament: 'AT', group: 'Profetas Menores', chapters: 3 },
  { slug: 'zephaniah', name: 'Sofonias', testament: 'AT', group: 'Profetas Menores', chapters: 3 },
  { slug: 'haggai', name: 'Ageu', testament: 'AT', group: 'Profetas Menores', chapters: 2 },
  { slug: 'zechariah', name: 'Zacarias', testament: 'AT', group: 'Profetas Menores', chapters: 14 },
  { slug: 'malachi', name: 'Malaquias', testament: 'AT', group: 'Profetas Menores', chapters: 4 },
  // Novo Testamento — Evangelhos
  { slug: 'matthew', name: 'Mateus', testament: 'NT', group: 'Evangelhos', chapters: 28 },
  { slug: 'mark', name: 'Marcos', testament: 'NT', group: 'Evangelhos', chapters: 16 },
  { slug: 'luke', name: 'Lucas', testament: 'NT', group: 'Evangelhos', chapters: 24 },
  { slug: 'john', name: 'João', testament: 'NT', group: 'Evangelhos', chapters: 21 },
  // Novo Testamento — Histórico
  { slug: 'acts', name: 'Atos', testament: 'NT', group: 'Histórico', chapters: 28 },
  // Novo Testamento — Cartas Paulinas
  { slug: 'romans', name: 'Romanos', testament: 'NT', group: 'Cartas Paulinas', chapters: 16 },
  { slug: '1 corinthians', name: '1 Coríntios', testament: 'NT', group: 'Cartas Paulinas', chapters: 16 },
  { slug: '2 corinthians', name: '2 Coríntios', testament: 'NT', group: 'Cartas Paulinas', chapters: 13 },
  { slug: 'galatians', name: 'Gálatas', testament: 'NT', group: 'Cartas Paulinas', chapters: 6 },
  { slug: 'ephesians', name: 'Efésios', testament: 'NT', group: 'Cartas Paulinas', chapters: 6 },
  { slug: 'philippians', name: 'Filipenses', testament: 'NT', group: 'Cartas Paulinas', chapters: 4 },
  { slug: 'colossians', name: 'Colossenses', testament: 'NT', group: 'Cartas Paulinas', chapters: 4 },
  { slug: '1 thessalonians', name: '1 Tessalonicenses', testament: 'NT', group: 'Cartas Paulinas', chapters: 5 },
  { slug: '2 thessalonians', name: '2 Tessalonicenses', testament: 'NT', group: 'Cartas Paulinas', chapters: 3 },
  { slug: '1 timothy', name: '1 Timóteo', testament: 'NT', group: 'Cartas Paulinas', chapters: 6 },
  { slug: '2 timothy', name: '2 Timóteo', testament: 'NT', group: 'Cartas Paulinas', chapters: 4 },
  { slug: 'titus', name: 'Tito', testament: 'NT', group: 'Cartas Paulinas', chapters: 3 },
  { slug: 'philemon', name: 'Filemom', testament: 'NT', group: 'Cartas Paulinas', chapters: 1 },
  // Novo Testamento — Cartas Gerais
  { slug: 'hebrews', name: 'Hebreus', testament: 'NT', group: 'Cartas Gerais', chapters: 13 },
  { slug: 'james', name: 'Tiago', testament: 'NT', group: 'Cartas Gerais', chapters: 5 },
  { slug: '1 peter', name: '1 Pedro', testament: 'NT', group: 'Cartas Gerais', chapters: 5 },
  { slug: '2 peter', name: '2 Pedro', testament: 'NT', group: 'Cartas Gerais', chapters: 3 },
  { slug: '1 john', name: '1 João', testament: 'NT', group: 'Cartas Gerais', chapters: 5 },
  { slug: '2 john', name: '2 João', testament: 'NT', group: 'Cartas Gerais', chapters: 1 },
  { slug: '3 john', name: '3 João', testament: 'NT', group: 'Cartas Gerais', chapters: 1 },
  { slug: 'jude', name: 'Judas', testament: 'NT', group: 'Cartas Gerais', chapters: 1 },
  // Novo Testamento — Apocalipse
  { slug: 'revelation', name: 'Apocalipse', testament: 'NT', group: 'Apocalipse', chapters: 22 },
]

export const BIBLE_BOOKS_BY_SLUG = new Map(BIBLE_BOOKS.map((book) => [book.slug, book]))

export const JOURNEY_BOOK_SLUGS = new Set(['luke', 'acts', 'john'])

export const OT_GROUPS = ['Pentateuco', 'Históricos', 'Poéticos', 'Profetas Maiores', 'Profetas Menores']
export const NT_GROUPS = ['Evangelhos', 'Histórico', 'Cartas Paulinas', 'Cartas Gerais', 'Apocalipse']
