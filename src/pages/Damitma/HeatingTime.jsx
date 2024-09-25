import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function HeatingTime() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "kup_isitma_suresi"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, []);


  const [volume, setVolume] = useState(20);
  const [power, setPower] = useState(2000);
  const [initialTemp, setInitialTemp] = useState(25);
  const [finalTemp, setFinalTemp] = useState(85);
  const [efficiency, setEfficiency] = useState(100);
  const [useEfficiency, setUseEfficiency] = useState(false);
  const [heatingTime, setHeatingTime] = useState(0);

  const calculateHeatingTime = () => {
    const V = parseFloat(volume);
    const W = parseFloat(power);
    const T1 = parseFloat(initialTemp);
    const T2 = parseFloat(finalTemp);
    const E = useEfficiency ? parseFloat(efficiency) : 100;

    const T = -(100 * ((V * 0.264 * 8.33 * 453.59237) * (((5 / 9) * ((T1 * 1.8 + 32) - 32)) - ((5 / 9) * ((T2 * 1.8 + 32) - 32))) / ((W / 1000) * 1000 * 0.238845896628 * E))) / 60;
    
    setHeatingTime(Math.round(T));
  };

  useEffect(() => {
    calculateHeatingTime();
  }, [volume, power, initialTemp, finalTemp, efficiency, useEfficiency]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/heater.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Hacim"
            unit="L"
            value={volume}
            setter={setVolume}
          />
          <Input
            title="Güç"
            unit="W"
            value={power}
            setter={setPower}
          />
          <Input
            title="Başlangıç Sıcaklığı"
            unit="°C"
            value={initialTemp}
            setter={setInitialTemp}
          />
          <Input
            title="Bitiş Sıcaklığı"
            unit="°C"
            value={finalTemp}
            setter={setFinalTemp}
          />


        <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useEfficiency} setState={setUseEfficiency} />
              <span>Isıtıcı Verimliliği, <b>%</b></span>
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
          {heatingTime !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Isıtma Süresi:</span>
                <span><b>{heatingTime}</b> dakika</span>
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