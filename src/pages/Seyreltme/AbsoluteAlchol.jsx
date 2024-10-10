import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";

export default function AbsoluteAlchol() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "nihai_alkol"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])


  const [volume1, setVolume1] = useState(7225); // İlk sıvının alkol hacmi
  const [liq1, setLiq1] = useState(96.6); // İlk sıvının alkol içeriği
  const [volume2, setVolume2] = useState(1200); // 2. sıvının hacmi
  const [liq2, setLiq2] = useState(42.5); // 2. sıvının alkol içeriği

  const [mixAlchol, setMixAlchol] = useState();
  const [mixVolume, setMixVolume] = useState();
  const [absolute, setAbsolute] = useState();

  const calculate = () => {

    const vol1 = parseFloat(volume1);
    const li1 = parseFloat(liq1);
    const vol2 = parseFloat(volume2);
    const li2 = parseFloat(liq2);

    const absResult = (vol1 * li1 / 100) + (vol2 * li2 / 100);
    setAbsolute(absResult.toFixed(2));

    const alcholResult = (absResult / (vol1 + vol2)) * 100;
    setMixAlchol(alcholResult.toFixed(2));

    const mixResult = (absResult / alcholResult / 100) * 10000;
    setMixVolume(mixResult.toFixed(2));


  };

  useEffect(() => {
    calculate();
  }, [volume1, liq1, volume2, liq2]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alchol4.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="1. Sıvının Hacmi"
            unit="ml"
            value={volume1}
            setter={setVolume1}
          />
          <Input
            title="1. Sıvının Alkol İçeriği"
            unit="%"
            value={liq1}
            setter={setLiq1}
          />
          <Input
            title="2. Sıvının Hacmi"
            unit="ml"
            value={volume2}
            setter={setVolume2}
          />
          <Input
            title="2. Sıvının Alkol İçeriği"
            unit="%"
            value={liq2}
            setter={setLiq2}
          />

        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Karışımın Alkol İçeriği : </span>
              <span><b>{mixAlchol}</b> %</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Karışımın Hacmi : </span>
              <span><b>{mixVolume}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Karışımın Mutlak Alkol Hacmi : </span>
              <span><b>{absolute}</b> ml</span>
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
