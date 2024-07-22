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
      localStorage.removeItem('questionnaire')
    }
  }, [location.pathname])

  return (
    <>
      <div className="layout m-6 flex h-[calc(100vh-48px)] flex-row gap-6">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
