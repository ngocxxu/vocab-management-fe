import { useState } from 'react'

export const ExpandableText = ({
  text,
  maxLength = 60
}: {
  text: string
  maxLength: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (text.length <= maxLength) {
    return <span>{text}</span>
  }

  return (
    <span>
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-blue-500 underline hover:text-blue-700"
      >
        {isExpanded ? 'Show less' : 'View more'}
      </button>
    </span>
  )
}
