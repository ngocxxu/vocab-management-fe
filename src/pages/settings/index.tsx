import { Navigate, useLocation } from 'react-router-dom'
import { Notifications } from './components/notifications'
import { Profile } from './components/profile'
import { SidebarLayout } from './components/sidebar'
import { CustomSubjects } from './components/subjects'

const items = [
  {
    title: 'My Profile',
    url: '/settings/profile',
    component: Profile
  },
  {
    title: 'Custom Subjects',
    url: '/settings/subjects',
    component: CustomSubjects
  },
  {
    title: 'Notifications',
    url: '/settings/notifications',
    component: Notifications
  }
]

const SettingsLayout = () => {
  const itemUrl = items.find((item) => item.url === window.location.pathname)
  const location = useLocation()

  if (location.pathname === '/settings') {
    return <Navigate to="/settings/profile" replace />
  }

  return (
    <div>
      <h1 className="mb-3 mt-5 text-2xl font-semibold">Settings</h1>
      <div className="container mx-auto h-[88vh] overflow-y-auto rounded-md border-t bg-primary-foreground p-8 shadow-md">
        <SidebarLayout>{itemUrl && <itemUrl.component />}</SidebarLayout>
      </div>
    </div>
  )
}

export default SettingsLayout
