import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './components/sidebar'
import './style.scss'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname

    if (
      currentPath !== '/vocab-trainer/examination' &&
      currentPath !== '/vocab-trainer/examination/result'
    ) {
      localStorage.removeItem('examId')
      localStorage.removeItem('questions')
    }
  }, [location.pathname])

  return (
    <>
      <div className="layout flex flex-row gap-6 m-6">
        <Sidebar />
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
