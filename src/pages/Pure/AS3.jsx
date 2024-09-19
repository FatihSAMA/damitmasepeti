import Input from "../../components/Input"

export default function AS3() {



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
          {/* <Input
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
          /> */}
        </div>
        <div className="calc-result">
          {/* {correction !== null && (
            <div className="result">
              <p>Gerçek Şeker Oranı: <b>{correction}</b>%</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
