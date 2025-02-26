import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const MapaCentros = () => {
  const { data: centrosData, loading, error } = useFetch("https://pablo.informaticamajada.es/api/centros");
  const [coordenadas, setCoordenadas] = useState([]);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const apiKey = "AIzaSyB9s3nJSOR2eyGEr0yuYIY898qtiMGAaE8"; // Reemplázala con tu clave de Google
  const mapId = "31cccb440e1eb474"; // Reemplázalo con tu Map ID

  // Cargar el script de Google Maps dinámicamente
  useEffect(() => {
    if (window.google) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&map_ids=${mapId}`;
    script.async = true;
    script.defer = true;
    script.onload = () => console.log("Google Maps cargado");

    document.body.appendChild(script);
  }, []);

  // Obtener coordenadas desde la API
  useEffect(() => {
    const obtenerCoordenadas = async () => {
      if (!centrosData) return;

      const centros = centrosData?.data || [];

      const nuevasCoordenadas = await Promise.all(
        centros.map(async (centro) => {
          const direccion = encodeURIComponent(centro.direccion);
          const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${apiKey}`;

          try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "OK") {
              const { lat, lng } = data.results[0].geometry.location;
              return { id: centro.id, nombre: centro.nombre, direccion: centro.direccion, lat, lng };
            } else {
              console.error(`No se pudo obtener coordenadas para: ${centro.direccion}`);
              return null;
            }
          } catch (error) {
            console.error("Error al obtener coordenadas:", error);
            return null;
          }
        })
      );

      setCoordenadas(nuevasCoordenadas.filter((c) => c !== null));
    };

    obtenerCoordenadas();
  }, [centrosData]);

  // Inicializar el mapa y agregar marcadores con InfoWindow
  useEffect(() => {
    if (!window.google || !mapRef.current || coordenadas.length === 0) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.4527, lng: -13.8631 },
      zoom: 10,
      mapId: mapId,
    });

    coordenadas.forEach(({ id, lat, lng, nombre, direccion }) => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat, lng },
        title: nombre,
      });

      // Crear el contenido del InfoWindow con un botón en lugar de un enlace
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 250px;">
            <h3 style="margin: 0;">${nombre}</h3>
            <p style="margin: 5px 0;">📍 ${direccion}</p>
            <button id="verDetallesBtn-${id}" style="color: blue; background: none; border: none; cursor: pointer; text-decoration: underline;">
              🔗 Ver detalles
            </button>
          </div>
        `,
      });

      // Abrir InfoWindow al hacer clic en el marcador
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // Agregar event listener al botón cuando el InfoWindow esté listo
      window.google.maps.event.addListener(infoWindow, "domready", () => {
        document.getElementById(`verDetallesBtn-${id}`).addEventListener("click", () => {
          navigate(`/centro/${id}/registros`);
        });
      });
    });
  }, [coordenadas, navigate]);

  if (loading) return <p className="text-center text-gray-200">Cargando Mapa...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default MapaCentros;
