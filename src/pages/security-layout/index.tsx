import { Outlet } from 'react-router-dom'
import LoginLeft from '../../assets/img/login-left.jpg'

const SecurityLayout = () => {
  return (
    <div className="lg:flex h-screen w-screen items-center justify-center">
      <div className="max-h-[858px]">
        <img
          className="h-full w-full transform object-contain"
          src={LoginLeft}
          alt="LoginLeft"
        />
      </div>
      <div className="p-28 flex flex-col items-center justify-center w-1/2">
        <Outlet />
      </div>
    </div>
  )
}

export default SecurityLayout
