import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function Malt() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "wort"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, []);


  const [wortVolume, setWortVolume] = useState(30);
  const [requiredWortDensity, setRequiredWortDensity] = useState(10);
  const [maltExtractivity, setMaltExtractivity] = useState(80);
  const [maltMass, setMaltMass] = useState(0);

  const calculateMaltMass = () => {
    const V = parseFloat(wortVolume);
    const P = parseFloat(requiredWortDensity);
    const E = parseFloat(maltExtractivity);

    const M = (V * (P / 100)) / (E / 100);

    setMaltMass(M.toFixed(3));
  };

  useEffect(() => {
    calculateMaltMass();
  }, [wortVolume, requiredWortDensity, maltExtractivity]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/malt.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Şıra Hacmi"
            unit="l"
            value={wortVolume}
            setter={setWortVolume}
          />
          <Input
            title="Gerekli Şıra Yoğunluğu"
            unit="%"
            value={requiredWortDensity}
            setter={setRequiredWortDensity}
          />
          <Input
            title="Malt Ekstraktivitesi"
            unit="%"
            value={maltExtractivity}
            setter={setMaltExtractivity}
          />
        </div>

        <div className="calc-result">
          {maltMass !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Malt Kütlesi :</span>
                <span><b>{maltMass}</b> kg</span>
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
  );
}
