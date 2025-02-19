import Centros from "./components/Centros";
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import SelectCentro from "./Pages/SelectCentro"
import Composteras from "./Pages/Composteras"
import Error from "./Pages/Error"
import Bolos from "./Pages/Bolos"
import Registros from "./Pages/Registros"
import FormularioAntes from "./Pages/FormularioAntes";
import FormularioDurante from "./Pages/FormularioDurante"
import FormularioDespues from "./Pages/FormularioDespues"
import Analisis from "./Pages/Analisis"
import RegistrosBolo from './Pages/RegistrosBolo'
import RegistroAntes from './Pages/RegistroAntes'
import RegistroDurante from './Pages/RegistroDurante'
import RegistroDespues from './Pages/RegistroDespues'
import RegistroCentros from "./Pages/RegistrosCentros";
import AnalisisAporte from "./Pages/AnalisisAporte";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SelectCentro />} path='/'/>
        <Route path="/" element={<Layout />}>
          <Route element={<Composteras />} path='/:id'/>
          <Route element={<Bolos />} path='/bolos' />
          <Route element={<Login />} path='/login' />
          <Route element={<Error />} path='/error' />
          <Route element={<Registros />} path='/registros/:id' />
          <Route element={<FormularioAntes/>} path="/formularioAntes"></Route>
          <Route element={<FormularioDurante/>} path="/formularioDurante"></Route>
          <Route element={<FormularioDespues/>} path="/formularioDespues"></Route>
          <Route element={<Analisis/>} path="/bolos/:id"></Route>
          <Route path="/centros" element={<Centros />} />
          <Route element={<RegistrosBolo/>} path="/registrosBolo/:id"></Route>
          <Route element={<RegistroAntes/>} path="/registros/:id/antes"></Route>
          <Route element={<RegistroDurante/>} path="/registros/:id/durantes"></Route>
          <Route element={<RegistroDespues/>} path="/registros/:id/despues"></Route>
          <Route element={<RegistroCentros/>} path="/centro/:id/registros"></Route>
          <Route element={<AnalisisAporte/>} path="/bolos/analisis/:id"></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

