import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function AlcoholWater() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "alkol_karistirma"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])
  

  const [currentAlchol, setCurrentAlchol] = useState(40);
  const [wantedAlchol, setWantedAlchol] = useState(45);
  const [volume, setVolume] = useState(4500);

  const [currentVolume, setCurrentVolume] = useState();
  const [waterVolume, setWaterVolume] = useState();
  const [totalVolume, setTotalVolume] = useState();

  const [error, setError] = useState(false);

  const calculateMixing = () => {

    const alchol = parseFloat(currentAlchol);
    const wanted = parseFloat(wantedAlchol);
    const vol = parseFloat(volume);

    if(wanted < alchol){
      setError("İstenilen Alkol Oranı Mevcut Alkol Oranından Küçük Olmalı!");
      return;
    }
    else setError(false)

    const current = (vol * wanted) / alchol;
    setCurrentVolume(current.toFixed(2));

    const water = volume - current;
    setWaterVolume(water.toFixed(2));

    const total = current + water;
    setTotalVolume(total.toFixed(2));


  };

  useEffect(() => {
    calculateMixing();
  }, [currentAlchol, wantedAlchol, volume]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/alchol3.png" alt="Alkol Karıştırma" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Mevcut Alkol Oranı"
            unit="%"
            value={currentAlchol}
            setter={setCurrentAlchol}
          />
          <Input
            title="İstenilen Alkol Oranı"
            unit="%"
            value={wantedAlchol}
            setter={setWantedAlchol}
          />
          <Input
            title="İstenilen Hacim"
            unit="ml"
            value={volume}
            setter={setVolume}
          />

        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            {error ? (
              <span className="text-red-600">
                {error}
              </span>
            ) : (
              <>
                <div className="flex justify-between w-full pt-2">
                  <span>Mevcut Alkol Hacmi :</span>
                  <span><b>{currentVolume}</b> ml</span>
                </div>
                <div className="flex justify-between w-full pt-2">
                  <span>Seyreltme İçin Su Hacmi :</span>
                  <span><b>{waterVolume}</b> ml</span>
                </div>
                <div className="flex justify-between w-full pt-2">
                  <span>Toplam Hacim :</span>
                  <span><b>{totalVolume}</b> ml</span>
                </div>
              </>
            )}
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
