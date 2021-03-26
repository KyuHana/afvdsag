import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import Header from './Header'
import Search from './Search'
import Title from './Title';
import '../Css/main.css';

function Main(props) {
  return (
    <div className="wholeBody">
      <div className="body"> 
        <div className="mainSearch">
          <Title/>
          <div style={{marginBottom:40}}>
            <h2>키워드서치에서는 <span style={{color:'rgba(2,207,92,0.7)'}}>네이버</span>의 검색데이터를 보여줍니다</h2>
          </div>
          <div style={{width:window.screen.width, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Search />
          </div>
            
        </div>
      </div>
    </div>
    
  )
}

export default withRouter(Main)
