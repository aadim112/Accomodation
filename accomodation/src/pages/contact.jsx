import React from 'react'
import './static/contact.css'
import { Link } from 'react-router-dom'

const contact = () => {
  return (
    <>
    <div className='header'>
      <Link to='/'><div className='revert'></div></Link>
      <p className="logo">SetOne</p>
    </div>
    </>
  )
}

export default contact