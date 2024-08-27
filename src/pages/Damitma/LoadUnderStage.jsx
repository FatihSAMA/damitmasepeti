// sorunlu
import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function LoadUnderStage() {
  const [height, setHeight] = useState(1000); // Sütun yüksekliği
  const [diameter, setDiameter] = useState("2 inç"); // Sütun çapı
  const [stageChangerType, setStageChangerType] = useState("4 konu"); // Yük altında kademe değiştirici tipi
  const [totalLength, setTotalLength] = useState(0); // Toplam uzunluk
  const [singleLength, setSingleLength] = useState(0); // Bir tomar uzunluğu
  const [bufferCount, setBufferCount] = useState(0); // Tampon sayısı

  useEffect(() => {
    // Yük altında kademe değiştirici tipi için sabit uzunluklar (cm cinsinden)
    const stageChangerValues = {
      "4 konu": {
        "1.5 inç": 40,
        "2 inç": 80,
        "3 inç": 200,
        "4 inç": 305,
      },
      "6 konu": {
        "1.5 inç": 35,
        "2 inç": 75,
        "3 inç": 130,
        "4 inç": 170,
      },
    };

    // Çapların mm cinsinden değerleri
    const diameterValues = {
      "1.5 inç": 35,
      "2 inç": 48,
      "2.5 inç": 59,
      "3 inç": 72,
      "4 inç": 99,
    };

    const P = stageChangerValues[stageChangerType][diameter]; // Yük altında kademe değiştiricinin bir uzunluğu (cm cinsinden)
    const D = diameterValues[diameter]; // Çapın mm cinsinden değeri
    const C = height / 100; // Tapa sayısı (yüksekliği mm'den cm'ye çeviriyoruz)
    const V = (height / (D / 10)) * (P / 10); // Toplam uzunluk

    setTotalLength(V);
    setSingleLength(P);
    setBufferCount(height / (P / 10));
  }, [height, diameter, stageChangerType]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/column.png" alt="" />
        </div>
        <h1 className="calc-title">Yük Altında Kademe Değiştirici Ataşman Uzunluğu Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Sütun Yüksekliği"
            unit="mm"
            value={height}
            setter={setHeight}
          />

          <div className="w-full">
            <select
              className="input"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
            >
              <option value="1.5 inç">1.5 inç</option>
              <option value="2 inç">2 inç</option>
              <option value="2.5 inç">2.5 inç</option>
              <option value="3 inç">3 inç</option>
              <option value="4 inç">4 inç</option>
            </select>
          </div>

          <div className="w-full">
            <select
              className="input"
              value={stageChangerType}
              onChange={(e) => setStageChangerType(e.target.value)}
            >
              <option value="4 konu">4 konu</option>
              <option value="6 konu">6 konu</option>
            </select>
          </div>
        </div>

        <div className="calc-result">
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Toplam Uzunluk:</span>
              <span><b>{totalLength.toFixed(1)}</b> cm</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Bir Tomar Uzunluğu:</span>
              <span><b>{singleLength.toFixed(1)}</b> cm</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Tampon Sayısı:</span>
              <span><b>{bufferCount.toFixed(1)}</b> adet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
