import { AxiosError } from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DefaultOptions, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Notification from './components/toast/index.tsx'
import { toast } from './components/ui/use-toast.ts'
import './index.scss'
import store from './redux/store.ts'

export const defaultOnError = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast({
      title: 'Error',
      description: `${error.response?.data.message ?? error.response?.statusText}`
    })
  }
}

const defaultOptions: DefaultOptions = {
  queries: {
    onError: defaultOnError
  },
  mutations: {
    onError: defaultOnError
  }
}

const queryClient = new QueryClient({
  defaultOptions
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <Notification />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
