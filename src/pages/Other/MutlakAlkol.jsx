import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function MutlakAlkol() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "mutlak_alkol_kaybi"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])


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

  const [fermentationPercent, setFermentationPercent] = useState();
  const [firstPercent, setFirstPercent] = useState();
  const [secondPercent, setSecondPercent] = useState();

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
    setFermentationPercent((ASB * 100) / ASS);
  
    // ASR = VSS * SSS / 100
    const ASR = (rawAlcoholVolume * rawAlcoholContent) / 100;
    setAfterFirstDistillationYield(ASR.toFixed(3));
    setFirstPercent((ASR * 100) / ASS);
  
    // ASD = VSR * SSR / 100
    const ASD = (secondDistillationVolume * secondDistillationAlcoholContent) / 100;
    setAfterSecondDistillationYield(ASD.toFixed(3));
    setSecondPercent((ASD * 100) / ASS);

  };
  

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alchol6.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <div className="w-full">
            <label htmlFor="type" className="label">Hesaplama Yöntemi</label>
            <select id="type" className="input py-1.5 px-2" value={calculationMethod} onChange={handleCalculationMethodChange}>
              <option value="volume">İkinci damıtmadan sonra alkol hacmine göre hesaplayın</option>
            </select>
          </div>

          <Input title="Şeker Kütlesi" unit="kg" value={sugarMass} setter={setSugarMass} />
          <Input title="Mayşenin Alkol İçeriği" unit="%" value={mashAlcoholContent} setter={setMashAlcoholContent} />
          <Input title="Mayşenin Hacmi" unit="L" value={mashVolume} setter={setMashVolume} />
          <Input title="1. Damıtma Alkol İçeriği" unit="%" value={rawAlcoholContent} setter={setRawAlcoholContent} />
          <Input title="1. Damıtma Alkol Hacmi" unit="L" value={rawAlcoholVolume} setter={setRawAlcoholVolume} />
          <Input title="2. Damıtma Alkol İçeriği" unit="%" value={secondDistillationAlcoholContent} setter={setSecondDistillationAlcoholContent} />

          {calculationMethod === "volume" && (
            <Input title="2. Damıtma Alkol Hacmi" unit="L" value={secondDistillationVolume} setter={setSecondDistillationVolume} />
          )}


        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Şekerde Olması Gereken Mutlak Alkol:</span>
              <div className="flex flex-col">
                <span><b>{theoreticalYield}</b> L</span>
                <span className="text-green-600 font-bold">%100</span>
              </div>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Fermantasyonda Mutlak Alkol:</span>
              <div className="flex flex-col">
                <span><b>{afterFermentationYield}</b> L</span>
                <span className="text-green-600 font-bold">%{fermentationPercent?.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>1. Damıtmada Mutlak Alkol:</span>
              <div className="flex flex-col">
                <span><b>{afterFirstDistillationYield}</b> L</span>
                <span className="text-green-600 font-bold">%{firstPercent?.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>2. Damıtmada Mutlak Alkol:</span>
              <div className="flex flex-col">
                <span><b>{afterSecondDistillationYield}</b> L</span>
                <span className="text-green-600 font-bold">%{secondPercent?.toFixed(2)}</span>
              </div>
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
