import Centros from "./components/Centros";
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom'
import Composteras from "./Pages/Composteras"
import Bolos from "./Pages/Bolos"
import Registros from "./Pages/Registros"
import Card from "./components/Card"
import FormularioAntes from "./Pages/FormularioAntes";
import FormularioDurante from "./Pages/FormularioDurante"
import FormularioDespues from "./Pages/FormularioDespues"

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route element={<Composteras />} path='/'/>
            <Route element={<Bolos />} path='/bolos' />
            <Route element={<Registros />} path='/registros' />
            <Route element={<FormularioAntes/>} path="/formularioAntes"></Route>
            <Route element={<FormularioDurante/>} path="/formularioDurante"></Route>
            <Route element={<FormularioDespues/>} path="/formularioDespues"></Route>
      </Routes>
    <Centros></Centros>
    <Card
      type={11}
      estado={1}
      id={1}
      mode="Compostera"
      onButtonClick={() => console.log("Botón presionado")}
    />
    <Card
      type={22}
      estado={0}
      id={1}
      mode="Compostera"
      onButtonClick={() => console.log("Botón presionado")}
    />
    <Card
      type={33}
      estado={0}
      id={3}
      mode="Compostera"
      onButtonClick={() => console.log("Botón presionado")}
    />
    
    </>
  );
}

export default App;

