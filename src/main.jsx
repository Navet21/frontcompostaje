import { createRoot } from 'react-dom/client'
import { HashRouter  } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import FormulariosProvider from './Providers/FormularioProvider.jsx'

createRoot(document.getElementById('root')).render(
    
      <HashRouter >
        <FormulariosProvider>
          <App />
        </FormulariosProvider>
      </HashRouter >
)
