import { format } from 'date-fns'

const Footer = () => {
  return (
    <footer className="relative bottom-0 right-0 bg-primary p-3 text-center text-sm text-white">
      <aside>
        <p>
          Copyright © {format(new Date(), 'yyyy')} - Developer: Bono - Design:
          Ranie
        </p>
      </aside>
    </footer>
  )
}

export default Footer
