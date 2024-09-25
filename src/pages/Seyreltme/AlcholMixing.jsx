import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


const densityStrongAlcohol20C = 0.789; // g/ml for 95% alcohol at 20°C
const densityTargetAlcohol20C = 0.998; // g/ml for 40% alcohol at 20°C
const alpha = 0.0012; // Density change rate per °C

export default function AlcoholMixing() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "alkol_hacim"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])


  const [strength1, setStrength1] = useState(95); // İlk sıvının alkol oranı
  const [strength2, setStrength2] = useState(40); // İkinci sıvının alkol oranı
  const [desiredStrength, setDesiredStrength] = useState(70); // Karışımın istenen alkol oranı
  const [desiredVolume, setDesiredVolume] = useState(2000); // Karışımın istenen hacmi
  const [temperature, setTemperature] = useState(20); // Sıcaklık
  const [useTemperature, setUseTemperature] = useState(false); // Sıcaklık toggle
  const [volume1, setVolume1] = useState(0); // İlk sıvının hacmi
  const [volume2, setVolume2] = useState(0); // İkinci sıvının hacmi
  const [mass1, setMass1] = useState(0); // İlk sıvının kütlesi
  const [mass2, setMass2] = useState(0); // İkinci sıvının kütlesi
  const [absoluteVolume, setAbsoluteVolume] = useState(0); // Mutlak alkol hacmi
  const [contraction, setContraction] = useState(0); // Kontraksiyon

  const calculateMixing = () => {
    const Vx = parseFloat(desiredVolume);
    const MCx = parseFloat(desiredStrength);
    const MC1 = parseFloat(strength1);
    const MC2 = parseFloat(strength2);

    const adjustedDensityStrongAlcohol = densityStrongAlcohol20C + alpha * (temperature - 20);
    const adjustedDensityTargetAlcohol = densityTargetAlcohol20C + alpha * (temperature - 20);

    const Px = 1; // İstenilen sıvının yoğunluğu (1 g/ml varsayıyoruz)
    const P1 = adjustedDensityStrongAlcohol;
    const P2 = adjustedDensityTargetAlcohol;

    const Mx = Vx * Px;
    const M1 = Mx * (MCx - MC2) / (MC1 - MC2);
    const M2 = Mx - M1;
    const V1 = M1 / P1;
    const V2 = M2 / P2;
    const C = V1 + V2 - Vx;

    setVolume1(V1);
    setVolume2(V2);
    setMass1(M1);
    setMass2(M2);
    setAbsoluteVolume((V1 * MC1 + V2 * MC2) / 100);
    setContraction(C);
  };

  useEffect(() => {
    calculateMixing();
  }, [strength1, strength2, desiredStrength, desiredVolume, temperature, useTemperature]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alchol.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="İlk Sıvının Alkol Oranı"
            unit="%"
            value={strength1}
            setter={setStrength1}
          />
          <Input
            title="İkinci Sıvının Alkol Oranı"
            unit="%"
            value={strength2}
            setter={setStrength2}
          />
          <Input
            title="Karışımın İstenilen Alkol Oranı"
            unit="%"
            value={desiredStrength}
            setter={setDesiredStrength}
          />
          <Input
            title="Karışımın İstenilen Hacmi"
            unit="ml"
            value={desiredVolume}
            setter={setDesiredVolume}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useTemperature} setState={setUseTemperature} />
              <span>Sıcaklık, <b>°C</b></span>
            </div>
            {useTemperature && (
              <Input 
                title={""}
                unit={""}
                value={temperature}
                setter={setTemperature}
              />
            )}
          </div>
        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>İlk Sıvının Hacmi:</span>
              <span><b>{volume1.toFixed(2)}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İkinci Sıvının Hacmi:</span>
              <span><b>{volume2.toFixed(2)}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İlk Sıvının Kütlesi:</span>
              <span><b>{mass1.toFixed(2)}</b> g</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İkinci Sıvının Kütlesi:</span>
              <span><b>{mass2.toFixed(2)}</b> g</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Mutlak Alkol Hacmi:</span>
              <span><b>{absoluteVolume.toFixed(2)}</b> ml</span>
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
