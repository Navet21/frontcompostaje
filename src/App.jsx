// import Centros from "./components/Centros";
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import Composteras from "./Pages/Composteras"
import Bolos from "./Pages/Bolos"
import Registros from "./Pages/Registros"
import FormularioAntes from "./Pages/FormularioAntes";
import FormularioDurante from "./Pages/FormularioDurante"
import FormularioDespues from "./Pages/FormularioDespues"
import Analisis from "./Pages/Analisis"
import RegistrosBolo from './Pages/RegistrosBolo'

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route element={<Composteras />} path='/'/>
            <Route element={<Bolos />} path='/bolos' />
            <Route element={<Registros />} path='/registros' />
            <Route element={<FormularioAntes/>} path="/formularioAntes"></Route>
            <Route element={<FormularioDurante/>} path="/formularioDurante"></Route>
            <Route element={<FormularioDespues/>} path="/formularioDespues"></Route>
            <Route element={<Analisis/>} path="/bolos/:id"></Route>
            <Route element={<RegistrosBolo/>} path="/registrosBolo/:id"></Route>
            </Route>
      </Routes>
    {/* <Centros></Centros> */}
    </>
  );
}

export default App;

