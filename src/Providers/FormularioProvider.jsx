import { createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioReducer from "../Reducers/FormularioReducer";

export const FormulariosContext = createContext();

export default function FormulariosProvider({ children }) {
  const [state, dispatch] = useReducer(FormularioReducer, {
    datosAntes: {
      temp_ambiente: "",
      temp_compostera: "",
      humedad: "",
      nivel_llenado: "",
      olor: "",
      animales: false,
      tipo_animal: [],
      foto: "",
      observaciones: "",},
    datosDurante: {
      riego: false,
      remover: false,
      aporte_verde: false,
      aporte_seco: false,
      cantidad_aporteVLitros: "",
      cantidad_aporteVKilos: "",
      tipo_aporteV: "",
      cantidad_aporteSLitros: "",
      cantidad_aporteSKilos: "",
      tipo_aporteS: "",
      olor: "",
      foto: "",
      observaciones: "",},
    datosDespues: {
      nivel_llenado: "0%",
      foto: "",
      observaciones: "",
      finCiclo: false,
    },
    registro_id: null,
    ciclo_id: null,
  });

  // Obtenemos el id de la URL
  const params = useParams();
  const id = params.id;

  // Generamos las claves según el id
  const keyAntes = `formularioAntes${id}`;
  const keyDurante = `formularioDurante${id}`;
  const keyDespues = `formularioDespues${id}`;

  // 1. Al montar (o cambiar el id), CARGAMOS desde localStorage
  useEffect(() => {
    if (!id) return;

    const storedAntes = localStorage.getItem(keyAntes);
    if (storedAntes) {
      dispatch({ type: "añadirDatos_antes", payload: JSON.parse(storedAntes) });
    }

    const storedDurante = localStorage.getItem(keyDurante);
    if (storedDurante) {
      dispatch({ type: "añadirDatos_durante", payload: JSON.parse(storedDurante) });
    }

    const storedDespues = localStorage.getItem(keyDespues);
    if (storedDespues) {
      dispatch({ type: "añadirDatos_despues", payload: JSON.parse(storedDespues) });
    }
  }, [id]);

  // 2. Cuando cambie `state.datosAntes`, GUARDAMOS en localStorage
  useEffect(() => {
    if (!id) return;
    localStorage.setItem(keyAntes, JSON.stringify(state.datosAntes));
  }, [id, state.datosAntes]);

  // 3. Igual para `datosDurante` y `datosDespues`
  useEffect(() => {
    if (!id) return;
    localStorage.setItem(keyDurante, JSON.stringify(state.datosDurante));
  }, [id, state.datosDurante]);

  useEffect(() => {
    if (!id) return;
    localStorage.setItem(keyDespues, JSON.stringify(state.datosDespues));
  }, [id, state.datosDespues]);

  return (
    <FormulariosContext.Provider value={{ state, dispatch, id }}>
      {children}
    </FormulariosContext.Provider>
  );
}

