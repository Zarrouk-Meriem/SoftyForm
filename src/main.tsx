import ThemeProvider from './modules/shared/provider/ThemeContext.tsx'
import AuthProvider from './modules/shared/provider/AuthProvider.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './modules/shared/store'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Suspense } from 'react'
import App from './app/App.tsx'
import './app/index.scss'
import './i18n.ts'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={<></>} persistor={persistor}>
          <AuthProvider>
            <BrowserRouter>
              <Suspense>
                <App />
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </HelmetProvider>
)
