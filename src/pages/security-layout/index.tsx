import { Outlet } from 'react-router-dom'
import LoginLeft from '../../assets/img/login-left.jpg'

const SecurityLayout = () => {
  return (
    <div className="h-screen w-screen items-center justify-center gap-28 lg:flex">
      <div className="max-h-[858px] max-w-[614px]">
        <img
          className="h-full w-full transform object-contain"
          src={LoginLeft}
          alt="LoginLeft"
        />
      </div>
      <div className="flex max-w-[496px] flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}

export default SecurityLayout
