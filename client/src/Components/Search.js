import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import '../Css/search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Search(props) {

  const [search, setSearch] = useState("")
  
  const changeSearch = (e) => {
    let arrr = `${e.target.value}`.trim()
    arrr = arrr.replace(/(\s*)/g, "")
    setSearch(arrr)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    props.history.push({
      pathname: '/search',
      state: {
        detail: search,
        enter: false
      }
    })
  } 

  return (
    <div>
      <div className="searchHome">
        <div style={{ display:'flex'}}>
          <div className="searchIcon">
            <FontAwesomeIcon  icon={faSearch} />
          </div>
          <form onSubmit={onSubmit}>  
            <input 
            onChange={changeSearch} 
            className="searchForm" 
            type="search" 
            placeholder="키워드를 입력해주세요"
            />
          </form>
        </div>
        
      </div>
    </div>
    
  )
}

export default withRouter(Search)
