import axios from 'axios'
import React, {useState} from 'react'
import '../Css/duration.css'
import { Line } from 'react-chartjs-2'
function Duration({props, content}) {
  const [arrStat, setArrStat] = useState([])
  const [are, setAre] = useState([])
  const [keyStat, setKeyStat] = useState([])
  const [asdf, setasdf] = useState([])
  const dateSearch = {
    date: props.location.state.detail,
    aniversal: content.aniversal,
    gender: content.gender,
    age: content.age
  }
  const nextDate = React.useRef("")
  let keywordDateData;
  let arr1 = [,,];
  let arr2 = [,,];

  React.useEffect(() => {
    async function fetchDateData() {
      await graphDate()
      keywordDateData = nextDate.current.data.results[0].data;
      await arr23(keywordDateData)
      for(let i = 0; i<10;) {
        arr1 = [i, i+1]
        arr2 = [keywordDateData[i].ratio, keywordDateData[i].ratio]
        i++
      }
      console.log(dateSearch)
      console.log(content.aniversal)
    }
    fetchDateData()
  }, [content.aniversal])

  const graphDate = () => {
    return axios.post('/api/searchDate', dateSearch)
    .then((response) => {
      nextDate.current = response
    })
  }

  const arr23 = (keywordDateData) => {
    console.log(keywordDateData)
    for (let index = 0; index < keywordDateData.length; index++) {
      setArrStat([
        arrStat.push(index)
        //arrStat.push(keywordDateData[index].ratio)
      ])
      setKeyStat([
        keyStat.push(keywordDateData[index].ratio)
      ])
    }
    setAre([...arrStat])
    setasdf([...keyStat])
  }

  return (
    <div style={{}}> 
      <Line
                  data={{ 
                  labels: [...are],
                  datasets:[
                    {
                      label:`2020년 트렌딩`,
                      data: [...asdf],
                      backgroundColor: 'rgba(0, 8, 255, 0.2)'
                    }
                  ],
                
                }}
                width={100}
                  height={30}
                />
    </div>
  )
}

export default Duration
