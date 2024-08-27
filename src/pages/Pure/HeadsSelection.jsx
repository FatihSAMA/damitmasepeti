import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";

export default function HeadsSelection() {
  const [rawAlcoholVolume, setRawAlcoholVolume] = useState(30); // Spirtos-su hacmi
  const [rawAlcoholStrength, setRawAlcoholStrength] = useState(40); // Spirtos-su alkol oranı
  const [headsShare, setHeadsShare] = useState(10); // Baş kesimi oranı
  const [temperature, setTemperature] = useState(20); // Sıcaklık
  const [useTemperature, setUseTemperature] = useState(false); // Sıcaklık toggle
  const [absoluteAlcoholVolume, setAbsoluteAlcoholVolume] = useState(0); // Mutlak alkol hacmi
  const [headsVolume, setHeadsVolume] = useState(0); // Baş kesimi hacmi

  const calculateHeadsSelection = () => {
    const VSS = parseFloat(rawAlcoholVolume);
    const SSS = parseFloat(rawAlcoholStrength);
    const DG = parseFloat(headsShare);

    // Mutlak alkol hacmi
    const VAS = (VSS * SSS) / 100;

    // Baş kesimi hacmi
    const VG = (VAS * DG) / 100;

    setAbsoluteAlcoholVolume(VAS);
    setHeadsVolume(VG);
  };

  useEffect(() => {
    calculateHeadsSelection();
  }, [rawAlcoholVolume, rawAlcoholStrength, headsShare, useTemperature, temperature]);

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/lab.png" alt="" />
        </div>
        <h1 className="calc-title">Hedef Seçim Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Ham alkol hacmi"
            unit="L"
            value={rawAlcoholVolume}
            setter={setRawAlcoholVolume}
          />
          <Input
            title="Ham alkolün alkol içeriği"
            unit="%"
            value={rawAlcoholStrength}
            setter={setRawAlcoholStrength}
          />
          <Input
            title="Hedeflerin payı"
            unit="%"
            value={headsShare}
            setter={setHeadsShare}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle state={useTemperature} setState={setUseTemperature} />
              <span>Ham alkol sıcaklığı, <b>°C</b></span>
            </div>
            {useTemperature && (
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
          <div className="divide-y space-y-2">
            <div className="flex justify-between w-full pt-2">
              <span>Kafa Hacmi:</span>
              <span><b>{headsVolume.toFixed(3)}</b> L</span>
            </div>
            <div className="flex justify-between w-full pt-2">
              <span>Mutlak Alkol Hacmi:</span>
              <span><b>{absoluteAlcoholVolume.toFixed(3)}</b> L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
