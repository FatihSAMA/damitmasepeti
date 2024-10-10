import { useState, useEffect } from "react"
import Input from "../../components/Input"
import Toggle from "../../components/Toggle"
import Accordion from "../../components/Accordion"
import { sanityClient } from "../../../client"

export default function Sugar(){


  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "seker_puresi"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

    
  const [calculationType, setCalculationType] = useState('hydraulicModule')

  const [hydraulicModule, setHydraulicModule] = useState(4)
  const [waterVolume, setWaterVolume] = useState(28)
  const [pureVolume, setPureVolume] = useState(30)
  const [sugarMass, setSugarMass] = useState(7)
  const [result, setResult] = useState({})

  const [isFermentationOpen, setIsFermentationOpen] = useState(false)
  const [fermentationEfficiency, setFermentationEfficiency] = useState(100)

  const [resultType, setResultType] = useState(null)


  useEffect(() => {
    calculate()
  }, [calculationType, hydraulicModule, waterVolume, pureVolume, sugarMass, fermentationEfficiency])


  const handleCalculationTypeChange = e => {
    setCalculationType(e.target.value)
  }

  const calculate = () => {
    const MS = parseFloat(sugarMass)
    const E = parseFloat(fermentationEfficiency)
    let resultData = {}

    if (calculationType === 'hydraulicModule') {
      const G = parseFloat(hydraulicModule);
      const VW = MS * G
      const VS = VW + MS * 0.63
      const VAS = (E / 100) * MS * 0.682
      const SS = (MS / (MS + VW)) * 100
      const SB = (VAS * 100) / VS
      const V40 = (VS * SB) / 40

      resultData = { VW, VS, VAS, SS, SB, V40 }
      setResultType("hydraulicModule")
    } else if (calculationType === 'waterVolume') {
      const VW = parseFloat(waterVolume)
      const G = VW / MS
      const VS = VW + MS * 0.63
      const VAS = (E / 100) * MS * 0.682
      const SS = (MS / (MS + VW)) * 100
      const SB = (VAS * 100) / VS
      const V40 = (VS * SB) / 40
      
      resultData = { G, VS, VAS, SS, SB, V40 }
      setResultType("waterVolume")
    } else if (calculationType === 'pureVolume') {
      const VB = parseFloat(pureVolume)
      const VW = VB - MS * 0.63
      const G = VW / MS
      const VAS = (E / 100) * MS * 0.682
      const SS = (MS / (MS + VW)) * 100
      const SB = (VAS * 100) / VB
      const V40 = (VB * SB) / 40

      resultData = { VW, G, VAS, SS, SB, V40 }
      setResultType("pureVolume")
    }

    const ure = MS * 2
    const monofosfat = MS * 4.5
    const magnezyum = MS * 2
    const sodyum = MS * 4
    const klorur = MS * 10
    const manganez = MS * .6
    const cinko = MS * .6
    resultData = {...resultData, ure, monofosfat, magnezyum, sodyum, klorur, manganez, cinko}

    setResult(resultData)
  }


  return(
    <div className="calc-container">

      <div className="calc-header">
          <div className="calc-icon">
              <img src="/icons/sugar.png" alt=""/>
          </div>

          <h1 className="calc-title">
              {data?.title}
          </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          
          {/* Hesaplama Türü */}
          <div className="w-full">
            <label htmlFor="type" className="label">Hesaplama Yöntemi</label>
            <select id="type" className="input py-1.5 px-2" value={calculationType} onChange={handleCalculationTypeChange}>
              <option value="hydraulicModule">Hidromodüle Göre</option>
              <option value="waterVolume">Su Hacmine Göre</option>
              <option value="pureVolume">Mayşe Hacmine Göre</option>
            </select>
          </div>

          {calculationType === "hydraulicModule" && (
            <Input
              title="Hidromodül"
              unit="1:"
              value={hydraulicModule}
              setter={setHydraulicModule}
            />
          )}

          {calculationType === "waterVolume" && (
            <Input
              title="Su Hacmi"
              unit="L"
              value={waterVolume}
              setter={setWaterVolume}
            />
          )}

          {calculationType === "pureVolume" && (
            <Input
              title="Mayşe Hacmi"
              unit="L"
              value={pureVolume}
              setter={setPureVolume}
            />
          )}

          <Input
            title="Şeker Kütlesi"
            unit="kg"
            value={sugarMass}
            setter={setSugarMass}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={isFermentationOpen} setState={setIsFermentationOpen} />
              <span>Fermantasyon Verimliliği, <b>%</b></span>
            </div>
            
            {isFermentationOpen && (
              <Input 
                title={""}
                unit={""}
                value={fermentationEfficiency}
                setter={setFermentationEfficiency}
              />
            )}
          </div>


        </div>

        <div className="calc-result">
            
            {Object.keys(result).length !== 0 && (
              <>
                {calculationType === "hydraulicModule" && resultType === "hydraulicModule" && (
                  <div className="divide-y space-y-2">
                    <div className="flex justify-between w-full pt-2">
                      <span>Gerekli Su Hacmi :</span>
                      <span><b>{result?.VW.toFixed(3)}</b> ml</span>
                    </div>                
                    
                    <div className="flex justify-between w-full pt-2">
                      <span>Toplam Mayşe Hacmi :</span>
                      <span><b>{result?.VS.toFixed(3)}</b> ml</span>
                    </div>
                    
                    <div className="flex justify-between w-full pt-2">
                      <span>Mayşenin Şeker İçeriği :</span>
                      <span><b>{result?.SS.toFixed(2)}</b> % </span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Mayşenin Alkol İçeriği :</span>
                      <span><b>{result?.SB.toFixed(2)}</b> % </span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Mutlak Alkol Hacmi :</span>
                      <span><b>{result?.VAS.toFixed(3)}</b> ml</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Damıtık %40 Hacim :</span>
                      <span><b>{result?.V40.toFixed(3)}</b> ml</span>
                    </div>

                  </div>
                )}

                {calculationType === "waterVolume" && resultType === "waterVolume" && (
                  <div className="divide-y space-y-2">
                    <div className="flex justify-between w-full pt-2">
                      <span>Hidromodül :</span>
                      <span><b>1 : {result?.G.toFixed(1)}</b></span>
                    </div>                
                    
                    <div className="flex justify-between w-full pt-2">
                      <span>Toplam Mayşe Hacmi :</span>
                      <span><b>{result?.VS.toFixed(3)}</b> ml</span>
                    </div>
                    
                    <div className="flex justify-between w-full pt-2">
                      <span>Mayşenin Şeker İçeriği :</span>
                      <span><b>{result?.SS.toFixed(2)}</b> %</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Mayşenin Alkol İçeriği :</span>
                      <span><b>{result?.SB.toFixed(2)}</b> %</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Mutlak Alkol Hacmi :</span>
                      <span><b>{result?.VAS.toFixed(3)}</b> ml</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Hacim %40 damıtık :</span>
                      <span><b>{result?.V40.toFixed(3)}</b> ml</span>
                    </div>

                  </div>
                )}

                {calculationType === "pureVolume"  && resultType === "pureVolume" && (
                  <div className="divide-y space-y-2">
                    <div className="flex justify-between w-full pt-2">
                      <span>Gerekli Su Hacmi :</span>
                      <span><b>{result?.VW.toFixed(3)}</b> ml</span>
                    </div>                
                    
                    <div className="flex justify-between w-full pt-2">
                      <span>Hidromodül :</span>
                      <span><b>1 : {result?.G.toFixed(1)}</b></span>
                    </div>
                    
                    <div className="flex justify-between w-full pt-2">
                      <span>Mayşenin Şeker İçeriği :</span>
                      <span><b>{result?.SS.toFixed(2)}</b> %</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Mayşenin Alkol İçeriği :</span>
                      <span><b>{result?.SB.toFixed(2)}</b> %</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Mutlak Alkol Hacmi :</span>
                      <span><b>{result?.VAS.toFixed(3)}</b> ml</span>
                    </div>

                    <div className="flex justify-between w-full pt-2">
                      <span>Hacim %40 damıtık :</span>
                      <span><b>{result?.V40.toFixed(3)}</b> ml</span>
                    </div>

                  </div>
                )}

                <div className="border-t border border-zinc-300 my-4" />

                <div className="divide-y space-y-2">
                  <div className="flex justify-between w-full pt-2">
                    <span>Üre :</span>
                    <span><b>{result.ure.toFixed(2)}</b> gr</span>
                  </div>

                  <div className="flex justify-between w-full pt-2">
                    <span>Potasyum monofosfat :</span>
                    <span><b>{result.monofosfat.toFixed(2)}</b> gr</span>
                  </div>

                  <div className="flex justify-between w-full pt-2">
                    <span>Magnezyum sülfat :</span>
                    <span><b>{result.magnezyum.toFixed(2)}</b> gr</span>
                  </div>

                  <div className="flex justify-between w-full pt-2">
                    <span>Sodyum klorür :</span>
                    <span><b>{result.sodyum.toFixed(2)}</b> gr</span>
                  </div>

                  <div className="flex justify-between w-full pt-2">
                    <span>Potasyum klorür :</span>
                    <span><b>{result.klorur.toFixed(2)}</b> gr</span>
                  </div>

                  <div className="flex justify-between w-full pt-2">
                    <span>Manganez sülfat :</span>
                    <span><b>{result.manganez.toFixed(2)}</b> gr</span>
                  </div>

                  <div className="flex justify-between w-full pt-2">
                    <span>Çinko sülfat :</span>
                    <span><b>{result.cinko.toFixed(2)}</b> gr</span>
                  </div>
                </div>
              </>
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