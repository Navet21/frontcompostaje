import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ReactApexChart from "react-apexcharts";

export default function Analisis() {
    const params = useParams();
    const { data: bolosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/antesBolo/${params.id}`);

    if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    const registros = bolosData || [];

    if (registros.length === 0) {
        return <p className="text-center text-gray-400">No hay datos disponibles.</p>;
    }

    const tempAmbiente = registros.map(registro => [
        registro.created_at, registro.temp_ambiente
    ]);
    const tempCompostera = registros.map(registro => [
        registro.created_at, registro.temp_compostera
    ]);

    console.log(tempAmbiente);
    console.log(tempCompostera);

    const chartOptions = {
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 50000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Temperaturas en Compostera',
            align: 'left'
        },
        markers: {
            size: 1
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: 'Temperatura (°C)',
                min: Math.min(...tempAmbiente.map(d => d[1]), ...tempCompostera.map(d => d[1])) - 2,
                max: Math.max(...tempAmbiente.map(d => d[1]), ...tempCompostera.map(d => d[1])) + 2
            }
        },
        legend: {
            show: true
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Análisis de Temperaturas</h2>
            <ReactApexChart 
                options={chartOptions} 
                series={[
                    { name: 'Temp Ambiente', data: tempAmbiente },
                    { name: 'Temp Compostera', data: tempCompostera }
                ]} 
                type="line" 
                height={350} 
            />
            <div className="mt-6 flex justify-center">
                <Link to="/bolos" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition">
                    Volver
                </Link>
            </div>
        </div>
    );
}
