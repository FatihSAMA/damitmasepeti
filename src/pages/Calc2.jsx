import { useState } from "react"
import Input from "../components/Input"
import { useEffect } from "react"

export default function Calc2(){


    return(
        <div className="calc-container">

            <div className="calc-top">
                <div className="flex flex-col gap-6 ">
                    <h1 className="font-bold text-xl">
                    Alkol Sayacı Okumalarının Düzeltilmesi
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellendus vero ad quas dolorum numquam.
                    </p>
                </div>

                <div className="w-[150px] h-[150px] ">
                    <img src="/icons/alkolfix.png" alt="" />
                </div>

            </div>
            
            <div className="calc-bottom">
                <div className="calc-left">

                    düzeltilecek!
                </div>
            </div>

        </div>
    )
}