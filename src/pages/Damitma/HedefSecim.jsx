import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function HedefSecim() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "hedef"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  const [alcoholVolume, setAlcoholVolume] = useState(16); // Suma Alkol Hacmi (ml)
  const [alcoholPercentage, setAlcoholPercentage] = useState(52.8); // Suma Alkol İçeriği (%)
  const [targetPercentage, setTargetPercentage] = useState(60); // Hedeflenen Oran (%)
  const [comingAlchol, setComingAlchol] = useState(78); // Gelen Alkol Oranı (%)

  const [amount, setAmount] = useState(0); // Ayrılacak Miktar (ml)
  const [absoluteAlchol, setAbsoluteAlchol] = useState(0); // Mutlak Alkol Oranı (ml)


  useEffect(() => {
    calculate();
  }, [alcoholVolume, alcoholPercentage, targetPercentage, comingAlchol]);

  const calculate = () => {
    
    const result1 = ((alcoholVolume * alcoholPercentage / 100) / (comingAlchol / 100)) * (targetPercentage / 100) * 1000;
    setAmount(result1.toFixed(2));

    const result2 = ((alcoholVolume * alcoholPercentage) / 100) * 1000;
    setAbsoluteAlchol(result2.toFixed(2));

  };

  return (
    <div className="calc-container">
      <div className="calc-header">
      <div className="calc-icon">
          <img src="/icons/lab.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input title="Suma Alkol Hacmi" unit="L" value={alcoholVolume} setter={setAlcoholVolume} />
          <Input title="Suma Alkol İçeriği" unit="%" value={alcoholPercentage} setter={setAlcoholPercentage} />
          <Input title="Hedeflenen Pay" unit="%" value={targetPercentage} setter={setTargetPercentage} />
          <Input title="Gelen Alkol Oranı" unit="%" value={comingAlchol} setter={setComingAlchol} />
        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Ayrılacak Miktar:</span>
              <span><b>{amount}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Mutlak Alkol Oranı:</span>
              <span><b>{absoluteAlchol}</b> ml</span>
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
