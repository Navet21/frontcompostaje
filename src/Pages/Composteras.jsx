import Card from "../components/Card"

export default function Composteras (){
    return (
        <div>
                <Card
      type={11}
      estado={1}
      id={1}
      mode="Compostera"
      onButtonClick={() => console.log("Botón presionado")}
    />
    <Card
      type={22}
      estado={0}
      id={1}
      mode="Compostera"
      onButtonClick={() => console.log("Botón presionado")}
    />
    <Card
      type={33}
      estado={0}
      id={3}
      mode="Compostera"
      onButtonClick={() => console.log("Botón presionado")}
    />
        </div>
    )
}