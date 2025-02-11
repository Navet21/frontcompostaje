import Centros from "./components/Centros";
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom'
import Composteras from "./Pages/Composteras"
import Bolos from "./Pages/Bolos"
import Registros from "./Pages/Registros"
import Card from "./components/Card"
import FormularioAntes from "./Pages/FormularioAntes";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route element={<Composteras />} path='/frontcompostaje'/>
            <Route element={<Bolos />} path='/frontcompostaje/bolos' />
            <Route element={<Registros />} path='/frontcompostaje/registros' />
            <Route element={<FormularioAntes/>} path="/frontcompostaje/formularioAntes/:id"></Route>
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

