import Centros from "./components/Centros";
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom'
import Composteras from "./Pages/Composteras"
import Bolos from "./Pages/Bolos"
import Registros from "./Pages/Registros"
import FormularioAntes from "./Pages/FormularioAntes";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route element={<Composteras />} path='/'/>
            <Route element={<Bolos />} path='/bolos' />
            <Route element={<Registros />} path='/registros' />
            <Route element={<FormularioAntes/>} path="/formularioAntes/:id"></Route>
      </Routes>
    <Centros></Centros>
    </>
  );
}

export default App;

