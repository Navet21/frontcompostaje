// import Centros from "./components/Centros";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from 'react-router-dom'
import Composteras from "./Pages/Composteras"
import Bolos from "./Pages/Bolos"
import Registros from "./Pages/Registros"
import FormularioAntes from "./Pages/FormularioAntes";
import FormularioDurante from "./Pages/FormularioDurante"
import FormularioDespues from "./Pages/FormularioDespues"

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route element={<Composteras />} path='/'/>
            <Route element={<Bolos />} path='/bolos' />
            <Route element={<Registros />} path='/registros' />
            <Route element={<FormularioAntes/>} path="/formularioAntes"></Route>
            <Route element={<FormularioDurante/>} path="/formularioDurante"></Route>
            <Route element={<FormularioDespues/>} path="/formularioDespues"></Route>
      </Routes>
      <Footer/>
    {/* <Centros></Centros> */}
    </>
  );
}

export default App;

