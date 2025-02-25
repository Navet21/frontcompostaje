import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import {
  Button as MaterialButton,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

import Button from "../components/Button"; // Asumes que este es tu botón personalizado
import { FormulariosContext } from "../Providers/FormularioProvider"; // Ajusta la ruta según tu proyecto
import { CentroContext } from "../Providers/CentroProvider";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function FormularioDespués() {
  //Se hace una consulta del id del ultimo registro + 1 para evitar una consulta extra a la hora de insertar 
  // 1. Obtenemos `state`, `dispatch` y `id` del contexto
  const { state, dispatch, id } = useContext(FormulariosContext);
const navigate = useNavigate();
const { centroId } = useContext(CentroContext);
const [compostera, setCompostera] = useState(null);
const [compostera2, setCompostera2] = useState(null);
const [loading, setLoading] = useState(false);
const [boloId, setBoloId] = useState(null); // Se cambia bolo_id por useState
const siguienteIdcompostera = Number(id) + 1;
const authToken = localStorage.getItem("authToken");


const datosCompostera = async () => {
  try {
    const { data } = await axios.get(`https://pablo.informaticamajada.es/api/composteras/${id}`, {
      headers: {
          "Authorization": `Bearer ${authToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null;
  }
};

const datosCompostera1 = async () => {
  const composteraData = await datosCompostera();

  if (!composteraData) {
    console.log("No se pudieron obtener los datos de la compostera.");
    return null;
  }

  console.log("Datos de la compostera:", composteraData.data);
  setCompostera(composteraData.data);
};

useEffect(() => {
  const cargarDatos = async () => {
    await datosCompostera1();
  };

  cargarDatos();
}, []);

const datosComposteras = async () => {
  try {
    const { data } = await axios.get(`https://pablo.informaticamajada.es/api/composteras/${siguienteIdcompostera}`, {
      headers: {
          "Authorization": `Bearer ${authToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null;
  }
};

const datosCompostera2 = async () => {
  const composteraData = await datosComposteras();

  if (!composteraData) {
    console.log("No se pudieron obtener los datos de la compostera 2.");
    return null;
  }

  console.log("Datos de la compostera 2:", composteraData.data);
  setCompostera2(composteraData.data);
};

useEffect(() => {
  const cargarDatos = async () => {
    await datosCompostera2();
  };

  cargarDatos();
}, []);

const datosCiclo = async () => {
  try {
    const { data } = await axios.get(`https://pablo.informaticamajada.es/api/ciclos/${state.ciclo_id}`, {
      headers: {
          "Authorization": `Bearer ${authToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null;
  }
};

const datosBolo = async () => {
  const cicloData = await datosCiclo();

  if (!cicloData) {
    console.log("No se pueden obtener los datos del Bolo");
    return null;
  }

  console.log("Datos del bolo:", cicloData.data);
  setBoloId(cicloData.data); // Se usa el useState
};

useEffect(() => {
  const cargarDatos = async () => {
    await datosBolo(); // Se corrige la llamada errónea
  };

  cargarDatos();
}, []);

console.log("Estos son los datos para utilizar de la compostera 1", compostera?.tipo);
console.log("Estos son los datos para utilizar de la compostera 2", compostera2?.tipo);
console.log("Puedo ver el id del bolo", boloId?.bolo_id);

  // Dentro del componente
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Actualizas tu estado global con el objeto File
    dispatch({
      type: "añadirDatos_despues",
      payload: {
        ...state.datosDespues,
        foto: file,
      },
    });
  };


  function obtenerFechaFormatoCorrecto() {
    const fecha = new Date();
    return fecha.toISOString().split('T')[0]; 
  }
  

  // 2. Leemos "formData" desde `state.datosDespues` (o un objeto por defecto si está vacío)
  const formData = state.datosDespues || {
    nivel_llenado: "0%",
    foto: "",
    observaciones: "",
    finCiclo: false,
  };

  // 3. Manejo del diálogo “¡Importante!”
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // 4. Cuando cambia un input, creamos un nuevo objeto y despachamos “añadirDatos_despues”
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };

    dispatch({
      type: "añadirDatos_despues",
      payload: updatedFormData,
    });
  };

  console.log("Datos a enviar", state);

  // 5. Al enviar, simplemente podrías navegar a otra ruta, o hacer más lógica
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
          // Comprobamos si la compostera siguiente está ocupada
          if (compostera2?.ocupada) {
              console.log("Vacia primero la siguiente compostera para poder terminar el ciclo");
              navigate(`/${centroId}`);
              return; // Salimos de la función para evitar continuar
          }
          setLoading(true);
          const usuarioID = localStorage.getItem("usuarioId");

          // Se inserta el registro
          await axios.post("https://pablo.informaticamajada.es/api/registros", {
              user_id: usuarioID,
              ciclo_id: state.ciclo_id,
              compostera_id: Number(id),
          }, {             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            } });

          // Se inserta "antes"

          const formDataAntes = new FormData();
          formDataAntes.append("registro_id", state.registro_id);
          formDataAntes.append("temp_ambiente", state.datosAntes.temp_ambiente);
          formDataAntes.append("temp_compostera", state.datosAntes.temp_compostera);
          formDataAntes.append("humedad", state.datosAntes.humedad);
          formDataAntes.append("nivel_llenado", state.datosAntes.nivel_llenado);
          formDataAntes.append("olor", state.datosAntes.olor);
          formDataAntes.append("animales", state.datosAntes.animales ? "1" : "0");
          formDataAntes.append(
            "tipo_animal",
            state.datosAntes.tipo_animal.length > 0 ? state.datosAntes.tipo_animal.join(",") : ""
          );
          if (state.datosAntes.foto) {
            formDataAntes.append("foto", state.datosAntes.foto);
          }
          formDataAntes.append("observaciones", state.datosAntes.observaciones);

          await axios.post("https://pablo.informaticamajada.es/api/antes", formDataAntes, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${authToken}`,
            },
          });

          const formDataDurante = new FormData();
          formDataDurante.append("registro_id", state.registro_id);
          formDataDurante.append("riego", state.datosDurante.riego ? "1" : "0");
          formDataDurante.append("remover", state.datosDurante.remover ? "1" : "0");
          formDataDurante.append("aporte_verde", state.datosDurante.aporte_verde ? "1" : "0");
          formDataDurante.append("aporte_seco", state.datosDurante.aporte_seco ? "1" : "0");
          formDataDurante.append("cantidad_aporteVLitros", state.datosDurante.cantidad_aporteVLitros);
          formDataDurante.append("cantidad_aporteVKilos", state.datosDurante.cantidad_aporteVKilos);
          formDataDurante.append("tipo_aporteV", state.datosDurante.tipo_aporteV);
          formDataDurante.append("cantidad_aporteSLitros", state.datosDurante.cantidad_aporteSLitros);
          formDataDurante.append("cantidad_aporteSKilos", state.datosDurante.cantidad_aporteSKilos);
          formDataDurante.append("tipo_aporteS", state.datosDurante.tipo_aporteS);
          if (state.datosDurante.foto) {
            // Se agrega el archivo solo si se seleccionó
            formDataDurante.append("foto", state.datosDurante.foto);
          }
          formDataDurante.append("observaciones", state.datosDurante.observaciones);


          // Se inserta "durante"
          await axios.post("https://pablo.informaticamajada.es/api/durantes", formDataDurante, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${authToken}`,
            },
          });

          // Se inserta "después"

          const formDataDespues = new FormData();
          formDataDespues.append("registro_id", state.registro_id);
          formDataDespues.append("nivel_llenado", state.datosDespues.nivel_llenado);
          if (state.datosDespues.foto) {
            // Solo si se seleccionó archivo
            formDataDespues.append("foto", state.datosDespues.foto);
          }
          formDataDespues.append("observaciones", state.datosDespues.observaciones);
          // Se inserta "durante"
          await axios.post("https://pablo.informaticamajada.es/api/despues", formDataDespues, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${authToken}`,
            },
          });

          

          if (state.datosDespues?.finCiclo){

            //Se pone fin al ciclo
            await axios.put(`https://pablo.informaticamajada.es/api/ciclos/${state.ciclo_id}`, {
              terminado: true,
                final: obtenerFechaFormatoCorrecto(), // Asegúrate de que esta función está definida
            }, {             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            } });

            if(compostera?.tipo !== "maduracion"){
              // Se pone un nuevo ciclo en la compostera siguiente
              await axios.post("https://pablo.informaticamajada.es/api/ciclos", {
                bolo_id: boloId?.bolo_id, // Evita error si boloId aún no se ha cargado
                compostera_id: Number(compostera2?.id) // Evita error si compostera2 aún no se ha cargado
            }, {           headers: {
              "Authorization": `Bearer ${authToken}`,
          }, });
            // Se marca la compostera actual como no ocupada
  
            await axios.put(`https://pablo.informaticamajada.es/api/composteras/${compostera?.id}`, {
                ocupada: 0
            }, {             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            } });
            // Se marca la compostera siguiente como ocupada
  
            await axios.put(`https://pablo.informaticamajada.es/api/composteras/${compostera2?.id}`, {
                ocupada: 1
            }, {             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            } });
            }
            else{
                //Cerramos el bolo tambien y ponemos la compostera en libre
                await axios.put(`https://pablo.informaticamajada.es/api/bolos/${boloId?.bolo_id}`, {
                    terminado: true,
                    final: obtenerFechaFormatoCorrecto(),
                }, {             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            } });
                await axios.put(`https://pablo.informaticamajada.es/api/composteras/${compostera?.id}`, {
                  ocupada: 0
              }, {             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            } });
              // Se marca la compostera siguiente como ocupada
            }
          } 
        // Limpiar datos locales y navegar
        deletelocal(e);
        navigate(`/${centroId}`);

    } catch (error) {
        console.error(error.response?.data);
        console.error("Error en la solicitud:", error);
    }
};


  // 6. Ejemplo de limpiar localStorage (opcional)
  //    Si quieres “resetear” todo, en vez de localStorage.removeItem,
  //    podrías despachar una acción para limpiar los 3 formularios en tu reducer.
  const deletelocal = (e) => {
    e.preventDefault();
    console.log("Limpiamos el estado global y localStorage");

    localStorage.removeItem(`formularioAntes${id}`);
    localStorage.removeItem(`formularioDespues${id}`);
    localStorage.removeItem(`formularioDurante${id}`);

    // Ejemplo: Despachamos una acción “limpiar_todo”
    dispatch({ type: "limpiar_todo" });
    // Luego navegas al Home
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 dark:bg-gray-900">
      {loading ? (
        <DotLottieReact
        src="https://lottie.host/bde4db23-2115-4204-af20-1c47d6fcc8cd/sYD52bikvs.lottie"
        loop
        autoplay
        className="w-100 h-100"
    />
  ) : (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-green-500 text-xl font-bold text-center mb-4">
            Formulario de Después para Compostera {id}
          </h2>
          <FaInfo
            className="absolute top-2 right-2 text-sky-600 cursor-pointer"
            onClick={handleOpen}
          />
        </div>

        <Dialog className="bg-white dark:bg-gray-900" open={open} handler={handleOpen}>
          <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-5 pb-20 max-h-[90vh] overflow-y-auto">
            <Typography color="red" variant="h4">
              ¡Importante!
            </Typography>
            <Typography color="black" className="text-center font-normal dark:text-white">
              Sigue estas indicaciones para completar el formulario correctamente:
            </Typography>
            <ul className="text-black dark:text-white text-sm list-disc pl-6 space-y-2">
              <li>
                <b>Nivel de Llenado:</b> Estima cuánto material queda en la compostera después del
                proceso.
              </li>
              <li>
                <b>Foto:</b> Toma una foto del compost finalizado y adjunta el enlace o archivo.
              </li>
              <li>
                <b>Observaciones:</b> Anota detalles sobre la apariencia, olor o cualquier cambio
                significativo.
              </li>
              <li>
                <b>Fin de Ciclo:</b> Marca esta opción si el compost ya está listo para su uso.
              </li>
            </ul>
            <MaterialButton variant="gradient" onClick={handleOpen}>
              Entendido
            </MaterialButton>
          </DialogBody>
        </Dialog>

        <form encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-4">
          {/* Nivel de Llenado */}
          <label className="block text-black dark:text-white">
            Nivel de Llenado:
            <select
              name="nivel_llenado"
              value={formData.nivel_llenado}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-700 dark:border-gray-600"
            >
              <option value="">Seleccione</option>
              <option value="0%">0%</option>
              <option value="12.5%">12.5%</option>
              <option value="25%">25%</option>
              <option value="37.5%">37.5%</option>
              <option value="50%">50%</option>
              <option value="62.5%">62.5%</option>
              <option value="75%">75%</option>
              <option value="87.5%">87.5%</option>
              <option value="100%">100%</option>
            </select>
          </label>

          {/* Foto */}
          <label className="block text-black dark:text-white">
            Foto:
            <input
              type="file"
              accept="image/*"
              name="foto"
              // El "value" de un input file no se controla. 
              // Almacenas la info en onChange si quieres guardarla en formData.
              onChange={handleFileChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
            />
          </label>

          {/* Observaciones */}
          <label className="block text-black dark:text-white">
            Observaciones:
            <textarea
              placeholder="Rellena con detalles relevantes, por ejemplo: color, olor, etc."
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-700"
              rows="3"
            ></textarea>
          </label>

          {/* Fin de Ciclo */}
          <label className="flex items-center text-black dark:text-white">
            <input
              type="checkbox"
              name="finCiclo"
              checked={formData.finCiclo}
              onChange={handleChange}
              className="mr-2"
            />
            Fin de Ciclo
          </label>

          {/* Volver a Durante */}
          <div>
            <Button texto="Volver a Durante" link={`/formularioDurante/${id}`} />
          </div>

          {/* Botón Enviar / Limpiar */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Enviar
            </button>

            {/* <button
              onClick={deletelocal}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Limpiar Todo y Volver
            </button> */}
          </div>
        </form>
      </div>
  )}
    </div>
  );
}
