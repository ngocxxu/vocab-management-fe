import IconFacebook from '@/assets/svg/IconFacebook'
import IconGoogle from '@/assets/svg/IconGoogle'
import Button from '@/components/button'
import { InputLib } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/img/logo.jpg'

type TFormSignin = {
  email: string
  password: string
}

const Login = () => {
  const { login } = useAuth()
  const { handleSubmit, control } = useForm<TFormSignin>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = (formData: TFormSignin) => {
    login(formData)
  }

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex justify-center">
        <img className="transform object-contain" src={Logo} alt="Logo" />
      </div>

      <div>
        <h1 className="mb-2 text-center text-6xl font-bold">Welcome Back</h1>
        <p className="text-md text-center text-gray-vc-400">
          Please login to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputLib
              className="mb-4 border-0"
              type="email"
              placeholder="Email address"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              placeholder="Password"
              className="mt-4 border-0"
              {...field}
            />
          )}
        />

        <Button
          className="flex w-full justify-end p-0 underline"
          variant="link"
          title="Forgot password?"
        />

        <Button className="mt-6 w-full" title="Login" type='submit' />
      </form>

      <div className="flex items-center justify-center gap-2">
        <Separator className="w-20" />
        <p className="whitespace-nowrap text-sm font-semibold">Or login with</p>
        <Separator className="w-20" />
      </div>

      <div className="flex justify-center gap-4">
        <Button
          classNameTitle="ml-2"
          className="bg-white"
          variant="outline"
          title="Google"
          leftIcon={<IconGoogle />}
        />
        <Button
          classNameTitle="ml-2"
          className="bg-white"
          variant="outline"
          title="Facebook"
          leftIcon={<IconFacebook />}
        />
      </div>

      <p className="whitespace-nowrap text-center text-sm font-semibold">
        Don't have an account?{' '}
        <Link to="/signup" className="cursor-pointer text-primary underline">
          Sign up here
        </Link>
      </p>
    </div>
  )
}

export default Login
