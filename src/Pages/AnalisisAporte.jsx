import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ReactApexChart from "react-apexcharts";
import { GoGraph } from "react-icons/go";

export default function Analisis() {
    const params = useParams();
    const { data: bolosData, loading, error } = useFetch(`http://localhost/api/durantesBolo/${params.id}`);

    if (loading) return <p className="text-center text-gray-200">Cargando Bolos...</p>;
    if (error) return <p className="text-center text-red-400">Error: {error}</p>;

    const registros = bolosData || [];

    if (registros.length === 0) {
        return <p className="text-center text-gray-400">No hay datos disponibles.</p>;
    }

    // ✅ Agrupar datos por fecha
    const categorias = [...new Set(registros.map(reg => reg.durante_created_at))];

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
            stacked: true,
            height: 400,
            width: "100%",
            background: "transparent",
            animations: { enabled: true },
            zoom: { enabled: false },
            toolbar: { show: false }
        },
        colors: ["#2563EB", "#F59E0B"], // Azul y Naranja
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "35%", // 🔹 Ajuste para mejor distribución horizontal
                borderRadius: 4 // 🔹 Bordes redondeados
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "14px",
                colors: ["#ffffff"]
            }
        },
        xaxis: {
            categories: categorias,
            tickPlacement: "on",
            labels: {
                rotate: -45,
                style: { colors: "#fe6565", fontSize: "12px" }
            }
        },
        yaxis: {
            title: {
                text: "Cantidad (Litros)",
                style: { color: "#fe6565", fontSize: "14px" }
            },
            labels: {
                style: { colors: "#fe6565", fontSize: "12px" }
            }
        },
        tooltip: {
            theme: "dark",
            style: {
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                background: "#222",
                color: "#fe6565"
            }
        },
        grid: {
            borderColor: "#fe6565",
            padding: { right: 40, left: 40, bottom: 20 } // 🔹 Más espacio en los lados
        },
        legend: {
            show: true,
            position: "top", // 🔹 Mueve la leyenda arriba para más espacio horizontal
            labels: { colors: "#fe6565", fontSize: "12px" }
        }
    };

    return (
        <div className="p-6 text-gray-200 rounded-lg overflow-hidden w-full">
            <div className="flex justify-start mb-4">
                <Link to={`/bolos/${params.id}`} className="text-black dark:text-white hover:text-gray-200 transition">
                    <GoGraph size={30} />
                </Link>
            </div>

            <h2 className="text-2xl text-black dark:text-white font-bold mb-6 text-center">
                Análisis de Aportes por Día
            </h2>
            <div className="w-full">
                <ReactApexChart 
                    options={chartOptions} 
                    series={[
                        { name: "Aporte Verde (L)", data: aporteVerde },
                        { name: "Aporte Seco (L)", data: aporteSeco }
                    ]} 
                    type="bar" 
                    height={400} 
                    width="100%" 
                />
            </div>
            <div className="mt-6 flex justify-center">
                <Link to="/bolos" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition">
                    Volver
                </Link>
            </div>
        </div>
    );
}
