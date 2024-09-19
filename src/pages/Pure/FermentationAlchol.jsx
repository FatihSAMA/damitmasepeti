import { useState, useEffect } from "react";
import Input from "../../components/Input";

const sugarTable = {
  0: -0.25,
  0.5: 0,
  1: 0.25,
  1.5: 0.5,
  2: 0.75,
  2.5 : 1,
  3: 1.25,
  3.5: 1.5,
  4: 1.75,
  4.5: 2,
  5: 2.25,
  5.5: 2.5,
  6: 2.75,
  6.5: 3,
  7: 3.25,
  7.5: 3.5,
  8: 3.75,
  8.5: 4,
  9: 4.25,
  9.5: 4.5,
  9.88: 4.75,
  10.25: 5,
  10.75: 5.25,
  11.25: 5.5,
  11.75: 5.75,
  12.25: 6,
  12.75: 6.25,
  13.25: 6.5,
  13.38: 6.75,
  14: 7,
  14.5: 7.25,
  15: 7.5,
  15.38: 7.75,
  15.75: 8,
  16.25: 8.25,
  16.75: 8.5,
  17.25: 8.75,
  17.75: 9,
  18.5: 9.25,
  18.75: 9.5,
  19.13: 9.75,
  19.5: 10,
  20: 10.25,
  20.5: 10.5,
  21: 10.75,
  21.5: 11,
  22: 11.25,
  22.5: 11.5,
  23.13: 11.75,
  23.25: 12,
  24: 12.25,
  24.25: 12.5,
  24.5: 12.75,
  25: 13
};

const interpolate = (x, table) => {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  
  if (keys.includes(x)) {
    return table[x];
  }

  const lowerKey = keys.reduce((prev, curr) => (curr <= x ? curr : prev), keys[0]);
  const upperKey = keys.find((key) => key > x);

  if (upperKey === undefined) {
    return table[lowerKey];
  }

  const lowerValue = table[lowerKey];
  const upperValue = table[upperKey];
  const slope = (upperValue - lowerValue) / (upperKey - lowerKey);

  return lowerValue + slope * (x - lowerKey);
};

export default function FermentationAlchol() {
  const [initialSugar, setInitialSugar] = useState(25);
  const [finalSugar, setFinalSugar] = useState(3);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const initialAlchol = interpolate(initialSugar, sugarTable);
    const finalAlchol = interpolate(finalSugar, sugarTable);

    setResult(initialAlchol - finalAlchol);
  }, [initialSugar, finalSugar]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/fermentation.png" alt="" />
        </div>
        <h1 className="calc-title">AC-3 Şeker Ölçeri Alkol Hesaplayıcı</h1>
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
                <span><b>{result.toFixed(2)}</b> %</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
