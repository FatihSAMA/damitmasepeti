import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";

// Alkol oranı ve basınca bağlı kaynama sıcaklığı verileri
const data = {
  "0": [37.9, 51.2, 59.8, 66.5, 83.3, 93.2, 100, 106.3, 111.4, 115.8, 120.1],
  "10": [32.5, 45.2, 53.3, 60.5, 76.7, 87, 91, 100.6, 105.8, 110.3, 114.3],
  "20": [29.5, 42, 49.9, 56.2, 72, 82, 87, 94.7, 100, 104.5, 108.8],
  "30": [27.7, 40, 47.8, 54, 69.3, 79.3, 84.5, 91.2, 96.5, 100.8, 104.6],
  "40": [26.4, 38.6, 46.4, 53.5, 67.7, 77.7, 83, 89.5, 94.3, 98.4, 102.2],
  "50": [25.5, 37.7, 45.4, 51.2, 66, 75, 82, 88, 92.8, 96.8, 100.6],
  "60": [24.7, 36.9, 44.6, 50.5, 64.9, 74.6, 81, 87, 91.9, 96, 99.7],
  "70": [24, 36.1, 43.9, 49.8, 64.5, 74.2, 80, 86.1, 91.1, 95.2, 98.8],
  "75": [23.7, 35.8, 43.5, 49.5, 64.3, 74, 79.7, 85.6, 90.7, 94.7, 98.4],
  "80": [23.3, 35.4, 43.1, 49.2, 63.8, 73.7, 79.5, 85.3, 90.4, 94.4, 98],
  "85": [23, 35, 42.7, 48.9, 63.6, 73.5, 79.3, 85, 90, 93.7, 97.5],
  "90": [22.6, 34.8, 42.4, 48.6, 63.6, 73.2, 79, 84.8, 89.7, 93.5, 97.2],
  "95": [22.4, 34.6, 42.2, 48.3, 63.3, 72.8, 78.6, 84.4, 89.3, 93.1, 96.7],
  "100": [22.2, 34.4, 42.1, 48.1, 63.2, 72.6, 78.4, 84.2, 89, 92.8, 96.4],
};

const pressures = [50, 100, 150, 200, 400, 600, 760, 943, 1126, 1310, 1495]; // mm Hg

const interpolate = (value, x, y) => {
  if (x.length === 0 || y.length === 0) return NaN;
  if (value <= x[0]) return y[0]; // Değer en düşük basınçtan küçükse
  if (value >= x[x.length - 1]) return y[y.length - 1]; // Değer en yüksek basınçtan büyükse

  const i = x.findIndex((xi) => xi >= value);
  if (i === -1 || i === 0) return y[0]; // Değer aralık dışında

  const x0 = x[i - 1];
  const x1 = x[i];
  const y0 = y[i - 1];
  const y1 = y[i];

  return y0 + ((value - x0) * (y1 - y0)) / (x1 - x0);
};

const findClosestAlcoholContent = (alcoholContent) => {
  const alcoholContents = Object.keys(data).map((key) => parseFloat(key));
  const low = Math.max(...alcoholContents.filter((ac) => ac <= alcoholContent));
  const high = Math.min(...alcoholContents.filter((ac) => ac >= alcoholContent));
  return { low, high };
};

const getPressureColumns = (pressure_kPa) => {
  const col_low = pressures.filter((p) => p <= pressure_kPa);
  const col_high = pressures.filter((p) => p >= pressure_kPa);
  return {
    col_low: col_low[col_low.length - 1],
    col_high: col_high[0],
    p_low: col_low[col_low.length - 1],
    p_high: col_high[0],
  };
};

export default function BoilingTemperatureCalculator() {

  const [fetchedData, setFetchedData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "kaynama_noktasi"]`
        const result = await sanityClient.fetch(query)
        setFetchedData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  const [alcoholContent, setAlcoholContent] = useState(10);
  const [pressure, setPressure] = useState(760);
  const [useCustomTemp, setUseCustomTemp] = useState(false);
  const [temperature, setTemperature] = useState(20);
  const [boilingTemperature, setBoilingTemperature] = useState(0);

  const calculateBoilingTemperature = () => {

    const pressure_kPa = pressure * 0.13332236842; // kPa'ya çevirme
    const { low: alc_low, high: alc_high } = findClosestAlcoholContent(alcoholContent);
    const { col_low, col_high } = getPressureColumns(pressure);

    // Alc_low ve Alc_high arasında interpolasyon
    const t_low = interpolate(pressure, pressures, data[alc_low]);
    const t_high = interpolate(pressure, pressures, data[alc_high]);

    let boiling_temp = alc_low === alc_high ? t_low : interpolate(alcoholContent, [alc_low, alc_high], [t_low, t_high]);

    // Sıcaklık etkisini dahil etme
    if (useCustomTemp) {
      boiling_temp += (temperature - 20); // Örnek olarak, sıvının mevcut sıcaklığına göre kaynama sıcaklığına bir düzeltme ekliyoruz
    }

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

      {fetchedData?.accordions?.length > 0 && (
        fetchedData.accordions.map((accordion, index) => (
          <Accordion title={accordion.title} content={accordion.content} key={index} />
        ))
      )}

    </div>
  );
}

