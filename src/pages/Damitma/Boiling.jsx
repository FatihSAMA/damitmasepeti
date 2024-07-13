import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";

// Alkol oranı ve basınca bağlı kaynama sıcaklığı verileri
const data = {
  "0": [100, 100.2, 100.4, 100.6, 100.8, 101, 101.2, 101.4],
  "10": [94.2, 94.4, 94.6, 94.8, 95, 95.2, 95.4, 95.6],
  "20": [88.6, 88.8, 89, 89.2, 89.4, 89.6, 89.8, 90],
  // Diğer alkol oranları ve karşılık gelen sıcaklık değerlerini ekleyin
};

const pressures = [0, 20, 40, 60, 80, 100, 120, 140]; // Basınç değerleri mm Hg cinsindendir

const interpolate = (value, x, y) => {
  if (x.length === 0 || y.length === 0) return NaN;

  if (x.length === 1) return y[0];

  const i = x.findIndex((xi) => xi > value);
  if (i === -1) return y[y.length - 1];

  const x0 = x[i - 1];
  const x1 = x[i];
  const y0 = y[i - 1];
  const y1 = y[i];

  if (x0 === x1) return y0;

  console.log(`Interpolating: value=${value}, x0=${x0}, x1=${x1}, y0=${y0}, y1=${y1}`);
  return y0 + ((value - x0) * (y1 - y0)) / (x1 - x0);
};

const findClosestAlcoholContent = (alcoholContent) => {
  const alcoholContents = Object.keys(data).map((key) => parseFloat(key));
  const low = Math.max(...alcoholContents.filter((ac) => ac <= alcoholContent));
  const high = Math.min(...alcoholContents.filter((ac) => ac >= alcoholContent));
  console.log(`Alcohol content: ${alcoholContent}, low=${low}, high=${high}`);
  return { low, high };
};

const getPressureColumns = (pressure_kPa) => {
  const col_low = pressures.filter((p) => p <= pressure_kPa);
  const col_high = pressures.filter((p) => p >= pressure_kPa);
  console.log(`Pressure: ${pressure_kPa} kPa, col_low=${col_low}, col_high=${col_high}`);
  return {
    col_low: col_low[col_low.length - 1],
    col_high: col_high[0],
    p_low: col_low[col_low.length - 1],
    p_high: col_high[0],
  };
};

export default function BoilingTemperatureCalculator() {
  const [alcoholContent, setAlcoholContent] = useState(10);
  const [pressure, setPressure] = useState(760);
  const [useCustomTemp, setUseCustomTemp] = useState(false);
  const [temperature, setTemperature] = useState(20);
  const [boilingTemperature, setBoilingTemperature] = useState(0);

  const calculateBoilingTemperature = () => {
    const pressure_kPa = pressure * 0.13332236842;

    const { low: alc_low, high: alc_high } = findClosestAlcoholContent(alcoholContent);
    const { col_low, col_high, p_low, p_high } = getPressureColumns(pressure_kPa);

    console.log(`Interpolating for alc_low: ${alc_low}, alc_high: ${alc_high}`);
    const t_low = interpolate(pressure_kPa, pressures, data[alc_low]);
    const t_high = interpolate(pressure_kPa, pressures, data[alc_high]);

    console.log(`t_low=${t_low}, t_high=${t_high}`);
    const boiling_temp = alc_low === alc_high ? t_low : interpolate(alcoholContent, [alc_low, alc_high], [t_low, t_high]);
    console.log(`Calculated boiling temperature: ${boiling_temp}`);
    setBoilingTemperature(Math.round(boiling_temp * 100) / 100);
  };

  useEffect(() => {
    calculateBoilingTemperature();
  }, [alcoholContent, pressure, temperature, useCustomTemp]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/boiling-point.png" alt="" />
        </div>
        <h1 className="calc-title">Kaynama Sıcaklığı Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Sıvının Alkol Oranı"
            unit="%"
            value={alcoholContent}
            setter={setAlcoholContent}
          />
          <Input
            title="Küpteki Basınç"
            unit="mm Hg"
            value={pressure}
            setter={setPressure}
          />
          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useCustomTemp} setState={setUseCustomTemp} />
              <span>Sıvı Sıcaklığı, <b>°C</b></span>
            </div>
            {useCustomTemp && (
              <Input 
                title={""}
                unit={""}
                value={temperature}
                setter={setTemperature}
              />
            )}
          </div>
        </div>

        <div className="calc-result">
          {boilingTemperature !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Kaynama Sıcaklığı:</span>
                <span><b>{boilingTemperature}</b> °C</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
