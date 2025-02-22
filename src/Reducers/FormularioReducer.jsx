
export default function FormularioReducer(state, action) {
    switch (action.type) {
        case 'añadirDatos_antes':
            return{
                ...state,
                datosAntes: action.payload
            };
            
        case 'añadirDatos_durante':
            return {
                ...state,
                datosDurante: action.payload,
            };
        case 'añadirDatos_despues':
            return {
            ...state,
            datosDespues: action.payload,
            };
        case 'añadirId_ciclo':
            return{
            ...state,
            ciclo_id: action.payload
            }
            case 'añadirId_registro':
                return{
                ...state,
                registro_id: action.payload
                }
        default:
            return state;
        }
}
