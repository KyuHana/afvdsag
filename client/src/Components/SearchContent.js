import React,{useState, useRef} from 'react'
import axios from 'axios'
import '../Css/header.css'
import { Bar } from 'react-chartjs-2'
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faMale, faFemale } from '@fortawesome/free-solid-svg-icons'

function SearchContent({color, title, props}) {
  const [keywordRatio, setKeywordRatio] = useState([])
  const [aniversal, setAniversal] = useState(2020)
  const [gender, setGender] = useState("m")
  const [bool, setBool] = useState(false)
  const [genderBool, setGenderBool] = useState(null)
  const [age, setAge] = useState("2")
  const [ageBool, setAgeBool] = useState(false)
  const content = {
    searchContent: props.location.state.detail,
    aniversal: aniversal,
    gender: gender,
    age: age
  }
  const [clicked, setClicked] = useState(null);
  const defaultset = {
    borderHere: '1px solid rgba(0,0,0,0.5)',
    borderNone: 'none'
  }

  const clickContent = {
    clickName: props.location.state.detail,
  }
  

  if(gender == 'm') {
      defaultset.borderHere = '1px solid rgba(0,0,0,0.5)';
      defaultset.borderNone = 'none'
  } else if(gender == 'f') {
    defaultset.borderHere = 'none'
    defaultset.borderNone = '1px solid rgba(0,0,0,0.5)';
  }

  React.useEffect(() => {
    let key = {
      'cat': 'meow',
      'dog': 'bark'
    }
    let as = '"'
    console.log(as)
    axios.post('api/clickcnt', clickContent)
    .then((response) => {
      let re = response.data[5].split("=")
      let rr = [re[1].trim()]
      let rrr = rr[0].replace(/'/g, as)
      let tttt = JSON.parse(rrr)
      console.log(tttt)
      console.log(tttt["relKeyword"])
    })
  }, [])

  React.useEffect(() => {
    searchingKeyword()
    setBool(props.location.state.enter)
  }, [props.location.state.detail])

  React.useEffect(() => {
    if(clicked === true) {
      axios.post('api/search', content)
    .then((response) => {
      if(response == null) {
        setBool(false)
        //null일때는 안보이게
      } else {
        response = response.data.results[0].data
        setKeywordRatio(keywordRatio.splice(0,12));
        setKeywordRatio([...keywordRatio, ...response])
        console.log(response)
        setBool(true)
      }
    })
    } else if(clicked === false) {
      axios.post('api/search', content)
    .then((response) => {
      if(response == null) {
        setBool(false)
        //null일때는 안보이게
      } else {
        response = response.data.results[0].data
        setKeywordRatio(keywordRatio.splice(0,12));
        setKeywordRatio([...keywordRatio, ...response])
        console.log(keywordRatio)
        setBool(true)
      }
    })
    }
  }, [aniversal])

  React.useEffect(() => {
    if(genderBool === true) {
      setGender('m')
      axios.post('api/search', content)
      .then((response) => {
        console.log(response)
        if(response == null) {
          setBool(false)
          //null일때는 안보이게
        } else {
          console.log(response)
          response = response.data.results[0].data
          setKeywordRatio(keywordRatio.splice(0,12));
          setKeywordRatio([...keywordRatio, ...response])
          console.log(keywordRatio)
          setBool(true)
        }
      })
    }
    else if(genderBool === false) {
      setGender('f')
      axios.post('api/search', content)
      .then((response) => {
        if(response == null) {
          setBool(false)
          //null일때는 안보이게
        } else {
          response = response.data.results[0].data
          setKeywordRatio(keywordRatio.splice(0,12));
          setKeywordRatio([...keywordRatio, ...response])
          console.log(keywordRatio)
          setBool(true)
        }
      })
    }
  }, [genderBool])

  React.useEffect(() => {
    if(ageBool) {
      axios.post('api/search', content)
      .then((response) => {
        if(response == null) {
          setBool(false)
          //null일때는 안보이게
        } else {
          response = response.data.results[0].data
          setKeywordRatio(keywordRatio.splice(0,12));
          setKeywordRatio([...keywordRatio, ...response])
          console.log(keywordRatio)
          setBool(true)
        }
      })
    }
  }, [age])

  const searchingKeyword = () => {
    return axios.post('api/search', content)
    .then((response) => {
      if(response == null) {
        setBool(false)
        //null일때는 안보이게
      } else {
        response = response.data.results[0].data
        setKeywordRatio(keywordRatio.splice(0,12));
        setKeywordRatio([...keywordRatio, ...response])
        setBool(true)
      }
    })
  }

  const assosiateKeywordMove = (value) => {
    props.history.push({
      pathname: '/search',
      state: {detail: value}
    })
  }

  const plusAniver = () => {
    if(aniversal >= 2020) {
      alert('2022년은 아직이에요!!')
      setAniversal(2020)
    } else {
      setAniversal(prev => prev + 1)
      setClicked(true)
    }
    
  }

  const minusAniversal = () => {
    setAniversal(prev => prev - 1)
    setClicked(false)
    
  }

  

    return (
      <div className="searchContent">
        {
          bool ? 
          <div className="naverKeywordBox">
            <div className="naverTrendContentBox">
              <div className="showAniversalBox">
                <div className="showAniversalBox__inBox">
                  <div>
                    <span>{aniversal}</span>
                  </div>
                  <div>
                    <div 
                      className="switchAniversal"
                      onClick={plusAniver}
                    >
                      <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                    <div 
                      className="switchAniversal"
                      onClick={minusAniversal}  
                    >
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  </div>
                </div>
                <div className="showAniversalBox__gender">
                  <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', paddingTop:10, paddingBottom: 10}}>
                    <h3>성별</h3>
                  </div>
                  <div 
                    className="showAniversalBox__gender_each"
                    onClick={() => {
                      setGender("m")
                      setGenderBool(true)
                    }}
                    style={{
                      border: defaultset.borderHere,
                      borderRadius: 10,
                      marginLeft: 10
                    }}
                  >
                    <FontAwesomeIcon icon={faMale} color="blue" />
                  </div>
                  <div 
                    className="showAniversalBox__gender_each"
                    onClick={() => {
                      setGender("f")
                      setGenderBool(false)
                    }}
                    style={{
                      border: defaultset.borderNone,
                      borderRadius: 10,
                    }}
                  >
                    <FontAwesomeIcon icon={faFemale} color="red" />
                  </div>
                </div>
                <div className="showAniversalBox__age">
                  <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <h3>연령</h3>
                  </div>
                  <ul>
                    <li>
                      <input
                        type="button" 
                        size="40" value="13~18"
                        onClick={() => {
                          setAge("2")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="19~24"
                        onClick={() => {
                          setAge("3")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="25~29"
                        onClick={() => {
                          setAge("4")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="30~34"
                        onClick={() => {
                          setAge("5")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="35~39"
                        onClick={() => {
                          setAge("6")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="40~44"
                        onClick={() => {
                          setAge("7")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="45~49"
                        onClick={() => {
                          setAge("8")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="50~54"
                        onClick={() => {
                          setAge("9")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="55~59"
                        onClick={() => {
                          setAge("10")
                          setAgeBool(true)
                        }}
                    />
                    </li>
                    <li>
                      <input
                        type="button" 
                        value="60~"
                        onClick={() => {
                          setAge("11")
                          setAgeBool(true)
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
                
              </div>
              <Bar
                data={{ 
                  labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                  datasets:[
                    {
                      label:`2020년${props.location.state.detail} 트렌딩` ,
                      data: [`${keywordRatio[0].ratio}`, `${keywordRatio[1].ratio}`, `${keywordRatio[2].ratio}`, `${keywordRatio[3].ratio}`, `${keywordRatio[4].ratio}`, `${keywordRatio[5].ratio}`, `${keywordRatio[6].ratio}`, `${keywordRatio[7].ratio}`, `${keywordRatio[8].ratio}`, `${keywordRatio[9].ratio}`, `${keywordRatio[10].ratio}`, `${keywordRatio[11].ratio}`],
                      backgroundColor: [
                        'rgba(0, 8, 255, 0.2)',
                        'rgba(0, 8, 255, 0.1)',
                        'rgba(255, 242, 0, 0.6)',
                        'rgba(255, 242, 0, 0.4)',
                        'rgba(255, 242, 0, 0.2)',
                        'rgba(255, 242, 0, 0.1)',
                        'rgba(255, 0, 0, 0.6)',
                        'rgba(255, 0, 0, 0.4)',
                        'rgba(255, 0, 0, 0.2)',
                        'rgba(255, 0, 0, 0.1)',
                        'rgba(0, 8, 255, 0.6)',
                        'rgba(0, 8, 255, 0.4)',
                      ]
                    }
                  ] 
                }}
                width={100}
                height={30}
              />
            </div>
            
          :
          <div>
            <p>false</p>
          </div>
        }
        
    </div>
    )
  }

export default withRouter(SearchContent)
