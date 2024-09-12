import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function Anason() {
  const [alcoholVolume, setAlcoholVolume] = useState(1000); // Alkol Miktarı (ml)
  const [alcoholPercentage, setAlcoholPercentage] = useState(96); // Alkol Yüzdesi (%)
  const [targetPercentage, setTargetPercentage] = useState(45); // Hedeflenen Yüzde (%)

  const [addedWaterVolume, setAddedWaterVolume] = useState(0); // İlave edilecek su miktarı (ml)
  const [totalVolume, setTotalVolume] = useState(0); // Toplam Hacim (ml)
  const [addedAniseVolume, setAddedAniseVolume] = useState(0); // İlave Edilecek Anason (ml)

  useEffect(() => {
    calculate();
  }, [alcoholVolume, alcoholPercentage, targetPercentage]);

  const calculate = () => {
    // Su miktarı: (Alkol Miktarı * (Alkol Yüzdesi / Hedeflenen Yüzde)) - Alkol Miktarı
    const waterToAdd = (alcoholVolume * (alcoholPercentage / targetPercentage)) - alcoholVolume;
    setAddedWaterVolume(waterToAdd.toFixed(2));

    // Toplam hacim: Alkol Miktarı + İlave edilecek su miktarı
    const total = alcoholVolume + waterToAdd;
    setTotalVolume(total.toFixed(2));

    // İlave edilecek anason: Alkol Miktarı * 0.0025
    const aniseToAdd = alcoholVolume * 0.0025;
    setAddedAniseVolume(aniseToAdd.toFixed(2));
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h1 className="calc-title">Anason Hesabı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input title="Alkol Miktarı" unit="ml" value={alcoholVolume} setter={setAlcoholVolume} />
          <Input title="Alkol Yüzdesi" unit="%" value={alcoholPercentage} setter={setAlcoholPercentage} />
          <Input title="Hedeflenen Yüzde" unit="%" value={targetPercentage} setter={setTargetPercentage} />
        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>İlave edilecek su miktarı:</span>
              <span><b>{addedWaterVolume}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Toplam Hacim:</span>
              <span><b>{totalVolume}</b> ml</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>İlave edilecek anason:</span>
              <span><b>{addedAniseVolume}</b> ml</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
