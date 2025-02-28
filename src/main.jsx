import { createRoot } from 'react-dom/client'
import { HashRouter  } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CentroProvider from "./Providers/CentroProvider"
import FormulariosProvider from './Providers/FormularioProvider.jsx'
import { Bugfender } from '@bugfender/sdk';



fetch('https://pablo.informaticamajada.es/api/get-bugfender-key')
  .then(res => res.json())
  .then(data => {
    Bugfender.init({
      appKey: data.apiKey,
      overrideConsoleMethods: true
    });
    Bugfender.log("Hola desde Bugfender");
     // Paso 2.3: Listeners globales para errores no controlados
      window.addEventListener('error', (event) => {
      // Cualquier error global (p.ej. errores de JavaScript no manejados)
      console.error('Global error:', event.error);
    });
    window.addEventListener('unhandledrejection', (event) => {
      // Captura promesas rechazadas sin catch
      console.error('Unhandled promise rejection:', event.reason);
    });
  })
  .catch(err => {
    console.error('Error obteniendo clave Bugfender:', err);
  })
  .finally(() => {
    // Aquí renderizas la app SÓLO una vez, sea éxito o error
    createRoot(document.getElementById('root')).render(
      <HashRouter>
        <FormulariosProvider>
          <CentroProvider>
            <App />
          </CentroProvider>
        </FormulariosProvider>
      </HashRouter>
    );
  });

