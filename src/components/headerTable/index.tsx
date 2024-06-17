import { ReactNode } from 'react'

type THeaderTable = {
  children: ReactNode
  headText: string
  bodyText: ReactNode
}

const HeaderTable = ({ children, headText, bodyText }: THeaderTable) => {
  return (
    <div className="my-10">
      <div className="container mx-auto rounded-md border-t bg-primary-foreground p-8 shadow-md">
        <h4 className="font-semibold">{headText}</h4>
        <p className="text-secondary-foreground mb-6 text-sm">
          {bodyText}
        </p>

        {children}
      </div>
    </div>
  )
}

export default HeaderTable
