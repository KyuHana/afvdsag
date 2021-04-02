import React, {useRef} from 'react'
import '../Css/aniversal.css'

function Aniversal() {
  let aniversal = useRef("")
  let month = useRef("")
  React.useEffect(() => {
    aniversal.current = new Date().getFullYear()
    month.current = new Date().getMonth()
    console.log(month.current)
  }, [])

  return (
    <div className="wholeBox" style={{}}>
      <div className="aniversalBox">
      <select className="aniversal">
        <option value="2020"></option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>    
      </select>
      <select className="month">
        <option value="1"></option>
        <option value="1">1</option>
        <option value="1">1</option>
      </select>
      <select className="month">
        <option value="1">1</option>
        <option value="1">1</option>
        <option value="1">1</option>
      </select>
    </div>
      <div className="aniversalBox">
      <label>종료연도</label>
      <input type="text" value="" className="writeDuration"/> 년
      <input type="text" value="" className="writeDuration"/> 월
      <input type="text" value="" className="writeDuration"/> 일
    </div>
  </div>
  
  )
}

export default Aniversal
