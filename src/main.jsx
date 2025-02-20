import { createRoot } from 'react-dom/client'
import { HashRouter  } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CentroProvider from "./Providers/CentroProvider"
import FormulariosProvider from './Providers/FormularioProvider.jsx'

createRoot(document.getElementById('root')).render(
    <HashRouter >
      <FormulariosProvider>
      <CentroProvider>
        <App />
      </CentroProvider>
      </FormulariosProvider>
    </HashRouter >
)
