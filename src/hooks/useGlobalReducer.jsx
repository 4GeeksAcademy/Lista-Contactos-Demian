// Importa los hooks necesarios desde React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";  // Importa el reducer y el estado inicial.

// Crea un contexto para contener el estado global de la aplicación.
// A este estado global lo llamamos "store" para diferenciarlo de los estados locales.
const StoreContext = createContext();

// Define un componente proveedor que encapsula el store y lo envuelve en un context provider,
// permitiendo compartir el estado global a través de todas las páginas y componentes de la app.
export function StoreProvider({ children }) {
    // Inicializa el reducer con el estado inicial.
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    // Proporciona el store y el método dispatch a todos los componentes hijos.
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Hook personalizado para acceder al estado global (store) y a la función dispatch desde cualquier componente.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);  // Obtiene store y dispatch del contexto.
    return { dispatch, store };  // Devuelve ambos para su uso en componentes.
}