import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminPage from './pages/admin-page'
import BoletosPage from './pages/boletos-page'
import ClientesPage from './pages/clientes-page'
import HomePage from './pages/home-page'
import LoginPage from './pages/login-page'
import RemessasPage from './pages/remessas-page'
import RetornosPage from './pages/retornos-page'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'react-toastify/dist/ReactToastify.css'
import Modals from './components/modals'
import { useEffect, useMemo, useState } from 'react'
import { PusherProvider } from './providers/pusher'
import FaturasPage from './pages/faturas-page'
// import { PusherClient } from './libs/PusherClient'

function App() {
  const [pusherState, setPusherState] = useState()

  const connected = useMemo(function() {
    return pusherState == 'connected';
  }, [pusherState])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <PusherProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AdminPage />}>
              <Route path="" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<HomePage />} />
              <Route path="boletos" element={<BoletosPage />} />
              <Route path="faturas" element={<FaturasPage />} />
              <Route path="remessas" element={<RemessasPage />} />
              <Route path="retornos" element={<RetornosPage />} />
              <Route path="clientes" element={<ClientesPage />} />
            </Route>
          </Routes>
          <Modals />
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </PusherProvider>
  )
}

export default App
