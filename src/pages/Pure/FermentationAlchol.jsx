import { useState, useEffect } from "react";
import Input from "../../components/Input";

const sugarTable = [
  { alcohol: 0, sugar: 0.5 },
  { alcohol: 0.25, sugar: 1 },
  { alcohol: 0.5, sugar: 1.5 },
  { alcohol: 0.75, sugar: 2 },
  { alcohol: 1, sugar: 2.5 },
  { alcohol: 1.25, sugar: 3 },
  { alcohol: 1.5, sugar: 3.5 },
  { alcohol: 1.75, sugar: 4 },
  { alcohol: 2, sugar: 4.5 },
  { alcohol: 2.25, sugar: 5 },
  { alcohol: 2.5, sugar: 5.5 },
  { alcohol: 2.75, sugar: 6 },
  { alcohol: 3, sugar: 6.5 },
  { alcohol: 3.25, sugar: 7 },
  { alcohol: 3.5, sugar: 7.5 },
  { alcohol: 3.75, sugar: 8 },
  { alcohol: 4, sugar: 8.5 },
  { alcohol: 4.25, sugar: 9 },
  { alcohol: 4.5, sugar: 9.5 },
  { alcohol: 4.75, sugar: 9.88 },
  { alcohol: 5, sugar: 10.25 },
  { alcohol: 5.25, sugar: 10.75 },
  { alcohol: 5.5, sugar: 11.25 },
  { alcohol: 5.75, sugar: 11.75 },
  { alcohol: 6, sugar: 12.25 },
  { alcohol: 6.25, sugar: 12.75 },
  { alcohol: 6.5, sugar: 13.25 },
  { alcohol: 6.75, sugar: 13.38 },
  { alcohol: 7, sugar: 14 },
  { alcohol: 7.25, sugar: 14.5 },
  { alcohol: 7.5, sugar: 15 },
  { alcohol: 7.75, sugar: 15.38 },
  { alcohol: 8, sugar: 15.75 },
  { alcohol: 8.25, sugar: 16.25 },
  { alcohol: 8.5, sugar: 16.75 },
  { alcohol: 8.75, sugar: 17.25 },
  { alcohol: 9, sugar: 17.75 },
  { alcohol: 9.25, sugar: 18.5 },
  { alcohol: 9.5, sugar: 18.75 },
  { alcohol: 9.75, sugar: 19.13 },
  { alcohol: 10, sugar: 19.5 },
  { alcohol: 10.25, sugar: 20 },
  { alcohol: 10.5, sugar: 20.5 },
  { alcohol: 10.75, sugar: 21 },
  { alcohol: 11, sugar: 21.5 },
  { alcohol: 11.25, sugar: 22 },
  { alcohol: 11.5, sugar: 22.5 },
  { alcohol: 11.75, sugar: 23.13 },
  { alcohol: 12, sugar: 23.25 },
  { alcohol: 12.25, sugar: 24 },
  { alcohol: 12.5, sugar: 24.25 },
  { alcohol: 12.75, sugar: 24.5 },
  { alcohol: 13, sugar: 25 },
];

export default function FermentationAlchol() {
  const [initialSugar, setInitialSugar] = useState(25);
  const [finalSugar, setFinalSugar] = useState(3);
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculate();
  }, [initialSugar, finalSugar]);

  const calculate = () => {
    const X = initialSugar - finalSugar;

    const closestMatch = sugarTable.reduce((prev, curr) => 
      Math.abs(curr.sugar - X) < Math.abs(prev.sugar - X) ? curr : prev
    );

    setResult(closestMatch.alcohol);
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/fermentation.png" alt="" />
        </div>
        <h1 className="calc-title">AS-3 Şeker Ölçeri Alkol Hesaplayıcı</h1>
      </div>
      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Fermantasyon Öncesi Şeker İçeriği"
            unit="%"
            value={initialSugar}
            setter={setInitialSugar}
          />
          <Input
            title="Fermantasyon Sonrası Şeker İçeriği"
            unit="%"
            value={finalSugar}
            setter={setFinalSugar}
          />
        </div>
        <div className="calc-result">
          {result !== null && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Pürenin Alkol İçeriği:</span>
                <span><b>{result}</b> %</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
