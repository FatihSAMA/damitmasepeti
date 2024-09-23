import { useEffect } from "react"
import Input from "../../components/Input"
import Accordion from "../../components/Accordion"
import { sanityClient } from "../../../client"


const table = {
  0: {
    0: -1,
    0.5: -0.5,
    1: 0,

  }
}


export default function AS3() {

  const [data, setData] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      
      try{
        const query = `*[_type == "calculations" && id == "as3"]`
        const result = await sanityClient.fetch(query)
        setData(result[0])
      }
      catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
      }

    }

    fetchData()

  }, [])

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-icon">
          <img src="/icons/sugar.png" alt="" />
        </div>
        <h1 className="calc-title">
          {data?.title}  
        </h1>
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

      {data?.accordions?.length > 0 && (
        data.accordions.map((accordion, index) => (
          <Accordion title={accordion.title} content={accordion.content} key={index} />
        ))
      )}

    </div>
  )
}
