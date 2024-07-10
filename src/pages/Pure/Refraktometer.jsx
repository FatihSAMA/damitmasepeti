import { useState, useEffect } from "react"
import Input from "../../components/Input"

export default function Refractometer() {
  const [calculationType, setCalculationType] = useState("specificGravity")

  const [initialSG, setInitialSG] = useState(1.050)
  const [finalSG, setFinalSG] = useState(1.010)
  const [initialBrix, setInitialBrix] = useState(20)
  const [finalBrix, setFinalBrix] = useState(5)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    calculate()
  }, [calculationType, initialSG, finalSG, initialBrix, finalBrix])

  const handleCalculationTypeChange = (e) => {
    setCalculationType(e.target.value)
  }

  const calculate = () => {
    let resultData = 0

    if (calculationType === "specificGravity") {
      const SG1 = parseFloat(initialSG)
      const SG2 = parseFloat(finalSG)
      if (!isNaN(SG1) && !isNaN(SG2) && SG1 >= 1 && SG1 <= 1.130 && SG2 >= 1 && SG2 <= 1.130) {
        resultData = (SG1 - SG2) * 129
        setError(false)
      } else {
        setError("Özgül ağırlık 1 ila 1.130 arasında olmalıdır.")
      }
    } else if (calculationType === "brix") {
      const B1 = parseFloat(initialBrix)
      const B2 = parseFloat(finalBrix)

      if (!isNaN(B1) && !isNaN(B2) && B1 >= 0 && B1 <= 30 && B2 >= 0 && B2 <= 30) {
        resultData = ((B1 - B2) / (258.6 - (B1 / 258.2) * 227.1)) * 100
        setError(false)
      } else {
        setError("Brix değeri 0 ile 30 arasında olmalıdır.")
      }
      
    }

    setResult(resultData)
  }

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/refractometer.png" alt="" />
        </div>
        <h1 className="calc-title">Refraktometre ile Alkol Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <div className="w-full">
            <label htmlFor="type" className="label">Hesaplama Türü</label>
            <select
              id="type"
              className="input py-1.5 px-2"
              value={calculationType}
              onChange={handleCalculationTypeChange}
            >
              <option value="specificGravity">Özgül Ağırlığa Göre</option>
              <option value="brix">Brix'e Göre</option>
            </select>
          </div>

          {calculationType === "specificGravity" && (
            <>
              <Input
                title="Fermantasyon Öncesi Özgül Ağırlık"
                unit="g/ml"
                value={initialSG}
                setter={setInitialSG}
              />
              <Input
                title="Fermantasyon Sonrası Özgül Ağırlık"
                unit="g/ml"
                value={finalSG}
                setter={setFinalSG}
              />
            </>
          )}

          {calculationType === "brix" && (
            <>
              <Input
                title="Fermantasyon Öncesi Brix"
                unit="°Bx"
                value={initialBrix}
                setter={setInitialBrix}
              />
              <Input
                title="Fermantasyon Sonrası Brix"
                unit="°Bx"
                value={finalBrix}
                setter={setFinalBrix}
              />
            </>
          )}
        </div>

        <div className="calc-result">
          {result !== null && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                {error && (
                  <span>{error}</span>
                )}
                {!error && (
                  <>
                    <span>Pürenin Alkol İçeriği :</span>
                    <span>% <b>{result.toFixed(2)}</b></span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
