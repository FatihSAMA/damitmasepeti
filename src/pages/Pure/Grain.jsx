import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";

export default function Grain() {
  const [calculationType, setCalculationType] = useState("hydraulicModule");

  const [hydraulicModule, setHydraulicModule] = useState(5);
  const [waterVolume, setWaterVolume] = useState(25);
  const [pureVolume, setPureVolume] = useState(28.125);
  const [rawMaterialMass, setRawMaterialMass] = useState(5);
  const [starchContent, setStarchContent] = useState(51.5);
  const [sugarContent, setSugarContent] = useState(2);
  const [result, setResult] = useState({});

  const [isFermentationOpen, setIsFermentationOpen] = useState(false);
  const [fermentationEfficiency, setFermentationEfficiency] = useState(100);

  useEffect(() => {
    calculate();
  }, [
    calculationType,
    hydraulicModule,
    waterVolume,
    pureVolume,
    rawMaterialMass,
    starchContent,
    sugarContent,
    fermentationEfficiency,
  ]);

  const handleCalculationTypeChange = (e) => {
    setCalculationType(e.target.value);
  };

  const calculate = () => {
    const MS = parseFloat(rawMaterialMass);
    const SZ = parseFloat(starchContent);
    const KZ = parseFloat(sugarContent);
    const E = parseFloat(fermentationEfficiency);
    let resultData = {};

    if (calculationType === "hydraulicModule") {
      const G = parseFloat(hydraulicModule);
      const VW = MS * G;
      const ES = MS * SZ / 100 + (MS * KZ / 100) * 1.11;
      const VAS = (E / 100) * ES * 0.682;
      const SB = (VAS * 100) / VW;
      const SS = (ES / (ES + VW)) * 100;
      const V40 = (VW * SB) / 40;
      const VS = VW + MS * 0.63;

      resultData = { VW, ES, VAS, SB, SS, V40, VS, MS, SZ, KZ };
    } else if (calculationType === "waterVolume") {
      const VW = parseFloat(waterVolume);
      const G = VW / MS;
      const ES = MS * SZ / 100 + (MS * KZ / 100) * 1.11;
      const VAS = (E / 100) * ES * 0.682;
      const SB = (VAS * 100) / VW;
      const SS = (ES / (ES + VW)) * 100;
      const V40 = VW * SB / 40;
      const VS = VW + MS * 0.63;

      resultData = { G, ES, VAS, SB, SS, V40, VS, MS, SZ, KZ };
    }

    setResult(resultData);
  };

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/grain.png" alt="" />
        </div>

        <h1 className="calc-title">Tahıl Püresi Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          {/* Hesaplama Türü */}
          <div className="w-full">
            <label htmlFor="type" className="label">
              Hesaplama Türü
            </label>
            <select
              id="type"
              className="input py-1.5 px-2"
              value={calculationType}
              onChange={handleCalculationTypeChange}
            >
              <option value="hydraulicModule">Hidrolik Modüle Göre</option>
              <option value="waterVolume">Su Hacmine Göre</option>
            </select>
          </div>

          {calculationType === "hydraulicModule" && (
            <Input
              title="Hidrolik Modül"
              unit="1:"
              value={hydraulicModule}
              setter={setHydraulicModule}
            />
          )}

          {calculationType === "waterVolume" && (
            <Input
              title="Su Hacmi"
              unit="l"
              value={waterVolume}
              setter={setWaterVolume}
            />
          )}

          <Input
            title="Toplam Hammadde Kütlesi"
            unit="kg"
            value={rawMaterialMass}
            setter={setRawMaterialMass}
          />

          <Input
            title="Hammaddelerin Nişasta İçeriği"
            unit="%"
            value={starchContent}
            setter={setStarchContent}
          />

          <Input
            title="Hammaddelerin Şeker İçeriği"
            unit="%"
            value={sugarContent}
            setter={setSugarContent}
          />

          <div className="w-full">
            <div className="flex gap-2.5 items-center text-sm mb-2">
              <Toggle
                state={isFermentationOpen}
                setState={setIsFermentationOpen}
              />
              <span>
                Fermantasyon Verimliliği, <b>%</b>
              </span>
            </div>

            {isFermentationOpen && (
              <Input
                title={""}
                unit={""}
                value={fermentationEfficiency}
                setter={setFermentationEfficiency}
              />
            )}
          </div>
        </div>

        <div className="calc-result">
          {Object.keys(result).length !== 0 && (
            <>
              <div className="divide-y space-y-2">
                <div className="flex justify-between w-full pt-2">
                  <span>Gerekli Su Hacmi :</span>
                  <span>
                    <b>{result.VW.toFixed(3)}</b> litre
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Toplam Hammadde Kütlesi :</span>
                  <span>
                    <b>{result.MS.toFixed(3)}</b> kg
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Hammaddelerin Toplam Nişasta İçeriği :</span>
                  <span>
                    <b>{result.SZ.toFixed(2)}</b> %
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Hammaddelerin Toplam Şeker İçeriği :</span>
                  <span>
                    <b>{result.KZ.toFixed(2)}</b> %
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Eşdeğer Şeker Kütlesi :</span>
                  <span>
                    <b>{result.ES.toFixed(3)}</b> kg
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Şıranın Şeker İçeriği :</span>
                  <span>
                    % <b>{result.SS.toFixed(2)}</b>
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Pürenin Alkol İçeriği :</span>
                  <span>
                    % <b>{result.SB.toFixed(2)}</b>
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Mutlak Alkol Hacmi :</span>
                  <span>
                    <b>{result.VAS.toFixed(3)}</b> litre
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>%40 Hacim Damıtık :</span>
                  <span>
                    <b>{result.V40.toFixed(3)}</b> litre
                  </span>
                </div>

                <div className="flex justify-between w-full pt-2">
                  <span>Toplam Şıra Hacmi :</span>
                  <span>
                    <b>{result.VS.toFixed(3)}</b> litre
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
