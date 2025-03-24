import { useReducer, createContext, useContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialStore);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useGlobalReducer must be used within a StoreProvider");
    return context;
}
export const useStore = () => useContext(StoreContext);