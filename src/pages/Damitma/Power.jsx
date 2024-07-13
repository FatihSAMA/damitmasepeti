import { useState, useEffect } from "react"
import Input from "../../components/Input"

export default function Power() {
  const [calculationMethod, setCalculationMethod] = useState("nominalPower")
  const [nominalPower, setNominalPower] = useState(3000)
  const [requiredPower, setRequiredPower] = useState(2000)
  const [resistance, setResistance] = useState(16)
  const [voltage, setVoltage] = useState(0)

  useEffect(() => {
    calculate()
  }, [calculationMethod, nominalPower, requiredPower, resistance])

  const handleCalculationMethodChange = (e) => {
    setCalculationMethod(e.target.value)
    // resetInputs()
  }

  const resetInputs = () => {
    setNominalPower(0)
    setRequiredPower(0)
    setResistance(0)
    setVoltage(0)
  }

  const calculate = () => {
    let R, U

    if (calculationMethod === "nominalPower") {
      const V1 = parseFloat(nominalPower)
      const V2 = parseFloat(requiredPower)
      R = (220 * 220) / V1
      U = Math.sqrt(V2 * R)
    //   setResistance(R.toFixed(2))
    } else if (calculationMethod === "resistance") {
      R = parseFloat(resistance)
      const V2 = parseFloat(requiredPower)
      U = Math.sqrt(V2 * R)
    }

    setVoltage(U.toFixed(2))
  }

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/power.png" alt="" />
        </div>
        <h1 className="calc-title">Isıtma elemanlarının gücünü sağlanan voltajdan hesaplamak için hesap makinesi</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">


          <div className="w-full">
            <label htmlFor="type" className="label">Hesaplama Türü</label>
            <select id="type" className="input py-1.5 px-2" value={calculationMethod} onChange={handleCalculationMethodChange}>
                <option value="nominalPower">Nominal Güç ile Hesapla</option>
                <option value="resistance">Direnç ile Hesapla</option>
            </select>
          </div>

          {calculationMethod === "nominalPower" && (
            <>
              <Input
                title="Nominal T.E.N. Gücü"
                unit="W"
                value={nominalPower}
                setter={setNominalPower}
              />
              <Input
                title="Gerekli T.E.N. Gücü"
                unit="W"
                value={requiredPower}
                setter={setRequiredPower}
              />
            </>
          )}

          {calculationMethod === "resistance" && (
            <>
              <Input
                title="T.E.N. Direnci"
                unit="Ω"
                value={resistance}
                setter={setResistance}
              />
              <Input
                title="Gerekli T.E.N. Gücü"
                unit="W"
                value={requiredPower}
                setter={setRequiredPower}
              />
            </>
          )}
        </div>

        <div className="calc-result">
          {voltage !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                <span>Gerilim:</span>
                <span><b>{voltage}</b> V</span>
              </div>
              {calculationMethod === "nominalPower" && resistance !== 0 && (
                <div className="flex justify-between w-full pt-2">
                  <span>Direnç:</span>
                  <span><b>{resistance}</b> Ω</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
