import { useEffect } from "react"
import Input from "../../components/Input"
import Accordion from "../../components/Accordion"
import { sanityClient } from "../../../client"


const table = {
  0: {
    0: -1,
    0.5: -0.5,
    1: 0,
    1.5: 0.5,
    2: 1,
    2.5: 1.5,
    3: 2,
    3.5: 2.5,
    4: 3,
    4.5: 3.5,
    5: 4,
    5.5: 4.5,
    6: 5,
    6.5: 5.5,
    7: 6,
    7.5: 6.5,
    8: 7,
    8.5: 7.5,
    9: 8,
    9.5: 8.5,
    10: 9,
    10.5: 9.5,
    11: 10,
    11.5: 10.5,
    12: 11,
    12.5: 11.6,
    13: 12.1,
    13.5: 12.6,
    14: 13.1,
    14.5: 13.6,
    15: 14.1,
    15.5: 14.6,
    16: 15.1,
    16.5: 15.6,
    17: 16.1,
    17.5: 16.6,
    18: 17.1,
    18.5: 17.6,
    19: 18.1,
    19.5: 18.6,
    20: 19.1,
    20.5: 19.6,
    21: 20.1,
    21.5: 20.6,
    22: 21.1,
    22.5: 21.6,
    23: 22.1,
    23.5: 22.6,
    24: 23.1,
    24.5: 23.6,
    25: 24.1
  },
  
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

      <div className="accordions">
        {data?.accordions?.length > 0 && (
          data.accordions.map((accordion, index) => (
            <Accordion title={accordion.title} content={accordion.content} key={index} />
          ))
        )}
      </div>

    </div>
  )
}
