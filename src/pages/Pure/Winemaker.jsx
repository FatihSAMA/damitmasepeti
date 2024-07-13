import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function Winemaker() {
  const [juiceVolume, setJuiceVolume] = useState(1);
  const [juiceSugarContent, setJuiceSugarContent] = useState(80);
  const [juiceAcidity, setJuiceAcidity] = useState(10);
  const [requiredAcidity, setRequiredAcidity] = useState(6);
  const [requiredAlcoholContent, setRequiredAlcoholContent] = useState(12);
  const [sugarMass, setSugarMass] = useState(0);
  const [waterVolume, setWaterVolume] = useState(0);
  const [totalMustVolume, setTotalMustVolume] = useState(0);

  const calculateValues = () => {
    const V = parseFloat(juiceVolume);
    const SAH = parseFloat(juiceSugarContent);
    const K1 = parseFloat(juiceAcidity);
    const K2 = parseFloat(requiredAcidity);
    const S = parseFloat(requiredAlcoholContent);

    const VS = (V * K1) / K2;
    const MS = (VS * S) / 0.682 * 10 - SAH * V;
    const VW = VS - V - (MS * 0.63) / 1000;

    setTotalMustVolume(VS.toFixed(3));
    setSugarMass(MS.toFixed(2));
    setWaterVolume(VW.toFixed(3));
  };

  useEffect(() => {
    calculateValues();
  }, [juiceVolume, juiceSugarContent, juiceAcidity, requiredAcidity, requiredAlcoholContent]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/wine.png" alt="" />
        </div>
        <h1 className="calc-title">Şarap Yapımı Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Meyve Suyu Hacmi"
            unit="l"
            value={juiceVolume}
            setter={setJuiceVolume}
          />
          <Input
            title="Meyve Suyu Şeker İçeriği"
            unit="g/l"
            value={juiceSugarContent}
            setter={setJuiceSugarContent}
          />
          <Input
            title="Meyve Suyu Asitliği"
            unit="g/l"
            value={juiceAcidity}
            setter={setJuiceAcidity}
          />
          <Input
            title="Gerekli Asitlik"
            unit="g/l"
            value={requiredAcidity}
            setter={setRequiredAcidity}
          />
          <Input
            title="Gerekli Alkol İçeriği"
            unit="% (vol.)"
            value={requiredAlcoholContent}
            setter={setRequiredAlcoholContent}
          />
        </div>

        <div className="calc-result">
          {totalMustVolume !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Eklenmesi Gereken Şeker Kütlesi :</span>
                <span><b>{sugarMass}</b> gr</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Eklenmesi Gereken Su Hacmi :</span>
                <span><b>{waterVolume}</b> l</span>
              </div>
              <div className="flex justify-between w-full pt-2">
                <span>Toplam Şıra Hacmi :</span>
                <span><b>{totalMustVolume}</b> l</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
