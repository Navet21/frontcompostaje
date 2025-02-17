import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ReactApexChart from "react-apexcharts";

export default function Analisis() {
    const params = useParams();
    const { data: bolosData, loading, error } = useFetch(`https://pablo.informaticamajada.es/api/durantesBolo/${params.id}`);

    if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    const registros = bolosData || [];

    if (registros.length === 0) {
        return <p className="text-center text-gray-400">No hay datos disponibles.</p>;
    }

    // ✅ Agrupar datos por fecha (sin importar compostera_tipo)
    const categorias = [...new Set(registros.map(reg => reg.durante_created_at))]; // Fechas únicas

    const aporteVerde = categorias.map(date => {
        return registros
            .filter(reg => reg.durante_created_at === date)
            .reduce((sum, reg) => sum + (reg.cantidad_aporteVLitros || 0), 0);
    });

    const aporteSeco = categorias.map(date => {
        return registros
            .filter(reg => reg.durante_created_at === date)
            .reduce((sum, reg) => sum + (reg.cantidad_aporteSLitros || 0), 0);
    });

    const chartOptions = {
        chart: {
            id: "stacked-bar",
            type: "bar",
            stacked: true, // 🔹 Barras apiladas
            height: 350,
            width: "100%",
            background: "transparent",
            animations: { enabled: false },
            zoom: { enabled: false },
            toolbar: { show: false }
        },
        colors: ["#2563EB", "#F59E0B"], // 🔹 Azul para Aporte Verde, Naranja para Aporte Seco
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%", // 🔹 Tamaño de barras optimizado
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: true, // 🔹 Mostrar valores dentro de las barras
            style: {
                colors: ["#fff"] // 🔹 Números en blanco dentro de las barras
            }
        },
        xaxis: {
            categories: categorias,
            labels: {
                rotate: -45, // 🔹 Inclina fechas para mejor lectura
                style: { colors: "#111827" }
            }
        },
        yaxis: {
            title: {
                text: "Cantidad (Litros)",
                style: { color: "#111827" }
            },
            labels: {
                style: { colors: "#111827" }
            }
        },
        tooltip: {
            theme: "dark",
            style: {
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                background: "#222",
                color: "#ffffff"
            }
        },
        grid: {
            borderColor: "#9CA3AF",
            padding: { right: 0, left: 10, bottom: 0 }
        },
        legend: {
            show: true,
            labels: { colors: "#111827" }
        }
    };

    return (
        <div className="p-6 text-gray-200 rounded-lg overflow-hidden w-full">
            <h2 className="text-2xl text-black dark:text-white font-bold mb-6 text-center">
                Análisis de Aportes por Día
            </h2>
            <ReactApexChart 
                options={chartOptions} 
                series={[
                    { name: "Aporte Verde (L)", data: aporteVerde },
                    { name: "Aporte Seco (L)", data: aporteSeco }
                ]} 
                type="bar" 
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
