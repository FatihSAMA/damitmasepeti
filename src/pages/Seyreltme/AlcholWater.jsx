import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


const densityStrongAlcohol = 0.789; // g/ml for 95% alcohol
const densityTargetAlcohol = 0.998; // g/ml for 40% alcohol

export default function AlcoholWater() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "alkol_karistirma"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])
  
  const [strongAlcoholStrength, setStrongAlcoholStrength] = useState(95); // % (об.)
  const [targetStrength, setTargetStrength] = useState(40); // % (об.)
  const [targetVolume, setTargetVolume] = useState(1000); // ml
  const [temperature, setTemperature] = useState(20); // °C
  const [useTemperature, setUseTemperature] = useState(false); // Temperature toggle
  const [strongAlcoholVolume, setStrongAlcoholVolume] = useState(0); // ml
  const [waterVolume, setWaterVolume] = useState(0); // ml
  const [strongAlcoholMass, setStrongAlcoholMass] = useState(0); // g
  const [finalMass, setFinalMass] = useState(0); // g
  const [absoluteAlcoholVolume, setAbsoluteAlcoholVolume] = useState(0); // ml
  const [contraction, setContraction] = useState(0); // ml

  const calculateMixing = () => {
    const S1 = parseFloat(strongAlcoholStrength);
    const S2 = parseFloat(targetStrength);
    const V2 = parseFloat(targetVolume);

    // Güçlü alkol hacmi (ml)
    const V1 = (V2 * S2) / S1;

    // Güçlü alkol kütlesi (g)
    const M1 = V1 * densityStrongAlcohol;

    // Gereken alkol kütlesi (g)
    const M2 = V2 * densityTargetAlcohol;

    // Su hacmi (ml)
    const V = M2 - M1;

    // Kontraksiyon (ml)
    const C = V1 + V - V2;

    // Sonuçları güncelleme
    setStrongAlcoholVolume(V1);
    setWaterVolume(V);
    setStrongAlcoholMass(M1);
    setFinalMass(M2);
    setAbsoluteAlcoholVolume(V2 * (S2 / 100));
    setContraction(C);
  };

  useEffect(() => {
    calculateMixing();
  }, [strongAlcoholStrength, targetStrength, targetVolume, temperature, useTemperature]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alchol3.png" alt="Alkol Karıştırma" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Güçlü Alkol Oranı"
            unit="% (об.)"
            value={strongAlcoholStrength}
            setter={setStrongAlcoholStrength}
          />
          <Input
            title="Gereken Alkol Oranı"
            unit="% (об.)"
            value={targetStrength}
            setter={setTargetStrength}
          />
          <Input
            title="Gereken Hacim"
            unit="ml"
            value={targetVolume}
            setter={setTargetVolume}
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
              <span>Güçlü Alkol Hacmi:</span>
              <span><b>{strongAlcoholVolume.toFixed(2)}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Sulandırma İçin Su Hacmi:</span>
              <span><b>{waterVolume.toFixed(2)}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Güçlü Alkol Kütlesi:</span>
              <span><b>{strongAlcoholMass.toFixed(2)}</b> g</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Karışım Sonrası Kütle:</span>
              <span><b>{finalMass.toFixed(2)}</b> g</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Mutlak Alkol Hacmi:</span>
              <span><b>{absoluteAlcoholVolume.toFixed(2)}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Kontraksiyon:</span>
              <span><b>{contraction.toFixed(2)}</b> ml</span>
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
