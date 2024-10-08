import { useState, useEffect } from "react"
import Input from "../../components/Input"
import Accordion from "../../components/Accordion"
import { sanityClient } from "../../../client"


export default function Refractometer() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "refaktormetre"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  const [initialSG, setInitialSG] = useState(1.050)
  const [finalSG, setFinalSG] = useState(1.010)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    calculate()
  }, [initialSG, finalSG])

  const handleCalculationTypeChange = (e) => {
    setCalculationType(e.target.value)
  }

  const calculate = () => {
    let resultData = 0


    const SG1 = parseFloat(initialSG)
    const SG2 = parseFloat(finalSG)
    if (!isNaN(SG1) && !isNaN(SG2) && SG1 >= 1 && SG1 <= 1.130 && SG2 >= 1 && SG2 <= 1.130) {
      resultData = (SG1 - SG2) * 129
      setError(false)
    } else {
      setError("Özgül ağırlık 1 ila 1.130 arasında olmalıdır.")
    }
    

    setResult(resultData)
  }

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/hidrometre.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">

          <Input
            title="Fermantasyon Öncesi Özgül Ağırlık"
            unit="g/ml"
            value={initialSG}
            setter={setInitialSG}
          />
          <Input
            title="Fermantasyon Sonrası Özgül Ağırlık"
            unit="g/ml"
            value={finalSG}
            setter={setFinalSG}
          />
           
        </div>

        <div className="calc-result">
          {result !== null && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                {error && (
                  <span>{error}</span>
                )}
                {!error && (
                  <>
                    <span>Mayşenin Alkol İçeriği :</span>
                    <span><b>{result.toFixed(2)}</b> %</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="accordions">
        {data?.accordions?.length > 0 && (
          data.accordions.map((accordion, index) => (
            <Accordion title={accordion.title} content={accordion.content} key={index} />
          ))
        )}
      </div>

    </div>
  )
}
