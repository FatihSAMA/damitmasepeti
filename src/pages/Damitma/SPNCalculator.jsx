import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import { sanityClient } from "../../../client";


export default function SPNCalculator() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "spn"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  const [height, setHeight] = useState(1000);
  const [innerDiameter, setInnerDiameter] = useState(72);
  const [bottomRingHeight, setBottomRingHeight] = useState(100);
  const [topRingHeight, setTopRingHeight] = useState(0);
  const [packingType, setPackingType] = useState("3x3 paslanmaz çelik 0,2 mm");

  const [volume, setVolume] = useState(0);
  const [weight, setWeight] = useState(0);
  const [theoreticalPlates, setTheoreticalPlates] = useState(0);

  useEffect(() => {
    const V = ((innerDiameter / 100) / 2) * 3.14159 * ((innerDiameter / 100) / 2) * ((height - bottomRingHeight - topRingHeight) / 100);
    setVolume(V);
    
    const weightTable = {
      "2x2 paslanmaz çelik 0,2 mm": {
        weight: 1.5,
        height: 2
      },
      "3x3 paslanmaz çelik 0,2 mm": {
        weight: 1,
        height: 3
      },
      "3x3 paslanmaz çelik 0,3 mm": {
        weight: 1.5,
        height: 3,
      },
      "3,5x3,5 paslanmaz çelik 0,25 mm": {
        weight: 1,
        height: 3.5
      },
      "4x4 paslanmaz çelik 0,3 mm": {
        weight: 1.1,
        height: 4
      },
      "5x5 paslanmaz çelik 0,3 mm": {
        weight: 1,
        height: 5
      },
      "3x3 bakır 0,25 mm": {
        weight: 1.5,
        height: 3
      },
      "4x4 bakır 0,3 mm": {
        weight: 1.3,
        height: 4
      },
      "5x5 bakır 0,35 mm": {
        weight: 1.2,
        height: 5
      },
    };

    const S = weightTable[packingType].weight;
    const W = V * S;
    setWeight(W);

    const C = weightTable[packingType].height;
    const T = height / (C * 10);
    setTheoreticalPlates(T);
  }, [height, innerDiameter, bottomRingHeight, topRingHeight, packingType]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/nozzle.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}
        </h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Sütun Yüksekliği"
            unit="mm"
            value={height}
            setter={setHeight}
          />
          <Input
            title="Çekmecenin İç Çapı"
            unit="mm"
            value={innerDiameter}
            setter={setInnerDiameter}
          />
          <Input
            title="Alt Tapanın Yüksekliği"
            unit="mm"
            value={bottomRingHeight}
            setter={setBottomRingHeight}
          />
          <Input
            title="Üst Tapanın Yüksekliği"
            unit="mm"
            value={topRingHeight}
            setter={setTopRingHeight}
          />

          <div className="w-full">
            <label>
              SPN Türü
            </label>
            <select
              className="input"
              value={packingType}
              onChange={(e) => setPackingType(e.target.value)}
            >
              <option value="">SPN Türü Seçin</option>
              <option value="2x2 paslanmaz çelik 0,2 mm">2x2 paslanmaz çelik 0,2 mm</option>
              <option value="3x3 paslanmaz çelik 0,2 mm">3x3 paslanmaz çelik 0,2 mm</option>
              <option value="3x3 paslanmaz çelik 0,3 mm">3x3 paslanmaz çelik 0,3 mm</option>
              <option value="3,5x3,5 paslanmaz çelik 0,25 mm">3,5x3,5 paslanmaz çelik 0,25 mm</option>
              <option value="4x4 paslanmaz çelik 0,3 mm">4x4 paslanmaz çelik 0,3 mm</option>
              <option value="5x5 paslanmaz çelik 0,3 mm">5x5 paslanmaz çelik 0,3 mm</option>
              <option value="3x3 bakır 0,25 mm">3x3 bakır 0,25 mm</option>
              <option value="4x4 bakır 0,3 mm">4x4 bakır 0,3 mm</option>
              <option value="5x5 bakır 0,35 mm">5x5 bakır 0,35 mm</option>
            </select>
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

      {data?.accordions?.length > 0 && (
        data.accordions.map((accordion, index) => (
          <Accordion title={accordion.title} content={accordion.content} key={index} />
        ))
      )}
    </div>
  );
}
