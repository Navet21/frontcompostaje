import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from "@react-pdf/renderer";
import larvas from "../images/larvas.jpg";
import hormigas from "../images/hormigas.jpg";
import mosquitos from "../images/mosquitos.jpg";
import gusanos from "../images/gusano.jpg";

// Estilos
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
  label: { fontSize: 12, marginBottom: 5 },
  inputBox: { border: "1px solid black", height: 20, padding: 2, fontSize: 12 },
  textarea: { border: "1px solid black", height: 60, padding: 2, fontSize: 12 },
  image: { width: 60, height: 60, marginRight: 5 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
});

// Documento PDF
const FormularioAntesPDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Formulario de Antes para Compostera 1</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Temperatura Ambiente:</Text>
          <View style={styles.inputBox}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Temperatura Compost:</Text>
          <View style={styles.inputBox}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nivel de Llenado (Bajo / Medio / Alto):</Text>
          <View style={styles.inputBox}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Olor (Neutro / Fuerte / Desagradable):</Text>
          <View style={styles.inputBox}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Insectos Presentes (Sí / No):</Text>
          <View style={styles.inputBox}></View>
        </View>

        <Text style={styles.label}>Tipo de Insectos:</Text>
        <View style={styles.row}>
          <Image src={larvas} style={styles.image} />
          <Text>Larvas</Text>
          <Image src={hormigas} style={styles.image} />
          <Text>Hormigas</Text>
        </View>
        <View style={styles.row}>
          <Image src={mosquitos} style={styles.image} />
          <Text>Mosquitos</Text>
          <Image src={gusanos} style={styles.image} />
          <Text>Gusanos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Observaciones:</Text>
          <View style={styles.textarea}></View>
        </View>
      </Page>
    </Document>
  );
};

// Componente para descargar el PDF
const DescargarPDF = () => (
  <PDFDownloadLink document={<FormularioAntesPDF />} fileName="FormularioAntes.pdf">
    {({ loading }) =>
      loading ? "Generando PDF..." : <button className="bg-blue-600 text-white p-2 rounded">Descargar PDF</button>
    }
  </PDFDownloadLink>
);

export default DescargarPDF;
