import React,{useState} from 'react'
import axios from 'axios'
import '../Css/header.css'
import { Line } from 'react-chartjs-2'
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import RelKeywordPage from '../Components/RelKeywordPage'
import HistoryKeyword from '../Components/HistoryKeyword'

function SearchContent({color, title, props}) {
  const [keywordRatio, setKeywordRatio] = useState([])
  const [aniversal, setAniversal] = useState(2020)
  const [gender, setGender] = useState("m")
  const [bool, setBool] = useState(false)
  const [genderBool, setGenderBool] = useState(null)
  const [age, setAge] = useState("2")
  const [ageBool, setAgeBool] = useState(false)
  const [mobileClic, setMobileClic] = useState("")
  const [pcClick, setPcClick] = useState("")
  const [compIdx, setCompIdx] = useState("")
  const [relKeyword, setRelKeyword] = useState("")
  const [moreRelKeyword, setMoreRelKeyword] = useState(false)
  const [showbarBox, setShowbarBox] = useState(true)
  const [dataLabel, setDataLabel] = useState([])
  const [dataValue, setDataValue] = useState([])

  let today = new Date()
  let thisYear = today.getFullYear();
  let thisMonth = today.getMonth() + 1;

  const [firstPostAniversal, setFirstPostAniversal] = useState({
    aniverse: thisYear,
    month: thisMonth
  })
  const [firstPreAniversal, setFirstPreAniversal] = useState({
    aniverse: thisYear - 1,
    month: thisMonth
  })
  const [showPreciseView, setShowPreciseView] = useState(true)

  let keywordGrapetrim = props.location.state.detail
  keywordGrapetrim = keywordGrapetrim.replace(/(\s*)/g, "")

  const content = {
    searchContent: keywordGrapetrim,
    postAniversal: firstPostAniversal.aniverse,
    postMonth: firstPostAniversal.month,
    preAniversal: firstPreAniversal.aniverse,
    preMonth: firstPreAniversal.month,
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

  //연관키워드를 불러오는 코드
  React.useEffect(() => {
    let as = '"'
    axios.post('api/clickcnt', clickContent)
    .then((response) => {
      let re = response.data[1].split("=")
      let rr = re[1].trim()
      let rrr = rr.replace(/'/g, as)
      let rrrr = rrr[1]
      let tttt = JSON.parse(rrr)
      let t2 = tttt
      let t1 = tttt[0]
      setMobileClic(t1["monthlyMobileQcCnt"])
      setPcClick(t1["monthlyPcQcCnt"])
      setCompIdx(t1["compIdx"])
      setRelKeyword(t2)
    })
    setMoreRelKeyword(false)
    
  }, [props.location.state.detail])
  
  //입력된 키워드의 검색빈도를 불러오는 코드
  React.useEffect(() => {
    fixedAniversal()
    searchingKeyword()
    setBool(props.location.state.enter)

  }, [props.location.state.detail])

  React.useEffect(() => {
    if(firstPostAniversal.aniverse == thisYear) { //포스트년도가 이번년도일 경우
      if(firstPreAniversal.aniverse >= 2016 && firstPreAniversal.aniverse <= firstPostAniversal.aniverse) {
        if(firstPostAniversal.month >= 1 && firstPostAniversal.month <= thisMonth) {
          if(firstPreAniversal.month >= 1 && firstPreAniversal.month <= 12) {
            if((firstPostAniversal.month != firstPreAniversal.month) || (firstPostAniversal.aniverse != firstPreAniversal.aniverse)) {
              return axios.post('api/search', content)
                .then((response) => {
                  if(response == null) {
                    setBool(false)
                  } else {
                    response =response.data.results[0].data
                    settingRatio(response)
                    setKeywordRatio(keywordRatio.splice(0,response.length));
                    setKeywordRatio([...keywordRatio, ...response])
                    setBool(true)
                    setShowbarBox(true)
                  }
                })
            } else {
              alert('먼저오는 년도의 월이 나중에 오는 년도의 월가 동일합니다.')
              setBool(true)
              setShowbarBox(true)
              setShowPreciseView(true);
            }
          } else {
            alert('먼저오는 기간의 월이 적합하지 않습니다')
            setBool(true)
            setShowbarBox(true)
            setShowPreciseView(true);
          }
        } else {
          alert('나중에오는 기간의 월이 적합하지 않습니다')
          setBool(true)
          setShowbarBox(true)
          setShowPreciseView(true);
        }
      } else {
        alert('먼저오는 기간의 년도가 적절하지 않습니다.')
        setBool(true)
        setShowbarBox(true)
        setShowPreciseView(true);
      }
    } else { //포스트년도가 이번년도가 아닌 경우
      if(firstPostAniversal.aniverse >= 2016 && firstPostAniversal.aniverse <= thisYear) {
        if(firstPreAniversal.aniverse >= 2016 && firstPreAniversal.aniverse <= firstPostAniversal.aniverse) {
          if(firstPostAniversal.month >= 1 && firstPostAniversal.month <= 12) {
            if(firstPreAniversal.month >= 1 && firstPreAniversal.month <= 12) {
              if((firstPostAniversal.month != firstPreAniversal.month) || (firstPostAniversal.aniverse != firstPreAniversal.aniverse) ) {
                return axios.post('api/search', content)
                .then((response) => {
                  if(response == null) {
                    setBool(false)
                  } else {
                    response =response.data.results[0].data
                    settingRatio(response)
                    setKeywordRatio(keywordRatio.splice(0,response.length));
                    setKeywordRatio([...keywordRatio, ...response])
                    setBool(true)
                    setShowbarBox(true)
                  }
                })
              } else {
                alert('먼저 오는 년도의 월과 나중에 오는 월의 년도가 동일합니다.')
                setBool(true)
                setShowbarBox(true)
                setShowPreciseView(true);                
              }
            } else {
              alert('먼저 오는 월이 적합하지 않습니다')
              setBool(true)
              setShowbarBox(true)
              setShowPreciseView(true);
            }
          } else {
            alert('나중에 오는 월이 적합하지 않습니다')
            setBool(true)
            setShowbarBox(true)
            setShowPreciseView(true);
          }
        } else {
          alert('먼저오는 기간의 년도가 적절하지 않습니다.')
          setBool(true)
          setShowbarBox(true)
          setShowPreciseView(true);
        }
      } else {
        alert('나중에 오는 기간의 년도가 적절하지 않습니다')
        setBool(true)
        setShowbarBox(true)
        setShowPreciseView(true);
      }
    }
  }, [showPreciseView])

  const settingRatio = (response) => {
    let temparr1 = [];
    let temparr2 = [];
    for(let i = 0; i < response.length; i++) {
      temparr1.push(response[i].period)
      temparr2.push(response[i].ratio)
    }
    setDataLabel([...temparr1])
    setDataValue([...temparr2])
  }
  
  const searchingKeyword = () => {
    return axios.post('api/search', content)
    .then((response) => {
      if(response == null) {
        setBool(false)
        //null일때는 안보이게
      } else {
        console.log(response)
        response = response.data.results[0].data
        if(response.length == 0) {
          setShowbarBox(false)
          setBool(true)
          } else {
            settingRatio(response)
            setKeywordRatio(keywordRatio.splice(0,response.length));
            setKeywordRatio([...keywordRatio, ...response])
            setBool(true)
            setShowbarBox(true)
            setShowPreciseView(true)
          }
        }
      } 
    )
  }

  const fixedAniversal = () => {
    let today = new Date()
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth() + 1;
    setFirstPostAniversal({
      aniverse: thisYear,
      month: thisMonth
    })
    setFirstPreAniversal({
      aniverse: thisYear - 1,
      month: thisMonth
    })
  }

  const moreRellKeyword = () => {
    setMoreRelKeyword(true)
  }

  const preAniversalChange = (e) => {
    setFirstPreAniversal({
      aniverse: e.target.value,
      month: firstPreAniversal.month
    }) 
  }

  const preMonthChange = (e) => {
    setFirstPreAniversal({
      aniverse: firstPreAniversal.aniverse,
      month: e.target.value
    })
  }

  const postAniversalChange = (e) => {
    setFirstPostAniversal({
      aniverse: e.target.value,
      month: firstPostAniversal.month
    })
  }

  const postMonthChange = (e) => {
    setFirstPostAniversal({
      aniverse: firstPostAniversal.aniverse,
      month: e.target.value
    })
  }

  const hereBar = () => {
    return (
      <div className="searchContent">
        {
          bool ? 
          <div className="naverKeywordBox">
            <div className="naverTrendContentBox">
            <div>
              <span className="clickMore"  style={{fontWeight:'bolder', fontSize:18, color:'black'}}>
                관련키워드
              </span>
              <div className="relatedKeywordBox">
                {
                  <RelKeywordPage rela = {relKeyword} showMore = {moreRelKeyword}/>
                }
              </div>
              <span onClick={moreRellKeyword} style={{fontWeight:'bolder', fontSize:16, color:'black'}}>
                관련키워드 더보기
              </span>
            </div>

            <div style={{paddingTop: 40, paddingLeft:0}}>
              <span className="clickMore"  style={{fontWeight:'bolder', fontSize:18, color:'black'}}>
                검색한 키워드
              </span>
              <HistoryKeyword keyWrite={props.location.state.detail}/>
            </div>

            <div style={{paddingTop: 40, paddingLeft:0}}>
              <span className="clickMore"  style={{fontWeight:'bolder',   fontSize:18, color:'black', paddingBottom:4,  display:'block', paddingLeft: 0}}>
                분석 결과
              </span>
              <div style={{paddingBottom: 0, paddingLeft:0}}>
                  <div style={{display:'flex'}}>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h1 style={{fontWeight: 'lighter'}}>총합 검색량</h1>
                      <span>{mobileClic + pcClick}</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h3 style={{fontWeight: 'lighter'}}>PC 검색량</h3>
                      <span>{pcClick}</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h3 style={{fontWeight: 'lighter'}}>모바일 검색량</h3>
                      <span>{mobileClic}</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h3 style={{fontWeight: 'lighter'}}>상품 경쟁률</h3>
                      <span>{compIdx}</span>
                    </div>
                </div>
              </div>
            </div>
                {
                  showPreciseView ?//정밀 결과버튼을 눌렀을 때 보이지 않기
                  <div className="showAniversalBox">
                  <div style={{display:'flex'}}>
                    <div style={{ display:'flex',   justifyContent:'center',  alignItems:'flex-start',
                    paddingTop: 13
                  }}>
                      <h3 style={{fontWeight:'normal'}}>기간</h3>
                    </div>
                    <div style={{paddingLeft:10, paddingTop:0}}>
                      <div style={{padding:10, paddingLeft: 0}}>
                        <div style={{display:'flex', width: 400}}>
                      <input 
                        className="showAniversalBox__inBox_input" 
                        value={firstPreAniversal.aniverse}
                        onChange={preAniversalChange}
                      />
                      <input 
                        className="showAniversalBox__inBox_input" 
                        value={firstPreAniversal.month}
                        onChange={preMonthChange}
                        style={{width:50}} 
                      />
                      <span style={{display: 'flex', width: 50, marginRight: 30, justifyContent:'center', alignItems:'flex-start', fontWeight:'normal', fontSize:24}}>부터</span>
                    </div>
                        <div style={{display:'flex', width: 400}}>
                      <input 
                        className="showAniversalBox__inBox_input" 
                        value={firstPostAniversal.aniverse}
                        onChange={postAniversalChange}
                      />
                      <input
                        className="showAniversalBox__inBox_input" 
                        value={firstPostAniversal.month}  
                        onChange={postMonthChange}
                        style={{width:50}}
                      />
                      <span style={{display: 'flex', width: 50, marginRight: 30, justifyContent:'center', alignItems:'flex-start', fontWeight:'normal', fontSize:24}}>까지</span>
                    </div>
                      </div>
                    <div> 
                  </div>
                    </div>
                  </div>
                  <div className="showAniversalBox__gender">
                    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', paddingTop:10, paddingBottom: 10}}>
                      <h3 style={{fontWeight:'normal'}}>성별</h3>
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
                      <h3 style={{fontWeight:'normal'}}>연령</h3>
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
                  :
                  <div></div>
                }
                <div style={{marginTop:10}}>
                  {
                    showPreciseView ? //정밀 결과버튼을 눌렀을 때 버튼변경
                    <button 
                    style={{
                      padding: 10, 
                      color: 'rgba(0,0,0,0.8)',
                      fontSize:20,
                      fontWeight:'bold',
                      border: 'none',
                      borderRadius: 10,
                      backgroundColor:'white'
                    }}
                    onClick={() => {
                      setShowPreciseView(false)
                    }}
                    >
                      정밀결과 확인하기
                  </button>
                    :
                    <button 
                    style={{
                      padding: 10, 
                      color: 'rgba(0,0,0,0.8)',
                      fontSize:20,
                      fontWeight:'bold',
                      border: 'none',
                      borderRadius: 10,
                      backgroundColor:'white'
                    }}
                    onClick={() => {
                      setShowPreciseView(true)
                    }}
                    >
                      정밀결과 재확인 하기
                  </button>
                  }
                  
            </div>
                {
                  showPreciseView ? //정밀 결과버튼을 눌렀을 때 그래프 결과 나오기
                  <div></div>
                    :
                    <>
                  <Line 
                    data={{
                      labels: [...dataLabel],
                      datasets:[
                        {
                          label:'',
                          data: [...dataValue],
                          backgroundColor: 'rgba(0, 8, 255, 0.2)'
                        }
                      ],
                    }}
                  />
                  <p style={{fontSize:18, paddingBottom:4}}>검색량이 충분하지 않을 시 원하는 날짜까지 나오지 않을 수 있습니다.</p>
                  <p style={{fontSize:18}}>그래프가 일직선으로 연결되어 있다면 나타난 월을 제외한 남은 날들은 검색 수가 없습니다.</p>
                  </>
                }
              </div>
            </div>
          :
          <div>
            <p>waiting</p>
          </div>
        }
    </div>
    )
  }

  const noBar = () => {
    return (
      <div className="searchContent">
        {
          bool ? 
          <div className="naverKeywordBox">
            <div className="naverTrendContentBox">
            <div>
              <span className="clickMore"  style={{fontWeight:'bolder', fontSize:16, color:'black'}}>
                관련키워드
              </span>
              <div className="relatedKeywordBox">
                {
                  <RelKeywordPage rela = {relKeyword} showMore = {moreRelKeyword}/>
                }
              </div>
              <span onClick={moreRellKeyword} style={{fontWeight:'bolder', fontSize:16, color:'black'}}>
                관련키워드 더보기
              </span>
            </div>
            <div style={{padding: 10, paddingLeft: 0}}>
                <div style={{padding: 20, paddingLeft:0}}>
                  <div style={{display:'flex', }}>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h1 style={{fontWeight: 'lighter'}}>총합 검색량</h1>
                      <span>{mobileClic + pcClick}</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h3 style={{fontWeight: 'lighter'}}>PC 검색량</h3>
                      <span>{pcClick}</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h3 style={{fontWeight: 'lighter'}}>모바일 검색량</h3>
                      <span>{mobileClic}</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', paddingBottom: 20, paddingTop:10, marginRight: 20}}>
                      <h3 style={{fontWeight: 'lighter'}}>상품 경쟁률</h3>
                      <span>{compIdx}</span>
                    </div>
                </div>
              </div>
              </div>
                <div>
                  <h1>해당 키워드에 대한 그래프값을 제공할 수 없습니다.</h1>
                  <p>다른 키워드나 해당 키워드를 나눠 검색해주세요</p>
                </div>
              </div>
              </div>
          :
          <div>
            <p>waiting</p>
          </div>
        }
    </div>
    )
  }

    return (
      showbarBox ? hereBar() : noBar()
    )
  }

export default withRouter(SearchContent)
