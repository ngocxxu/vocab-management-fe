import { useNavigate } from 'react-router-dom'
import Page404 from '../../assets/img/background/404page.webp'

export const ErrorTemplate = () => {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <button
        onClick={() => navigate('/')}
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
      >
        <img
          className="h-full w-full object-contain transform scale-75"
          src={Page404}
          alt="Page404"
        />
      </button>
    </div>
  )
}