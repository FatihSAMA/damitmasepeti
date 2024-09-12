import { useState, useEffect } from "react"
import Input from "../../components/Input"

export default function Chaptalization() {
  const [initialSugarContent, setInitialSugarContent] = useState(20)
  const [requiredSugarContent, setRequiredSugarContent] = useState(23)
  const [wineVolume, setWineVolume] = useState(30)
  const [sugarMass, setSugarMass] = useState(0)

  const [error, setError] = useState(false)

  const calculateSugarMass = () => {
    const P1 = parseFloat(initialSugarContent)
    const P2 = parseFloat(requiredSugarContent)
    const V = parseFloat(wineVolume)

    if(P1 > P2){
      setError("Başlangıç şeker değeri, gerekli şeker değerinden yüksek olamaz!")
    }else{
      setError(false)
    }
    
    const M = (((V * 1.5 * (P2 - P1)) / 16) * 0.45) / 3.785410
    setSugarMass(M.toFixed(3))
  }

  useEffect(() => {
    calculateSugarMass()
  }, [initialSugarContent, requiredSugarContent, wineVolume])

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/grape.png" alt="" />
        </div>
        <h1 className="calc-title">Şaptalizasyon Hesaplayıcı</h1>
      </div>

      <div className="calc-bottom">
        <div className="calc-inputs">
          <Input
            title="Başlangıç Şeker İçeriği"
            unit="°Bx"
            value={initialSugarContent}
            setter={setInitialSugarContent}
          />
          <Input
            title="Gerekli Şeker İçeriği"
            unit="°Bx"
            value={requiredSugarContent}
            setter={setRequiredSugarContent}
          />
          <Input
            title="Şarap Hacmi"
            unit="l"
            value={wineVolume}
            setter={setWineVolume}
          />
        </div>

        <div className="calc-result">
          {sugarMass !== 0 && (
            <div className="divide-y space-y-2">
              <div className="flex justify-between w-full pt-2">
                {error ? (
                  <span className="text-red-600">
                    {error}
                  </span>
                ) : 
                  <>
                    <span>Eklenmesi Gereken Şeker Kütlesi :</span>
                    <span><b>{sugarMass}</b> kg</span>
                  </>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
