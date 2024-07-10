import { useState, useEffect } from "react"
import Input from "../../components/Input"
import correctionData from "../../data/sugarCorrection.json" 

export default function SugarCorrection() {
  const [temperature, setTemperature] = useState(1)
  const [sugarContent, setSugarContent] = useState(1)
  const [correction, setCorrection] = useState(null)

  const handleCalculate = () => {
    const tempIndex = correctionData.temperatures.indexOf(temperature)
    const sugarIndex = correctionData.sugarContents.indexOf(sugarContent)

    if (tempIndex !== -1 && sugarIndex !== -1) {
      setCorrection(correctionData.corrections[tempIndex][sugarIndex])
    } else {
      setCorrection("Geçersiz değerler")
    }
  }

  useEffect(() => {
    handleCalculate()
  }, [temperature, sugarContent])

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/sugar.png" alt="" />
        </div>
        <h1 className="calc-title">AS-3 Şekerometre Düzeltme Hesaplayıcı</h1>
      </div>
      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Sıcaklık"
            unit="°C"
            value={temperature}
            setter={setTemperature}
          />
          <Input
            title="Şeker Oranı"
            unit="%"
            value={sugarContent}
            setter={setSugarContent}
          />
        </div>
        <div className="calc-result">
          {correction !== null && (
            <div className="result">
              <p>Gerçek Şeker Oranı: <b>{correction}</b>%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
