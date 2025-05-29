import React,{createContext,useState,useEffect} from "react";
import axios from "axios";

export const CityContext = createContext();



export function CityProvider({children})
{

    const [city,setCity] = useState("Loading...")

    
    


    return (
        <CityContext.Provider value={{ city }}>  
            {children}
        </CityContext.Provider>
    )


}