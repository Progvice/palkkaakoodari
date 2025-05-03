import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.context.tsx'
import { LangProvider } from './context/lang.context.tsx'
import { EmployeeProvider } from './context/employee.context.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <BrowserRouter>
          <AuthProvider>
            <EmployeeProvider>
              <App />
            </EmployeeProvider>
          </AuthProvider>
        </BrowserRouter>
      </LangProvider>
    </QueryClientProvider>
  </StrictMode>,
)
