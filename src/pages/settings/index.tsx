import { SidebarLayout } from './components/sidebar'

const SettingsLayout = () => {
  return (
    <div>
      <h1 className="mb-3 mt-5 text-2xl font-semibold">Settings</h1>
      <div className="container mx-auto h-[88vh] overflow-y-auto rounded-md border-t bg-primary-foreground p-8 shadow-md">
        <SidebarLayout>Settings</SidebarLayout>
      </div>
    </div>
  )
}

export default SettingsLayout
