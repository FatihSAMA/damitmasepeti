import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";

export default function SPNCalculator() {
  const [height, setHeight] = useState(1000);
  const [innerDiameter, setInnerDiameter] = useState(72);
  const [bottomRingHeight, setBottomRingHeight] = useState(100);
  const [topRingHeight, setTopRingHeight] = useState(0);
  const [packingType, setPackingType] = useState("3x3 paslanmaz çelik 0,2 mm");
  const [packingDensity, setPackingDensity] = useState(5);
  const [volume, setVolume] = useState(0);
  const [weight, setWeight] = useState(0);
  const [theoreticalPlates, setTheoreticalPlates] = useState(0);

  useEffect(() => {
    // Hacim hesaplama formülü
    const V = ((innerDiameter / 100) / 2) * 3.14159 * ((innerDiameter / 100) / 2) * ((height - bottomRingHeight - topRingHeight) / 100);
    setVolume(V);

    // Ağırlık hesaplama formülü
    const weightTable = {
      "3x3 paslanmaz çelik 0,2 mm": 1,
      "3x3 paslanmaz çelik 0,3 mm": 1.5,
      "3,5x3,5 paslanmaz çelik 0,25 mm": 1,
      "4x4 paslanmaz çelik 0,3 mm": 1.1,
      "5x5 paslanmaz çelik 0,3 mm": 1,
      "3x3 bakır 0,25 mm": 1.5,
      "4x4 bakır 0,3 mm": 1.3,
      "5x5 bakır 0,35 mm": 1.2,
      // Diğer SPN türleri buraya eklenecek
    };
    const S = weightTable[packingType];
    const W = V * S * (packingDensity / 1000);
    setWeight(W);

    // Teorik plakaların sayısını hesaplama formülü
    const C = 10; // Örnek bir sabit değer, gerçek formüle göre ayarlanacak
    const T = height / (C * 10);
    setTheoreticalPlates(T);
  }, [height, innerDiameter, bottomRingHeight, topRingHeight, packingType, packingDensity]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/column.png" alt="" />
        </div>
        <h1 className="calc-title">Калькулятор объема насадки СПН</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Kolon Yüksekliği"
            unit="mm"
            value={height}
            setter={setHeight}
          />
          <Input
            title="İç Çap"
            unit="mm"
            value={innerDiameter}
            setter={setInnerDiameter}
          />
          <Input
            title="Alt Tapa Yüksekliği"
            unit="mm"
            value={bottomRingHeight}
            setter={setBottomRingHeight}
          />
          <Input
            title="Üst Tapa Yüksekliği"
            unit="mm"
            value={topRingHeight}
            setter={setTopRingHeight}
          />

          <div className="w-full">
            <select
              className="input"
              value={packingType}
              onChange={(e) => setPackingType(e.target.value)}
            >
              <option value="">SPN Türü Seçin</option>
              <option value="3x3 paslanmaz çelik 0,2 mm">3x3 paslanmaz çelik 0,2 mm</option>
              <option value="3x3 paslanmaz çelik 0,3 mm">3x3 paslanmaz çelik 0,3 mm</option>
              <option value="3,5x3,5 paslanmaz çelik 0,25 mm">3,5x3,5 paslanmaz çelik 0,25 mm</option>
              <option value="4x4 paslanmaz çelik 0,3 mm">4x4 paslanmaz çelik 0,3 mm</option>
              <option value="5x5 paslanmaz çelik 0,3 mm">5x5 paslanmaz çelik 0,3 mm</option>
              <option value="3x3 bakır 0,25 mm">3x3 bakır 0,25 mm</option>
              <option value="4x4 bakır 0,3 mm">4x4 bakır 0,3 mm</option>
              <option value="5x5 bakır 0,35 mm">5x5 bakır 0,35 mm</option>
              {/* Diğer SPN türleri buraya eklenecek */}
            </select>
          </div>

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={packingDensity !== 10} setState={(state) => setPackingDensity(state ? 100 : 10)} />
              <span>Sıkıştırma Yüzdesi, <b>%</b></span>
            </div>

            {packingDensity !== 10 && (
              <Input
                title=""
                unit=""
                value={packingDensity}
                setter={setPackingDensity}
              />
            )}
          </div>

        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>SPN Hacmi:</span>
              <span><b>{volume.toFixed(3)}</b> litre</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>SPN Ağırlığı:</span>
              <span><b>{weight.toFixed(3)}</b> kilogram</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Teorik Plaka Sayısı:</span>
              <span><b>{theoreticalPlates.toFixed(1)}</b> adet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
