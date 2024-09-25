import { useState, useContext, useEffect } from "react";
import Box from "./Box";
import { CalculationContext } from "../../context/CalculationProvider";

export default function Calculators(){

    const { calculations } = useContext(CalculationContext);

    return(
        <section id="calculator" className="xcontainer">
            {calculations.length > 0 && calculations.map((section, index) => (
                <div className="my-8" key={index}>
                    <h2 className="text-2xl font-bold mb-8 h-[50px] flex items-center from-primary/15 to-20% to-primary/0 bg-gradient-to-r relative before:bg-primary before:absolute before:h-full before:w-2 before:rounded-full before:left-0 pl-4">
                        {section.title}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                        {section.calcs.map((calc, i) => <Box {...calc} key={i} />)}
                    </div>
                </div>
            ))}
        </section>
    )
}