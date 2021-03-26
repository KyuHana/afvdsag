import React, {useState, useRef} from 'react'
import {withRouter} from 'react-router-dom'
import '../Css/relKeywordPage.css'

function RelKeywordPage(props) {
  const key = useRef();
  let relatedKeyword = props.rela
  let relKey;
  let relatedKeyword_in = [];
  if(!props.showMore) {
    for(let i = 0; i < relatedKeyword.length; i++) {
      relKey = relatedKeyword[i]
      let rr = relKey["relKeyword"]
      if(rr.indexOf(`${relatedKeyword[0]["relKeyword"]}`) != -1) {
        relatedKeyword_in[i] = {
          rel: relKey["relKeyword"],
          key: i
        }
      }
    }
  } else if(props.showMore) {
    for(let i = 0; i < relatedKeyword.length; i++) {
      relKey = relatedKeyword[i]
      let rr = relKey["relKeyword"]
      if(rr.indexOf(`${relatedKeyword[0]["relKeyword"]}`) != 1) {
        relatedKeyword_in[i] = {
          rel: relKey["relKeyword"],
          key: i
        }
      }
    }
  }

  const moveKeyword = (rel) => {
    key.current = `${rel}`.trim()
    key.current = key.current.replace(/(\s*)/g, "")
    props.history.push({
      pathname: '/search',
      state: {
        detail: key.current,
        enter: false
      }
    })
  }

  return (
    <div style={{display:'flex', flexWrap:'wrap'}}>
      {
        relatedKeyword_in.map((item) => {
          return (
            <span className='keywordhover' key={item.key} onClick={() => {moveKeyword(item.rel)}} style={{padding: 10, paddingLeft: 0}}>{item.rel}</span>
          )
        })
      }
    </div>
  )
}

export default withRouter(RelKeywordPage)
