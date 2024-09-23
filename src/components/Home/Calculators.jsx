import { useState } from "react";
import Box from "./Box";
import { useEffect } from "react";
import getCalculators from "../../constants/calculators";

export default function Calculators(){

    const [calculators, setCalculators] = useState([])
    useEffect(() => {

        const getCalcs = async () => {
            const calcs = await getCalculators()
            setCalculators(calcs)
        }
        getCalcs()
    }, [])

    return(
        <section id="calculator" className="xcontainer pt-6">
            {calculators.length > 0 && calculators.map((section, index) => (
                <div className="my-8" key={index}>
                    <h2 className="text-2xl font-bold mb-8 h-[50px] flex items-center from-primary/15 to-20% to-primary/0 bg-gradient-to-r relative before:bg-primary before:absolute before:h-full before:w-2 before:rounded-full before:left-0 pl-4">
                        {section.title}
                    </h2>
                    <div className="flex flex-wrap gap-8 justify-evenly md:justify-start">
                        {section.calcs.map((calc, i) => <Box {...calc} key={i} />)}
                    </div>
                </div>
            ))}
        </section>
    )
}