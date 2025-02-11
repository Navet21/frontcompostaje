import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApexCharts from 'apexcharts'

export default function Analisis() {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`https://pablo.informaticamajada.es/api/registrosBolo/${params.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setRegistros(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los bolos:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    const tempAmbiente = registros.map(registro => [new Date(registro.fecha).getTime(), registro.temp_ambiente]);
    const tempCompostera = registros.map(registro => [new Date(registro.fecha).getTime(), registro.temp_compostera]);

    const chartOptions = {
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
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
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Temperatura (°C)'
            }
        },
        legend: {
            show: true
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Análisis de Temperaturas</h2>
            <ApexCharts options={chartOptions} series={[
                { name: 'Temp Ambiente', data: tempAmbiente },
                { name: 'Temp Compostera', data: tempCompostera }
            ]} type="line" height={350} />
        </div>
    );
}
