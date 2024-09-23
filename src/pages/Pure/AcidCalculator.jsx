import { useState, useEffect } from "react"
import Input from "../../components/Input"
import Accordion from "../../components/Accordion"
import { sanityClient } from "../../../client"

export default function AcidCalculator(){

    const [data, setData] = useState([])
    useEffect(() => {
      
      const fetchData = async () => {
        
        try{
          const query = `*[_type == "calculations" && id == "optimum_sira"]`
          const result = await sanityClient.fetch(query)
          setData(result[0])
        }
        catch(err){
          console.log("Veri çekilirken hata meydana geldi!", err)
        }
  
      }
  
      fetchData()
  
    }, [])

    const [error, setError] = useState(false)

    const [pH1, setPH1] = useState(4.8)
    const [pH2, setPH2] = useState(7)
    const [volume, setVolume] = useState(20)
    const [result, setResult] = useState(null)

    const MR = 192.124
    const Ka = 7.41e-4

    const calculate = () => {
        const pH1Value = parseFloat(pH1)
        const pH2Value = parseFloat(pH2)
        const volumeValue = parseFloat(volume)

        if(isNaN(pH1Value) || isNaN(pH2Value) || isNaN(volumeValue)){
            setError(true)
            return "Lütfen tüm alanları doldurun"
        }
        if(pH1Value < 0 || pH1Value > 7 || pH2Value < 0 || pH2Value > 7){
            setError(true)
            return "pH değeri 0 ile 7 arasında olmalıdır!"
        }

        const term1 = MR * (Math.pow((2 * Math.pow(10, -pH1Value) + Ka), 2) - Math.pow(Ka, 2))
        const term2 = MR * (Math.pow((2 * Math.pow(10, -pH2Value) + Ka), 2) - Math.pow(Ka, 2))
    
        const mass = (volumeValue * (term1 / (4 * Ka))) - (volumeValue * (term2 / (4 * Ka)))
        setError(false)

        return mass.toFixed(2)

    }

    useEffect(() => {
        setResult(calculate())
    },[pH1, pH2, volume])



    return(
        <div className="calc-container">

            <div className="calc-header">
                <div className="calc-icon">
                    <img src="/icons/ph.png" alt="" />
                </div>

                <h1 className="calc-title">
                    {data?.title}
                </h1>
            </div>
            
            <div className="calc-bottom">
                <div className="calc-inputs">
                    <Input title="Mayşe Hacmi" unit="l" value={volume} setter={setVolume} />
                    <Input title="Başlangıç pH Değeri" unit="ph" value={pH2} setter={setPH2} />
                    <Input title="Gerekli pH Değeri" unit="ph" value={pH1} setter={setPH1} />
                </div>

                <div className="calc-result">
                    {!error && ("Asit Kütlesi : "  + result + "g")}
                    {error && result}
                </div>
            </div>

            {data?.accordions?.length > 0 && (
                data.accordions.map((accordion, index) => (
                <Accordion title={accordion.title} content={accordion.content} key={index} />
                ))
            )}


        </div>
    )
}