export function JourneySkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-8" aria-hidden="true">
      <div className="h-[22rem] rounded-3xl bg-muted sm:h-[24rem]" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-20 rounded-xl bg-muted" />
        <div className="h-20 rounded-xl bg-muted" />
        <div className="h-20 rounded-xl bg-muted" />
      </div>
      <div className="h-40 rounded-xl bg-muted" />
    </div>
  )
}
