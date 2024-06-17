import { ReactNode } from 'react'

type THeaderTable = {
  children: ReactNode
  headText: string
  bodyText: ReactNode
}

const HeaderTable = ({ children, headText, bodyText }: THeaderTable) => {
  return (
    <div className="my-10">
      <div className="container mx-auto rounded-md border-t bg-white p-8 shadow-md">
        <h4 className="font-semibold">{headText}</h4>
        <p className="mb-6 text-sm text-secondary">{bodyText}</p>

        {children}
      </div>
    </div>
  )
}

export default HeaderTable
