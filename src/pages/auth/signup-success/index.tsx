import Button from '@/components/button'
import CheckLogo from '../../../assets/img/check.png'
import Logo from '../../../assets/img/logo.jpg'

const SignupSuccess = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-16">
      <div>
        <img className="transform object-contain" src={Logo} alt="Logo" />
      </div>

      <div className="w-1/6">
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

      <Button size="lg" title="Let's Start!" />
    </div>
  )
}

export default SignupSuccess
