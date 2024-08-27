import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";

export default function UnitConverter() {
  const [conversionType, setConversionType] = useState("volumeToMass");
  const [volume, setVolume] = useState(1000); // Alkol hacmi, ml
  const [strength, setStrength] = useState(95); // Alkol oranı, %(v/v)
  const [temperature, setTemperature] = useState(20); // Alkol sıcaklığı, °C
  const [mass, setMass] = useState(1000); // Alkol kütlesi, g
  const [density, setDensity] = useState(0); // Alkol yoğunluğu, g/ml
  const [absoluteVolume, setAbsoluteVolume] = useState(0); // Mutlak alkol hacmi, ml
  const [sugarContent, setSugarContent] = useState(22); // Şeker içeriği, °Bx
  const [specificGravity, setSpecificGravity] = useState(1.092); // Özgül ağırlık, g/ml
  const [potentialYield, setPotentialYield] = useState(0); // Potansiyel alkol verimi

  useEffect(() => {
    calculate();
  }, [conversionType, volume, strength, mass, sugarContent, specificGravity]);

  const calculate = () => {
    let M, V, P, VAS, SG, R;

    if (conversionType === "volumeToMass") {
      // Alkol hacmini kütleye çevirme
      P = 0.8114; // Kullanıcıdan alınacak ya da hesaplanacak yoğunluk
      M = volume * P; // M = V * P
      VAS = (volume * strength) / 100; // VAS = V * S / 100
      setMass(M);
      setDensity(P);
      setAbsoluteVolume(VAS);

    } else if (conversionType === "massToVolume") {
      // Alkol kütlesini hacme çevirme
      P = 0.8114; // Kullanıcıdan alınacak ya da hesaplanacak yoğunluk
      V = mass / P; // V = M / P
      VAS = (V * strength) / 100; // VAS = V * S / 100
      setVolume(V);
      setDensity(P);
      setAbsoluteVolume(VAS);

    } else if (conversionType === "brixToSpecificGravity") {
      // Brix'i özgül ağırlığa çevirme
      SG = (sugarContent / (258.6 - ((sugarContent / 258.2) * 227.1))) + 1; // SG hesaplama
      R = (76.08 * (SG - 1.000)) / (1.775 - SG) * (1.000 / 0.794); // R hesaplama
      setSpecificGravity(SG);
      setPotentialYield(R);

    } else if (conversionType === "specificGravityToBrix") {
      // Özgül ağırlığı Brix'e çevirme
      SG = specificGravity;
      const B = (((182.4601 * SG - 775.6821) * SG + 1262.7794) * SG - 669.5622);
      R = (76.08 * (SG - 1.000)) / (1.775 - SG) * (1.000 / 0.794); // R hesaplama
      setSugarContent(B);
      setPotentialYield(R);
    }
  };

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
    resetInputs();
  };

  const resetInputs = () => {
    setVolume(1000);
    setStrength(95);
    setTemperature(20);
    setMass(1000);
    setSugarContent(22);
    setSpecificGravity(1.092);
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h1 className="calc-title">Alkol Birim Dönüştürücü</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <div className="w-full">
            <label htmlFor="conversionType" className="label">Dönüştürme Türü</label>
            <select id="conversionType" className="input" value={conversionType} onChange={handleConversionTypeChange}>
              <option value="volumeToMass">Alkol hacmini kütleye çevirme</option>
              <option value="massToVolume">Alkol kütlesini hacme çevirme</option>
              <option value="brixToSpecificGravity">Brix'i özgül ağırlığa çevirme</option>
              <option value="specificGravityToBrix">Özgül ağırlığı Brix'e çevirme</option>
            </select>
          </div>

          {conversionType === "volumeToMass" && (
            <>
              <Input
                title="Alkol hacmi"
                unit="ml"
                value={volume}
                setter={setVolume}
              />
              <Input
                title="Alkol oranı"
                unit="%"
                value={strength}
                setter={setStrength}
              />
              {/* <div className="w-full">
                <Toggle state={true} setState={} />
                <span>Alkol sıcaklığı, °C</span>
              </div> */}
            </>
          )}

          {conversionType === "massToVolume" && (
            <>
              <Input
                title="Alkol kütlesi"
                unit="g"
                value={mass}
                setter={setMass}
              />
              <Input
                title="Alkol oranı"
                unit="%"
                value={strength}
                setter={setStrength}
              />
            </>
          )}

          {conversionType === "brixToSpecificGravity" && (
            <>
              <Input
                title="Şeker içeriği"
                unit="°Bx"
                value={sugarContent}
                setter={setSugarContent}
              />
            </>
          )}

          {conversionType === "specificGravityToBrix" && (
            <>
              <Input
                title="Özgül ağırlık"
                unit="g/ml"
                value={specificGravity}
                setter={setSpecificGravity}
              />
            </>
          )}
        </div>

        <div className="calc-result">
          {conversionType === "volumeToMass" && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Alkol kütlesi:</span>
                <span><b>{mass.toFixed(2)}</b> g</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Alkol kütle oranı:</span>
                <span><b>{((mass / volume) * 100).toFixed(2)}</b> %</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Alkol yoğunluğu:</span>
                <span><b>{density.toFixed(4)}</b> g/ml</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Mutlak alkol hacmi:</span>
                <span><b>{absoluteVolume.toFixed(2)}</b> ml</span>
              </div>
            </div>
          )}

          {conversionType === "massToVolume" && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Alkol hacmi:</span>
                <span><b>{(mass / density).toFixed(2)}</b> ml</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Alkol kütle oranı:</span>
                <span><b>{((mass / (mass / density)) * 100).toFixed(2)}</b> %</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Alkol yoğunluğu:</span>
                <span><b>{density.toFixed(4)}</b> g/ml</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Mutlak alkol hacmi:</span>
                <span><b>{((mass / density) * (strength / 100)).toFixed(2)}</b> ml</span>
              </div>
            </div>
          )}

          {conversionType === "brixToSpecificGravity" && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Özgül ağırlık:</span>
                <span><b>{specificGravity.toFixed(4)}</b> g/ml</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Potansiyel alkol verimi:</span>
                <span><b>{potentialYield.toFixed(2)}</b></span>
              </div>
            </div>
          )}

          {conversionType === "specificGravityToBrix" && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Şeker içeriği:</span>
                <span><b>{sugarContent.toFixed(2)}</b> °Bx</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Potansiyel alkol verimi:</span>
                <span><b>{potentialYield.toFixed(2)}</b></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
