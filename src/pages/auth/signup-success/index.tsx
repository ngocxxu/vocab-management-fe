import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'
import CheckLogo from '../../../assets/img/check.jpg'

const SignupSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-16">
      <div>
        <img
          className="transform object-contain"
          src={CheckLogo}
          alt="CheckLogo"
        />
      </div>

      <div className="text-center">
        <h1 className="mb-3 text-4xl font-semibold">
          Account created successfully!
        </h1>
        <p className="text-2xl text-gray-400">
          Welcome aboard! Start your success journey with Vocab Management
        </p>
      </div>

      <Button size="lg" title="Let's Start!" onClick={() => navigate('/login')}>
        Let's Start!
      </Button>
    </div>
  )
}

export default SignupSuccess
