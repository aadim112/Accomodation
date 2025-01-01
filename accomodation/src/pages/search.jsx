import React from 'react';
import './static/search.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import LoadingSearch from './loadingSearch';
import { useState, useEffect } from 'react';

function Search() {

    const [locations,setLocations] = useState([]);
    const [loading,setLoading] = useState(true);
    const [input,setInput] = useState('');
    const handleLocation = (event) =>{
        const value = event.target.value;
        setInput(value);
    };
    const handleKeyPress = (event) =>{
        if (event.key === 'Enter' && input.trim() !== ''){
            setLocations((prevValues) => [...prevValues, input]); // Add value to the array
            setInput(""); // Clear the input field
            setLoading(false);
            console.log(locations);
        }
    };
    const deleteData = () =>{
        locations.pop(document.getElementById('loc').innerText);
        setLocations(locations); 
    };
  return (
    <>
        <div className='header'>
            <div className='left'>
                <Link to='/'><div className='revert'></div></Link>
                <p className="logo">SetOne</p>
            </div>
            <div className='right'>
                <p>Search Accomodation Here</p>
            </div>
        </div>
        <div className='utilities'>
            <div className='search-bar'>
                <input type='text' placeholder='Search' onChange={handleLocation} onKeyDown={handleKeyPress} value={input}/>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{color: "#000000",}} />
            </div>
            <div className='loc-list'>
                <div className='loc-block'>
                    {locations.map((val,index) => (
                        <div className='locations' onClick={deleteData}>
                            <p id='loc'>{val}</p>
                            <div className='cross'></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {loading ? <LoadingSearch/> : <p> Results :</p>}
    </>
  )
}

export default Search