import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ReactApexChart from "react-apexcharts";
import { VscGraph } from "react-icons/vsc";

export default function Analisis() {
    const params = useParams();
    const { data: bolosData, loading, error } = useFetch(`http://localhost/api/antesBolo/${params.id}`);

    if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    const registros = bolosData || [];

    if (registros.length === 0) {
        return <p className="text-center text-gray-400">No hay datos disponibles.</p>;
    }

    // ✅ Filtrar datos por compostera_tipo y convertir fechas a timestamps
    const aporteData = registros
        .filter(r => r.compostera_tipo === "aporte")
        .map(r => [new Date(r.antes_created_at).getTime(), r.temp_compostera]);

    const degradacionData = registros
        .filter(r => r.compostera_tipo === "degradacion")
        .map(r => [new Date(r.antes_created_at).getTime(), r.temp_compostera]);

    const maduracionData = registros
        .filter(r => r.compostera_tipo === "maduracion")
        .map(r => [new Date(r.antes_created_at).getTime(), r.temp_compostera]);

    console.log("Aporte:", aporteData);
    console.log("Degradación:", degradacionData);
    console.log("Maduración:", maduracionData);

    const allTimestamps = [...aporteData, ...degradacionData, ...maduracionData].map(d => d[0]);
    const minTimestamp = Math.min(...allTimestamps);
    const maxTimestamp = Math.max(...allTimestamps);

    const timePadding = 1 * 24 * 60 * 60 * 1000;

    const chartOptions = {
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            width: '100%',
            background: 'transparent',
            animations: { enabled: false },
            zoom: { enabled: false },
            toolbar: { show: false }
        },
        colors: ['#14B8A6', '#2563EB', '#F59E0B'], // Verde azulado, Azul vibrante, Naranja cálido
        stroke: {
            curve: 'smooth',
            width: 3,
            dashArray: [0, 0, 0],
            connectNulls: false
        },
        markers: {
            size: 6,
            colors: ['#14B8A6', '#2563EB', '#F59E0B'],
            strokeColors: '#4B5563', // 🔹 Gris oscuro (se ve bien en blanco y negro)
            strokeWidth: 3
        },
        xaxis: {
            type: 'datetime',
            datetimeUTC: false,
            min: minTimestamp - timePadding,
            max: maxTimestamp + timePadding,
            labels: {
                format: 'dd MMM yyyy',
                style: { colors: '#fe6565' } // 🔹 Gris oscuro para visibilidad en blanco y negro
            }
        },
        yaxis: {
            title: {
                text: 'Temperatura (°C)',
                style: { color: '#fe6565' } // 🔹 Gris oscuro visible en ambos modos
            },
            labels: { style: { colors: '#fe6565' } },
        },
        tooltip: {
            enabled: true,
            followCursor: true,
            shared: true,
            intersect: false,
            theme: 'dark',
            style: {
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                background: '#222',
                color: '#fe6565'
            },
            x: {
                format: 'dd MMM yyyy'
            }
        },
        grid: {
            borderColor: '#fe6565', // 🔹 Gris medio para buena visibilidad
            padding: { right: 0, left: 10, bottom: 0 }
        },
        legend: {
            show: true,
            labels: { colors: '#fe6565' } // 🔹 Letras de leyenda gris oscuro (visibles en ambos modos)
        }
    };
    
    

    return (
        <div className="p-6 text-gray-200 rounded-lg overflow-hidden w-full">
            <div className="flex justify-start mb-4">
                <Link to={`/bolos/analisis/${params.id}`} className="text-black dark:text-white hover:text-gray-200 transition">
                    <VscGraph size={30}/>
                </Link>
            </div>
            <h2 className="text-2xl text-black dark:text-white font-bold mb-6 text-center">
                Análisis de Temperatura de la Compostera
            </h2>
            <ReactApexChart 
                options={chartOptions} 
                series={[
                    { name: 'Aporte', data: aporteData },
                    { name: 'Degradación', data: degradacionData },
                    { name: 'Maduración', data: maduracionData }
                ]} 
                type="line" 
                height={350} 
                width="100%" 
            />
            <div className="mt-6 flex justify-center">
                <Link to="/bolos" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition">
                    Volver
                </Link>
            </div>
        </div>
    );
}
