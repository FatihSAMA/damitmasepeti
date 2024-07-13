import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function Malt() {
  const [wortVolume, setWortVolume] = useState(30);
  const [requiredWortDensity, setRequiredWortDensity] = useState(10);
  const [maltExtractivity, setMaltExtractivity] = useState(80);
  const [maltMass, setMaltMass] = useState(0);

  const calculateMaltMass = () => {
    const V = parseFloat(wortVolume);
    const P = parseFloat(requiredWortDensity);
    const E = parseFloat(maltExtractivity);

    const M = (V * (P / 100)) / (E / 100);

    setMaltMass(M.toFixed(3));
  };

  useEffect(() => {
    calculateMaltMass();
  }, [wortVolume, requiredWortDensity, maltExtractivity]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/malt.png" alt="" />
        </div>
        <h1 className="calc-title">Şıra İçin Malt Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Şıra Hacmi"
            unit="l"
            value={wortVolume}
            setter={setWortVolume}
          />
          <Input
            title="Gerekli Şıra Yoğunluğu"
            unit="%"
            value={requiredWortDensity}
            setter={setRequiredWortDensity}
          />
          <Input
            title="Malt Ekstraktivitesi"
            unit="%"
            value={maltExtractivity}
            setter={setMaltExtractivity}
          />
        </div>

        <div className="calc-result">
          {maltMass !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Malt Kütlesi :</span>
                <span><b>{maltMass}</b> kg</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
