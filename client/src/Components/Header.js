import React from 'react';
import {withRouter} from 'react-router-dom';
import '../Css/header.css'
import { Bar } from 'react-chartjs-2'

//page
import Search from './Search';
import SearchContent from '../Components/SearchContent';


function Header(props) {
  const connecKeyword = [
    {
      id: 1,
      keywordTitle: 'asdf'
    },
    {
      id: 2,
      keywordTitle: 'as1df'
    },
    {
      id: 3,
      keywordTitle: 'a23sdf'
    },
    {
      id: 4,
      keywordTitle: 'ase3df'
    },
    {
      id: 5,
      keywordTitle: 'asd1f'
    },
    {
      id: 6,
      keywordTitle: 'a1234sdf'
    },
    {
      id: 7,
      keywordTitle: 'as443df'
    },
    {
      id: 8,
      keywordTitle: 'asd42f'
    },
    {
      id: 9,
      keywordTitle: 'as14df'
    },
    {
      id: 10,
      keywordTitle: 'asd421f'
    },
    {
      id: 11,
      keywordTitle: 'a1234sdf'
    },
    {
      id: 12,
      keywordTitle: 'as443df'
    },
    {
      id: 13,
      keywordTitle: 'asd42f'
    },
    {
      id: 14,
      keywordTitle: 'as14df'
    },
    {
      id: 15,
      keywordTitle: 'asd421f'
    },
    {
      id: 14,
      keywordTitle: 'asd42f'
    },
    {
      id: 15,
      keywordTitle: 'as14df'
    },
    {
      id: 16,
      keywordTitle: 'asd421f'
    },
  ]

  return (
    <div className="wholeBody">
      <div className="body">
        <div className="searchBox">
          <Search />
        </div>
        <div className="header">
          <p className="searchWords">{props.location.state.detail}</p>
          <p style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}> 에 대한 키워드분석</p>
        </div>
        <div>
          <SearchContent props={props} color="rgba(2,207,92, 1)" title="Naver" />
        </div>
        
      </div>
    </div>
  )
}

export default withRouter(Header)
