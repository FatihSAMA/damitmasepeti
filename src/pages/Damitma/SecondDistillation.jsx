import { useState } from "react";
import Input from "../../components/Input";
import { useEffect } from "react";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function SecondDistillation(){

  const [data, setData] = useState([])
    useEffect(() => {
      
      const fetchData = async () => {
        
        try{
          const query = `*[_type == "calculations" && id == "ikinci_damitma"]`
          const result = await sanityClient.fetch(query)
          setData(result[0])
        }
        catch(err){
          console.log("Veri çekilirken hata meydana geldi!", err)
        }

      }

      fetchData()

    }, [])

    const [alcholVolume, setAlcholVolume] = useState(20); // ham alkol hacmi
    const [alcholPercent, setAlcholPercent] = useState(50); // ham alkolün alkol içeriği
    const [outAlchol, setOutAlchol] = useState(90); // çıkış alkol içeriği
    const [garbage, setGarbage] = useState(8); // çöp payı
    const [head, setHead] = useState(7); // baş payı
    const [trail, setTrail] = useState(25); // kuyruk payı

    const [resultAlcholVolume, setResultAlcholVolume] = useState(0);
    const [garbageVolume, setGarbageVolume] = useState(0);
    const [headVolume, setHeadVolume] = useState(0);
    const [stomachVolume, setStomachVolume] = useState(0);
    const [trailVolume, setTrailVolume] = useState(0);
    const [remainingLiquid, setRemainingLiquid] = useState(0);

    useEffect(() => {

        const resultVolume = alcholVolume * (alcholPercent / 100) * 1000;
        setResultAlcholVolume(resultVolume);

        const resultGarbage = resultVolume * (garbage / 100);
        setGarbageVolume(resultGarbage);

        const resultHead = resultVolume * (head / 100);
        setHeadVolume(resultHead);

        const resultStomach = ((resultVolume * ((100 - garbage - head - trail) / 100) / (outAlchol / 100)));
        setStomachVolume(resultStomach);

        const resultTrail = resultVolume * (trail / 100);
        setTrailVolume(resultTrail);

        const resultRemaing = (alcholVolume * 1000) - (resultGarbage + resultHead + resultStomach + resultTrail);
        setRemainingLiquid(resultRemaing);

    }, [alcholVolume, alcholPercent, outAlchol, garbage, head, trail]);


    return(
      <div className="calc-container">
        <div className="calc-header">
          <div className="calc-icon">
            <img src="/icons/second.png" alt="" />
          </div>
          <h1 className="calc-title">
            {data?.title}
          </h1>
        </div>
  
        <div className="calc-bottom">
          <div className="calc-inputs">

            <Input
              title="Suma Alkol Hacmi"
              unit="L"
              value={alcholVolume}
              setter={setAlcholVolume}
            />
            <Input
              title="Suma Alkol İçeriği"
              unit="%"
              value={alcholPercent}
              setter={setAlcholPercent}
            />
            <Input
              title="Gelen Alkol İçeriği"
              unit="%"
              value={outAlchol}
              setter={setOutAlchol}
            />
            <Input
              title="Çöp Payı"
              unit="%"
              value={garbage}
              setter={setGarbage}
            />
            <Input
              title="Baş Payı"
              unit="%"
              value={head}
              setter={setHead}
            />
            <Input
              title="Kuyruk Payı"
              unit="%"
              value={trail}
              setter={setTrail}
            />
  
          </div>
  
          <div className="calc-result">
            <div className="divide-y space-y-2">

              <div className="flex justify-between w-full pt-2">
                <span>Mutlak Alkol Hacmi:</span>
                <span><b>{resultAlcholVolume.toFixed(0)}</b> ml</span>
              </div>

              <div className="flex justify-between w-full pt-2">
                <span>Çöp :</span>
                <span><b>{garbageVolume.toFixed(0)}</b> ml</span>
              </div>

              <div className="flex justify-between w-full pt-2">
                <span>Baş :</span>
                <span><b>{headVolume.toFixed(0)}</b> ml</span>
              </div>

              <div className="flex justify-between w-full pt-2">
                <span>Göbek :</span>
                <span><b>{stomachVolume.toFixed(0)}</b> ml</span>
              </div>

              <div className="flex justify-between w-full pt-2">
                <span>Kuyruk :</span>
                <span><b>{trailVolume.toFixed(0)}</b> ml</span>
              </div>

              <div className="flex justify-between w-full pt-2">
                <span>Kazanda Kalan :</span>
                <span><b>{remainingLiquid.toFixed(0)}</b> ml</span>
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
    )
}
