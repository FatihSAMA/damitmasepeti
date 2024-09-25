import { useState, createContext } from "react"

export const CalculationContext = createContext()

export default function CalculationProvider({children}){
    
    const [calculations, setCalculations] = useState([])

    return(
        <CalculationContext.Provider value={{calculations, setCalculations}}>
            {children}
        </CalculationContext.Provider>
    )
}