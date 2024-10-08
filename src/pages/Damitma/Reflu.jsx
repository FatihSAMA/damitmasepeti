import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function RefluxRatioCalculator() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "reflu"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  const [alcoholStrength, setAlcoholStrength] = useState(95); // Çıkış alkol derecesi
  const [power, setPower] = useState(2000); // Verilen güç
  const [flowRate, setFlowRate] = useState(2); // Akış hızı
  const [heatLossPercentage, setHeatLossPercentage] = useState(10); // Isı kaybı yüzdesi
  const [useHeatLoss, setUseHeatLoss] = useState(false); // Isı kaybı yüzdesi toggle
  const [refluxRatio, setRefluxRatio] = useState(0); // Reflüks oranı

  const [resultColor, setResultColor] = useState("")

  useEffect(() => {
    const S = alcoholStrength / 100;
    const W = power;
    const V = flowRate;
    const P = useHeatLoss ? parseFloat(heatLossPercentage) : 0;
  
    const F0 = (((((1 - S) + (S / 0.789)) * (W / (((1 - S) * 2260) + (855 * S)))) * 60) * 10) / (V / 0.06) / 10;
    const F = F0 - (P * F0) / 100;

    if(F > 2.5 && F <= 3) setResultColor("text-blue-600")
    else if(F > 3) setResultColor("text-green-500")
    else setResultColor("text-red-600")

    setRefluxRatio(F.toFixed(1));
  }, [alcoholStrength, power, flowRate, useHeatLoss, heatLossPercentage]);
  

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/reflu.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Çıkış Alkol Derecesi"
            unit="%"
            value={alcoholStrength}
            setter={setAlcoholStrength}
          />

          <Input
            title="Verilen Güç"
            unit="W"
            value={power}
            setter={setPower}
          />

          <Input
            title="Akış Hızı"
            unit="L/sa"
            value={flowRate}
            setter={setFlowRate}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useHeatLoss} setState={setUseHeatLoss} />
              <span>Isı Kaybı Yüzdesi, <b>%</b></span>
            </div>
            {useHeatLoss && (
              <Input 
                title={""}
                unit={""}
                value={heatLossPercentage}
                setter={setHeatLossPercentage}
              />
            )}
          </div>


        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Geri Akış Oranı:</span>
              <span className={resultColor}><b>{refluxRatio}</b></span>
            </div>
          </div>
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
  );
}
