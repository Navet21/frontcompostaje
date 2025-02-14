import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Estilos
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
  label: { fontSize: 12, marginBottom: 5 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  checkbox: { width: 10, height: 10, borderWidth: 1, marginRight: 5 },
  inputBox: { border: "1px solid black", height: 20, padding: 2, fontSize: 12 },
  textarea: { border: "1px solid black", height: 60, padding: 2, fontSize: 12 },
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
          <Text style={styles.label}>Nivel de Llenado:</Text>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Bajo</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Medio</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Alto</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Olor:</Text>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Neutro</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Fuerte</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Desagradable</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Insectos Presentes:</Text>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Sí</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>No</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tipo de Insectos:</Text>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Larvas</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Hormigas</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Mosquitos</Text></View>
          <View style={styles.checkboxContainer}><View style={styles.checkbox}></View><Text>Gusanos</Text></View>
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
      loading ? "Generando PDF..." : <button className="bg-blue-600 text-white p-2 rounded cursor-pointer">Descargar PDF</button>
    }
  </PDFDownloadLink>
);

export default DescargarPDF;
