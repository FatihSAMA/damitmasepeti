import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";

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


  const [strength1, setStrength1] = useState(95); // İlk sıvının alkol hacmi
  const [strength2, setStrength2] = useState(40); // İkinci sıvının alkol hacmi
  const [wanted, setWanted] = useState(70); // istenilen alkol hacmi
  const [wantedMix, setWantedMix] = useState(2000); // istenilen karışımın hacmi

  const [volume1, setVolume1] = useState();
  const [volume2, setVolume2] = useState();
  const [absolute, setAbsolute] = useState();

  const calculateMixing = () => {
    const first = parseFloat(strength1);
    const second = parseFloat(strength2);
    const alchol = parseFloat(wanted);
    const mix = parseFloat(wantedMix);

    const result1 = ((mix * (alchol / 100)) - (mix * (second / 100))) / (first - second) * 100;
    setVolume1(result1.toFixed(2));

    const result2 = (mix - result1);
    setVolume2(result2.toFixed(2));

    const result3 = (result1 * first / 100) + (result2 * second / 100);
    setAbsolute(result3.toFixed(2)); 

  };

  useEffect(() => {
    calculateMixing();
  }, [strength1, strength2, wanted, wantedMix]);

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
            title="İlk Sıvının Alkol Hacmi"
            unit="%"
            value={strength1}
            setter={setStrength1}
          />
          <Input
            title="İkinci Sıvının Alkol Hacmi"
            unit="%"
            value={strength2}
            setter={setStrength2}
          />
          <Input
            title="İstenilen Alkol Hacmi"
            unit="%"
            value={wanted}
            setter={setWanted}
          />
          <Input
            title="İstenilen Karışımın Hacmi"
            unit="ml"
            value={wantedMix}
            setter={setWantedMix}
          />

        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>İlk Sıvının Hacmi:</span>
              <span><b>{volume1}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İkinci Sıvının Hacmi:</span>
              <span><b>{volume2}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Mutlak Alkol Hacmi:</span>
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
