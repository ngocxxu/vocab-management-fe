import { Controller, useForm } from 'react-hook-form'
import Logo from '../../assets/img/logo.jpg'
import { InputLib } from '@/components/ui/input'

type TFormSignin = {
  email: string
  password: string
}

const Signin = () => {
  const { handleSubmit, control } = useForm<TFormSignin>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = () => {}

  return (
    <>
      <img className="transform object-contain" src={Logo} alt="Logo" />
      <h1 className="text-6xl font-bold">Welcome Back</h1>
      <p className="text-xl text-gray-vc-400">Please login to your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputLib
              type='email'
              placeholder='Email address'
              {...field}
            />
          )}
        />
      </form>
    </>
  )
}

export default Signin
