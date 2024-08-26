import { Outlet } from 'react-router-dom'

const SecurityLayout = () => {
  return <div className='grid grid-cols-12'>
    <div className='col-span-6'>A</div>
    <div className='col-span-6'>
      <Outlet/>
    </div>
  </div>
}

export default SecurityLayout
