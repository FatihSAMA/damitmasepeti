import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function HeadsSelection() {

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

  const [rawAlcoholVolume, setRawAlcoholVolume] = useState(30); // Spirtos-su hacmi
  const [rawAlcoholStrength, setRawAlcoholStrength] = useState(40); // Spirtos-su alkol oranı
  const [headsShare, setHeadsShare] = useState(10); // Baş kesimi oranı
  const [temperature, setTemperature] = useState(20); // Sıcaklık
  const [absoluteAlcoholVolume, setAbsoluteAlcoholVolume] = useState(0); // Mutlak alkol hacmi
  const [headsVolume, setHeadsVolume] = useState(0); // Baş kesimi hacmi

  const calculateHeadsSelection = () => {
    const VSS = parseFloat(rawAlcoholVolume);
    const SSS = parseFloat(rawAlcoholStrength);
    const DG = parseFloat(headsShare);

    // Mutlak alkol hacmi
    const VAS = (VSS * SSS) / 100;

    // Baş kesimi hacmi
    const VG = (VAS * DG) / 100;

    setAbsoluteAlcoholVolume(VAS);
    setHeadsVolume(VG);
  };

  useEffect(() => {
    calculateHeadsSelection();
  }, [rawAlcoholVolume, rawAlcoholStrength, headsShare, temperature]);

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
          <Input
            title="Ham alkol hacmi"
            unit="L"
            value={rawAlcoholVolume}
            setter={setRawAlcoholVolume}
          />
          <Input
            title="Ham alkolün alkol içeriği"
            unit="%"
            value={rawAlcoholStrength}
            setter={setRawAlcoholStrength}
          />
          <Input
            title="Hedeflerin payı"
            unit="%"
            value={headsShare}
            setter={setHeadsShare}
          />

        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Kafa Hacmi:</span>
              <span><b>{headsVolume.toFixed(3)}</b> L</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Mutlak Alkol Hacmi:</span>
              <span><b>{absoluteAlcoholVolume.toFixed(3)}</b> L</span>
            </div>
          </div>
        </div>
      </div>

      {data?.accordions?.length > 0 && (
        data.accordions.map((accordion, index) => (
          <Accordion title={accordion.title} content={accordion.content} key={index} />
        ))
      )}

    </div>
  );
}
