import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function AlcoholDensity() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "alkol_kutle"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])


  const [volume, setVolume] = useState(100); // Alkol hacmi (ml)
  const [mass, setMass] = useState(80); // Alkol kütlesi (g)
  const [temperature, setTemperature] = useState(20); // Alkol sıcaklığı (°C)
  const [useTemperature, setUseTemperature] = useState(false); // Sıcaklık toggle
  const [density, setDensity] = useState(0); // Alkol yoğunluğu (%(ob.))

  const calculateDensity = () => {
    const M = parseFloat(mass);
    const V = parseFloat(volume);
    
    // Yoğunluk hesaplaması (g/ml)
    const P = M / V;
    
    // %(ob.) cinsinden yoğunluk
    const densityPercentage = P * 100;
    
    // Sıcaklık düzeltmesi (20 °C için düzeltme yapıyoruz)
    const correctedDensity = useTemperature ? densityPercentage + (temperature - 20) * 0.1 : densityPercentage;

    setDensity(correctedDensity);
  };

  useEffect(() => {
    calculateDensity();
  }, [volume, mass, temperature, useTemperature]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alchol5.png" alt="Alkol Yoğunluğu" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Alkol Hacmi"
            unit="ml"
            value={volume}
            setter={setVolume}
          />
          <Input
            title="Alkol Kütlesi"
            unit="g"
            value={mass}
            setter={setMass}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useTemperature} setState={setUseTemperature} />
              <span>Alkol Sıcaklığı, <b>°C</b></span>
            </div>
            {useTemperature && (
              <Input 
                title=""
                unit=""
                value={temperature}
                setter={setTemperature}
              />
            )}
          </div>
        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Alkol Yoğunluğu:</span>
              <span><b>{density.toFixed(2)}</b> %(ob.)</span>
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
