import React from 'react'
import './static/loading.css'

function loadingSearch() {
  return (
    <div className='search-template'>
        <div className='normal-card'>
            <div className='normal-card-above'></div>
            <div className='normal-card-bottom'></div>
        </div>
        <div className='backside-card'></div>
        <div className='normal-card'>
            <div className='normal-card-above'></div>
            <div className='normal-card-bottom'></div>
        </div>
    </div>
  )
}

export default loadingSearch