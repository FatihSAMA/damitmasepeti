import { useState, useEffect } from "react"
import Input from "../../components/Input"

export default function GlucoseFructose() {
  const [sugarMass, setSugarMass] = useState(0)
  const [resultMass, setResultMass] = useState(0)

  const calculateMass = () => {
    const S = parseFloat(sugarMass)
    const M = S + (S * 5) / 100
    setResultMass(M.toFixed(2))
  }

  useEffect(() => {
    calculateMass()
  }, [sugarMass])

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/fructose.png" alt="" />
        </div>
        <h1 className="calc-title">Şekerden Glikoz veya Fruktoz Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Şeker Kütlesi"
            unit="kg"
            value={sugarMass}
            setter={setSugarMass}
          />
        </div>

        <div className="calc-result">
          {resultMass !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Glikoz veya Fruktoz Kütlesi :</span>
                <span><b>{resultMass}</b> kg</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
