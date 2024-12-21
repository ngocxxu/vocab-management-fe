import { ReactNode } from 'react'

type THeaderTable = {
  children: ReactNode
  headText: string
  bodyText?: ReactNode
}

const HeaderTable = ({ children, headText, bodyText }: THeaderTable) => {
  return (
    <div>
      <div className="container mx-auto rounded-md border-t bg-primary-foreground p-8 shadow-md">
        <h4 className="font-semibold">{headText}</h4>
        <p className="mb-6 text-sm text-secondary-foreground">{bodyText}</p>

        {children}
      </div>
    </div>
  )
}

export default HeaderTable
