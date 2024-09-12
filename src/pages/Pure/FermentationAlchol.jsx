import { useState, useEffect } from "react";
import Input from "../../components/Input";

// Updated sugar-to-alcohol table
const sugarTable = [
  { sugar: 0, alcohol: -0.25 },
  { sugar: 0.5, alcohol: 0 },
  { sugar: 1, alcohol: 0.25 },
  { sugar: 1.5, alcohol: 0.5 },
  { sugar: 2, alcohol: 0.75 },
  { sugar: 2.5, alcohol: 1 },
  { sugar: 3, alcohol: 1.25 },
  { sugar: 3.5, alcohol: 1.5 },
  { sugar: 4, alcohol: 1.75 },
  { sugar: 4.5, alcohol: 2 },
  { sugar: 5, alcohol: 2.25 },
  { sugar: 5.5, alcohol: 2.5 },
  { sugar: 6, alcohol: 2.75 },
  { sugar: 6.5, alcohol: 3 },
  { sugar: 7, alcohol: 3.25 },
  { sugar: 7.5, alcohol: 3.5 },
  { sugar: 8, alcohol: 3.75 },
  { sugar: 8.5, alcohol: 4 },
  { sugar: 9, alcohol: 4.25 },
  { sugar: 9.5, alcohol: 4.5 },
  { sugar: 9.88, alcohol: 4.75 },
  { sugar: 10.25, alcohol: 5 },
  { sugar: 10.75, alcohol: 5.25 },
  { sugar: 11.25, alcohol: 5.5 },
  { sugar: 11.75, alcohol: 5.75 },
  { sugar: 12.25, alcohol: 6 },
  { sugar: 12.75, alcohol: 6.25 },
  { sugar: 13.25, alcohol: 6.5 },
  { sugar: 13.38, alcohol: 6.75 },
  { sugar: 14, alcohol: 7 },
  { sugar: 14.5, alcohol: 7.25 },
  { sugar: 15, alcohol: 7.5 },
  { sugar: 15.38, alcohol: 7.75 },
  { sugar: 15.75, alcohol: 8 },
  { sugar: 16.25, alcohol: 8.25 },
  { sugar: 16.75, alcohol: 8.5 },
  { sugar: 17.25, alcohol: 8.75 },
  { sugar: 17.75, alcohol: 9 },
  { sugar: 18.5, alcohol: 9.25 },
  { sugar: 18.75, alcohol: 9.5 },
  { sugar: 19.13, alcohol: 9.75 },
  { sugar: 19.5, alcohol: 10 },
  { sugar: 20, alcohol: 10.25 },
  { sugar: 20.5, alcohol: 10.5 },
  { sugar: 21, alcohol: 10.75 },
  { sugar: 21.5, alcohol: 11 },
  { sugar: 22, alcohol: 11.25 },
  { sugar: 22.5, alcohol: 11.5 },
  { sugar: 23.13, alcohol: 11.75 },
  { sugar: 23.25, alcohol: 12 },
  { sugar: 24, alcohol: 12.25 },
  { sugar: 24.25, alcohol: 12.5 },
  { sugar: 24.5, alcohol: 12.75 },
  { sugar: 25, alcohol: 13 }
];

const interpolate = (value, x, y) => {
  if (value <= x[0]) return y[0];
  if (value >= x[x.length - 1]) return y[y.length - 1];

  const i = x.findIndex(xi => xi > value);
  const x0 = x[i - 1];
  const x1 = x[i];
  const y0 = y[i - 1];
  const y1 = y[i];

  return y0 + ((value - x0) * (y1 - y0)) / (x1 - x0);
};

export default function FermentationAlchol() {
  const [initialSugar, setInitialSugar] = useState(25);
  const [finalSugar, setFinalSugar] = useState(3);
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculate();
  }, [initialSugar, finalSugar]);

  const calculate = () => {
    const sugarDifference = initialSugar - finalSugar;
    const x = sugarTable.map(entry => entry.sugar);
    const y = sugarTable.map(entry => entry.alcohol);

    // Debugging: Check the input and output
    console.log("Sugar Difference:", sugarDifference);
    console.log("X values:", x);
    console.log("Y values:", y);

    // Perform interpolation
    const interpolatedAlcohol = interpolate(sugarDifference, x, y);
    setResult(interpolatedAlcohol);
  };

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
