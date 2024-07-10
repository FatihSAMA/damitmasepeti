import { useState, useEffect } from "react"
import Input from "../../components/Input"

export default function AlcholFix(){

    const [temprature, setTemprature] = useState(25)
    const [alcholVolume, setAlcholVolume] = useState(98)
    const [result, setResult] = useState(null)

    // katsayı
    const factor = .3

    const calculate = () => {
        const tempratureValue = parseFloat(temprature)
        const alcholVolumeValue = parseFloat(alcholVolume)
    
        const res = alcholVolumeValue + (20 - tempratureValue) * factor

        setResult(res)

    }

    useEffect(() => {
        calculate()
    },[temprature, alcholVolume])



    return(
        <div className="calc-container">

            <div className="calc-header">
                <div className="calc-icon">
                    <img src="/icons/alkolfix.png" alt="" />
                </div>

                <h1 className="calc-title">
                    Alkol Sayacı Okumalarının Düzeltilmesi
                </h1>
            </div>
            
            <div className="calc-bottom">
                <div className="calc-inputs">
                    <Input title="Alkol Sıcaklığı" unit="°C" value={temprature} setter={setTemprature} />
                    <Input title="Alkol İçeriği" unit="%(hacim)" value={alcholVolume} setter={setAlcholVolume} />
                </div>

                <div className="calc-result">
                    <div className="flex justify-between w-full pt-2">
                        <span>Gerçek Alkol İçeriği :</span>
                        <span><b>{result?.toFixed(2)}</b> %</span>
                    </div>
                </div>
            </div>

        </div>
    )
}