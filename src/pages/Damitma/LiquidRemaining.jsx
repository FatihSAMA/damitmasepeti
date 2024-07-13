import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function LiquidRemaining() {
  const [cubeDiameter, setCubeDiameter] = useState(36);
  const [heightToCoverTEN, setHeightToCoverTEN] = useState(8);
  const [liquidAlcoholContent, setLiquidAlcoholContent] = useState(10);
  const [remainingVolume, setRemainingVolume] = useState(0);
  const [minimumVolume, setMinimumVolume] = useState(0);

  const calculateVolumes = () => {
    const D = parseFloat(cubeDiameter);
    const H = parseFloat(heightToCoverTEN);
    const S = parseFloat(liquidAlcoholContent);

    const M = ((3.14 * D * D) / 4 * H) / 1000;
    const V = M / ((100 - S) / 100);

    setRemainingVolume(M.toFixed(3));
    setMinimumVolume(V.toFixed(3));
  };

  useEffect(() => {
    calculateVolumes();
  }, [cubeDiameter, heightToCoverTEN, liquidAlcoholContent]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/liquid.png" alt="" />
        </div>
        <h1 className="calc-title">Isıtma Elemanı Tarafından Buharlaştırıldıktan Sonra Küpte Kalan Sıvı Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Küp Çapı"
            unit="cm"
            value={cubeDiameter}
            setter={setCubeDiameter}
          />
          <Input
            title="Isıtma elemanının seviyesine kadar olan yükseklik"
            unit="cm"
            value={heightToCoverTEN}
            setter={setHeightToCoverTEN}
          />
          <Input
            title="Sıvının Alkol Oranı"
            unit="%"
            value={liquidAlcoholContent}
            setter={setLiquidAlcoholContent}
          />
        </div>

        <div className="calc-result">
          {remainingVolume !== 0 && minimumVolume !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Damıtma Sonunda Kalan Sıvı Hacmi:</span>
                <span><b>{remainingVolume}</b> l</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Küpe Eklenebilecek Minimum Sıvı Hacmi:</span>
                <span><b>{minimumVolume}</b> l</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
