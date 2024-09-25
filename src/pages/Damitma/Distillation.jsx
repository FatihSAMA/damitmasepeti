import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";

export default function Distillation() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "damitma"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])


  const [volume, setVolume] = useState(20); // Bira hacmi
  const [alcoholStrength, setAlcoholStrength] = useState(20); // Biranın alkol oranı
  const [distillateStrength, setDistillateStrength] = useState(60); // Distilat alkol oranı
  const [temperature, setTemperature] = useState(20); // Distilat sıcaklığı
  const [efficiency, setEfficiency] = useState(100); // Verimlilik
  const [useEfficiency, setUseEfficiency] = useState(false); // Verimlilik toggle
  const [distillateVolume, setDistillateVolume] = useState(0); // Distilat hacmi
  const [remainingVolume, setRemainingVolume] = useState(0); // Kalan hacim

  const calculateDistillation = () => {
    const V = parseFloat(volume);
    const SB = parseFloat(alcoholStrength);
    const SD = parseFloat(distillateStrength);
    const EF = useEfficiency ? parseFloat(efficiency) / 100 : 1;

    // Sıcaklık düzeltmesi (20 °C için düzeltme yapıyoruz)
    const correctedAlcoholStrength = SB + (temperature - 20) * 0.1; // Örnek düzeltme oranı

    // Hesaplama
    const VD = (EF * V * correctedAlcoholStrength) / SD; // Düzeltmeli alkol oranı ile hesaplama
    const VL = V - VD;

    setDistillateVolume(VD);
    setRemainingVolume(VL);
  };

  useEffect(() => {
    calculateDistillation();
  }, [volume, alcoholStrength, distillateStrength, efficiency, useEfficiency, temperature]); // Sıcaklık da eklendi

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/distillation.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Bira Hacmi"
            unit="L"
            value={volume}
            setter={setVolume}
          />
          <Input
            title="Biranın Alkol Oranı"
            unit="%"
            value={alcoholStrength}
            setter={setAlcoholStrength}
          />
          <Input
            title="Distilat Alkol Oranı"
            unit="%"
            value={distillateStrength}
            setter={setDistillateStrength}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useEfficiency} setState={setUseEfficiency} />
              <span>Verimlilik, <b>%</b></span>
            </div>
            {useEfficiency && (
              <Input 
                title={""}
                unit={""}
                value={efficiency}
                setter={setEfficiency}
              />
            )}
          </div>


        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Distilat Hacmi:</span>
              <span><b>{distillateVolume.toFixed(3)}</b> L</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Kalan Hacim:</span>
              <span><b>{remainingVolume.toFixed(3)}</b> L</span>
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
