export const LineProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-full">
      <span
        className="absolute bottom-1 z-10 -translate-x-5 w-4 h-4 bg-white rounded-full"
        style={{ left: `${percentage}%` }}
      />
      <div className="relative flex w-full h-6 overflow-hidden rounded-3xl bg-gray-100">
        <div className="w-full  bg-gray-100 rounded-3xl h-6 ">
          <div
            role="progressbar"
            className="bg-customBlack1 h-6 rounded-3xl"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
