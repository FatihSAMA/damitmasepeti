import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function LiquidTimer() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "sivi_cekilme"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  const [collectedVolume, setCollectedVolume] = useState(10); // Toplanan hacim
  const [totalVolume, setTotalVolume] = useState(1000); // Tüm hacim
  const [isRunning, setIsRunning] = useState(false); // Kronometre durumu
  const [elapsedTime, setElapsedTime] = useState(0); // Geçen süre
  const [flowRateLh, setFlowRateLh] = useState(0); // L/s cinsinden akış hızı
  const [flowRateMlMin, setFlowRateMlMin] = useState(0); // mL/dk cinsinden akış hızı
  const [flowRateAlcohol, setFlowRateAlcohol] = useState(0); // Alkollü sıvı akış hızı
  const [flowRateWater, setFlowRateWater] = useState(0); // Su akış hızı
  const [totalTime, setTotalTime] = useState(0); // Tüm hacim için geçen süre

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const seconds = elapsedTime;
    const N = parseFloat(collectedVolume);
    const S = seconds;

    // Hesaplamalar
    const V1 = (3600 * N / S) / totalVolume; // L/s cinsinden
    const V2 = (N / S) / 0.025; // Alkollü sıvı için
    const V3 = (N / S) * 60; // mL/dk cinsinden
    const V4 = (N / S) / 0.05; // Su için
    const M = totalVolume / V3; // Tüm hacim için geçen süre

    setFlowRateLh(V1);
    setFlowRateMlMin(V3);
    setFlowRateAlcohol(V2);
    setFlowRateWater(V4);
    setTotalTime(M);
  }, [elapsedTime, collectedVolume, totalVolume]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
    if (!isRunning) {
      setElapsedTime(0); // Süre sıfırlanıyor
    }
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/timer.png" alt="Kronometre" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Toplanan Hacim"
            unit="mL"
            value={collectedVolume}
            setter={setCollectedVolume}
          />
          <Input
            title="Tüm Hacim"
            unit="mL"
            value={totalVolume}
            setter={setTotalVolume}
          />

        <button onClick={handleStartStop} className={`${isRunning ? "bg-red-700 hover:bg-red-800" : "bg-blue-600 hover:bg-blue-700"} text-white w-[200px] h-[200px] rounded-full transition-all text-xl font-medium`}>
            {isRunning ? "Durdur" : "Başlat"}
          </button>
        </div>


        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="text-xl font-bold flex w-full items-center justify-center gap-4">
                <span className="px-4 py-1 border ">
                    {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}
                </span>
                :
                <span className="px-4 py-1 border ">
                    {(elapsedTime % 60).toString().padStart(2, '0')}
                </span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Akış Hızı (L/s):</span>
              <span><b>{flowRateLh.toFixed(3)}</b></span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Akış Hızı (mL/dk):</span>
              <span><b>{flowRateMlMin.toFixed(2)}</b></span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Alkollü Sıvı Akış Hızı:</span>
              <span><b>{flowRateAlcohol.toFixed(1)}</b> damla/s</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Su Akış Hızı:</span>
              <span><b>{flowRateWater.toFixed(1)}</b> damla/s</span>
            </div>

            <div className="flex justify-between w-full pt-2">
              <span>Tüm Hacim İçin Geçen Süre:</span>
              <span><b>{Math.round(totalTime / 60).toString().padStart(2, '0')}:{Math.round(totalTime % 60).toString().padStart(2, '0')}</b> saat</span>
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
