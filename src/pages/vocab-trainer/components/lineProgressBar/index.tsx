export const LineProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-full">
      <span
        className="absolute bottom-1 z-10 h-4 w-4 -translate-x-5 rounded-full bg-white"
        style={{ left: `${percentage}%` }}
      />
      <div className="relative flex h-6 w-full overflow-hidden rounded-3xl bg-gray-100">
        <div className="h-6 w-full rounded-3xl bg-gray-100">
          <div
            role="progressbar"
            className="h-6 rounded-3xl bg-secondary-foreground"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
