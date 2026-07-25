export type Period = {
  index: number
  title: string
  bookName: string
  /** slug aceito pela API bíblica */
  bookSlug: string
  startDay: number
  endDay: number
  chapters: number
  objective: string
  description: string
  /** mensagem exibida ao concluir o último dia do período */
  completionTitle: string
  completionBody: string[]
  /** imagem de fundo usada no card principal do período */
  image: string
  /** frase curta usada como convite na tela inicial */
  invitation: string
}

export const TOTAL_DAYS = 73

export const PERIODS: Period[] = [
  {
    index: 1,
    title: 'Conhecendo Jesus',
    bookName: 'Lucas',
    bookSlug: 'luke',
    startDay: 1,
    endDay: 24,
    chapters: 24,
    objective:
      'Conhecer a vida de Jesus, seus ensinamentos, seus milagres, sua relação com as pessoas, sua morte e sua ressurreição.',
    description:
      'O Evangelho de Lucas apresenta a história de Jesus de forma organizada. Durante esse período, você acompanhará os acontecimentos desde o anúncio de seu nascimento até sua ressurreição.',
    completionTitle: 'Você concluiu o primeiro período!',
    completionBody: [
      'Durante os últimos 24 dias, você acompanhou a vida, os ensinamentos, a morte e a ressurreição de Jesus.',
      'Amanhã, você começará o livro de Atos e acompanhará o que aconteceu depois da ressurreição de Jesus.',
    ],
    image: '/images/period-1.png',
    invitation: 'Acompanhe a vida de Jesus, do começo ao fim.',
  },
  {
    index: 2,
    title: 'A missão continua',
    bookName: 'Atos',
    bookSlug: 'act',
    startDay: 25,
    endDay: 52,
    chapters: 28,
    objective:
      'Acompanhar o início da Igreja, a ação dos primeiros discípulos e a expansão da mensagem de Jesus.',
    description:
      'O livro de Atos continua a narrativa iniciada em Lucas. Você verá o que aconteceu depois que Jesus ressuscitou, como os discípulos começaram sua missão e como a mensagem chegou a diferentes povos e lugares.',
    completionTitle: 'Você concluiu o segundo período!',
    completionBody: [
      'Agora você conhece parte da história dos primeiros discípulos, do começo da Igreja e da expansão da mensagem de Jesus.',
      'Amanhã, você iniciará o Evangelho de João para aprofundar seu conhecimento sobre Jesus.',
    ],
    image: '/images/period-2.png',
    invitation: 'Veja a mensagem de Jesus chegando a novos lugares.',
  },
  {
    index: 3,
    title: 'Aprofundando o conhecimento sobre Jesus',
    bookName: 'João',
    bookSlug: 'john',
    startDay: 53,
    endDay: 73,
    chapters: 21,
    objective:
      'Conhecer Jesus por meio de outra apresentação do Evangelho, observando suas palavras, seus sinais e sua relação com Deus e com as pessoas.',
    description:
      'Embora Lucas e João contem acontecimentos relacionados à vida de Jesus, cada livro apresenta detalhes, conversas e ensinamentos próprios. Por isso, você não estará simplesmente repetindo a mesma história.',
    completionTitle: 'Você concluiu sua primeira jornada bíblica!',
    completionBody: [
      'Durante 73 dias, você leu três livros completos da Bíblia: Lucas, Atos e João.',
      'Você conheceu a vida e os ensinamentos de Jesus, acompanhou o início da Igreja e aprofundou sua leitura sobre quem Jesus é.',
      'Este não é o fim da sua jornada. Agora você poderá escolher o próximo caminho e continuar conhecendo toda a Bíblia.',
    ],
    image: '/images/period-3.png',
    invitation: 'Aprofunde o que você já conhece sobre Jesus.',
  },
]

export const NEXT_PATH_SUGGESTIONS = [
  'Marcos',
  'Mateus',
  'Gênesis',
  'Êxodo',
  'Salmos selecionados',
  'Provérbios',
  'Romanos',
  'Continuidade do plano da Bíblia completa',
]

export type Reading = {
  day: number
  period: Period
  chapter: number
  /** posição do capítulo dentro do período (1-based) */
  chapterInPeriod: number
  reference: string
}

export function getPeriodForDay(day: number): Period {
  const period = PERIODS.find((p) => day >= p.startDay && day <= p.endDay)
  return period ?? PERIODS[PERIODS.length - 1]
}

export function getReading(day: number): Reading {
  const clamped = Math.min(Math.max(day, 1), TOTAL_DAYS)
  const period = getPeriodForDay(clamped)
  const chapter = clamped - period.startDay + 1
  return {
    day: clamped,
    period,
    chapter,
    chapterInPeriod: chapter,
    reference: `${period.bookName} ${chapter}`,
  }
}

export const ALL_DAYS: Reading[] = Array.from({ length: TOTAL_DAYS }, (_, i) => getReading(i + 1))

export type ChecklistStage = {
  id: 'before' | 'during' | 'after'
  title: string
  items: { id: string; label: (reading: Reading) => string }[]
}

export const CHECKLIST: ChecklistStage[] = [
  {
    id: 'before',
    title: 'Antes de ler',
    items: [
      { id: 'before-1', label: () => 'Encontre um lugar onde consiga prestar atenção.' },
      { id: 'before-2', label: () => 'Faça uma breve oração.' },
      { id: 'before-3', label: () => 'Recorde o que aconteceu no capítulo anterior.' },
      { id: 'before-4', label: (r) => `Abra ${r.reference}.` },
    ],
  },
  {
    id: 'during',
    title: 'Durante a leitura',
    items: [
      { id: 'during-1', label: () => 'Leia o capítulo completo.' },
      { id: 'during-2', label: () => 'Observe quais pessoas aparecem.' },
      { id: 'during-3', label: () => 'Identifique o principal acontecimento.' },
      { id: 'during-4', label: () => 'Marque uma frase que chamou sua atenção.' },
      { id: 'during-5', label: () => 'Releia qualquer parte que não tenha compreendido.' },
    ],
  },
  {
    id: 'after',
    title: 'Depois da leitura',
    items: [
      { id: 'after-1', label: () => 'Escreva o que aconteceu no capítulo.' },
      { id: 'after-2', label: () => 'Registre uma dúvida, caso tenha.' },
      { id: 'after-3', label: () => 'Selecione um versículo que deseja guardar.' },
    ],
  },
]

export const CHECKLIST_ITEM_COUNT = CHECKLIST.reduce((total, s) => total + s.items.length, 0)
