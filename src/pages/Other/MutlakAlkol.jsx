import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function MutlakAlkol() {
  const [calculationMethod, setCalculationMethod] = useState("volume"); // "volume" or "mass"
  const [sugarMass, setSugarMass] = useState(18);
  const [mashAlcoholContent, setMashAlcoholContent] = useState(22); // Pürenin alkol içeriği (% hacim)
  const [mashVolume, setMashVolume] = useState(50); // Püre hacmi (l)
  const [rawAlcoholContent, setRawAlcoholContent] = useState(40); // Ham alkolün alkol içeriği (% hacim)
  const [rawAlcoholVolume, setRawAlcoholVolume] = useState(26); // Ham alkol hacmi (l)
  const [secondDistillationAlcoholContent, setSecondDistillationAlcoholContent] = useState(96); // İkinci damıtmadan sonra alkol içeriği (% hacim)
  const [secondDistillationVolume, setSecondDistillationVolume] = useState(10); // İkinci damıtmadan sonra alkol hacmi (l) - Hacme göre
  const [secondDistillationMass, setSecondDistillationMass] = useState(8); // İkinci damıtmadan sonra alkol kütlesi (kg) - Kütleye göre

  const [theoreticalYield, setTheoreticalYield] = useState(0);
  const [afterFermentationYield, setAfterFermentationYield] = useState(0);
  const [afterFirstDistillationYield, setAfterFirstDistillationYield] = useState(0);
  const [afterSecondDistillationYield, setAfterSecondDistillationYield] = useState(0);

  useEffect(() => {
    calculate();
  }, [
    calculationMethod,
    sugarMass,
    mashAlcoholContent,
    mashVolume,
    rawAlcoholContent,
    rawAlcoholVolume,
    secondDistillationAlcoholContent,
    secondDistillationVolume,
    secondDistillationMass
  ]);

  const handleCalculationMethodChange = (e) => {
    setCalculationMethod(e.target.value);
  };

  const calculate = () => {
    const alcoholDensity = 0.8114; // Alkol yoğunluğu (kg/l)
  
    // ASS = MS * 0.682
    const ASS = sugarMass * 0.682;
    setTheoreticalYield(ASS.toFixed(3));
  
    // ASB = VB * SB / 100
    const ASB = (mashVolume * mashAlcoholContent) / 100;
    setAfterFermentationYield(ASB.toFixed(3));
  
    // ASR = VSS * SSS / 100
    const ASR = (rawAlcoholVolume * rawAlcoholContent) / 100;
    setAfterFirstDistillationYield(ASR.toFixed(3));
  
    // ASD = VSR * SSR / 100
    let ASD;
    if (calculationMethod === "volume") {
      ASD = (secondDistillationVolume * secondDistillationAlcoholContent) / 100;
    } else {
      // Kütle bazlı hesaplama (kütleyi hacme çeviriyoruz)
      const secondDistillationVolumeFromMass = secondDistillationMass / alcoholDensity;
      ASD = (secondDistillationVolumeFromMass * secondDistillationAlcoholContent) / 100;
    }
    setAfterSecondDistillationYield(ASD.toFixed(3));
  };
  

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h1 className="calc-title">Mutlak Alkol Kaybı Hesaplayıcısı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <div className="w-full">
            <label htmlFor="type" className="label">Hesaplama Yöntemi</label>
            <select id="type" className="input py-1.5 px-2" value={calculationMethod} onChange={handleCalculationMethodChange}>
              <option value="volume">İkinci damıtmadan sonra alkol hacmine göre hesaplayın</option>
              <option value="mass">İkinci damıtmadan sonra alkol kütlesine göre hesaplayın</option>
            </select>
          </div>

          <Input title="Şeker Kütlesi" unit="kg" value={sugarMass} setter={setSugarMass} />
          <Input title="Pürenin Alkol İçeriği" unit="%" value={mashAlcoholContent} setter={setMashAlcoholContent} />
          <Input title="Püre Hacmi" unit="l" value={mashVolume} setter={setMashVolume} />
          <Input title="Ham Alkolün Alkol İçeriği" unit="%" value={rawAlcoholContent} setter={setRawAlcoholContent} />
          <Input title="Ham Alkol Hacmi" unit="l" value={rawAlcoholVolume} setter={setRawAlcoholVolume} />
          <Input title="İkinci Damıtmadan Sonra Alkol İçeriği" unit="%" value={secondDistillationAlcoholContent} setter={setSecondDistillationAlcoholContent} />

          {calculationMethod === "volume" && (
            <Input title="İkinci Damıtmadan Sonra Alkol Hacmi" unit="l" value={secondDistillationVolume} setter={setSecondDistillationVolume} />
          )}

          {calculationMethod === "mass" && (
            <Input title="İkinci Damıtmadan Sonra Alkol Kütlesi" unit="kg" value={secondDistillationMass} setter={setSecondDistillationMass} />
          )}
        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Şekerden Teorik AS Çıkışı:</span>
              <span><b>{theoreticalYield}</b> L</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Fermantasyondan Sonra AS Çıkışı:</span>
              <span><b>{afterFermentationYield}</b> L</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İlk Damıtmadan Sonra AS Çıkışı:</span>
              <span><b>{afterFirstDistillationYield}</b> L</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İkinci Damıtmadan Sonra AS Çıkışı:</span>
              <span><b>{afterSecondDistillationYield}</b> L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
