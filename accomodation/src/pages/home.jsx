import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './static/home.css';
import { GoogleLogin, googleLogout,useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'

const Home = () => {
  const [user,setUser] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [AuthStatus,setAuthStatus] = useState(false);
  var property = 'none';

  if(AuthStatus){
    property= ' block';  
  }
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                      console.log(profile)
                      setAuthStatus(true);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setAuthStatus(false);
};
  return (
    <div className="App">
      <header className="App-header">
        <p className="logo">SetOne</p>
        <div className="options">
          <p className="opt">Home</p>
          <Link to='/search'><p className="opt">Search</p></Link>
          <Link to='/upload'><p className="opt">Upload</p></Link>
          <Link to='/contact'><p className="opt">Contact</p></Link>
          {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className='google-login'/> */}
          {AuthStatus ? <button className='login-logout' onClick={logOut} role='button' value={'logout'}>Logout</button> : <button role='button' className='login-logout' onClick={login} value={'Login'}>Login</button> }
          <div className="profilepic" style={{display:property}}>
            {/* <img src={profile.picture} style={{width:'100%',height:'100%',borderRadius:'50%'}}/>   */}
            {AuthStatus && <img src={profile.picture} alt="Profile" style={{width:'100%',height:'100%',borderRadius:'50%'}} />}
          </div>
        </div>
      </header>
      <div className="hero-section">
        <div className="info-section">
          <p className="hero-title">Best Place for Students to search for Accomodation</p>
          <p className="hero-info">Get the Information about your Accomodation without visiting.
          This is the platform for students to find Accomodation easily and get the information with ease.
          </p>
          <p className="hero-info">Search on the basis of the basis of the institue to get the nearby properties.</p>

          <div className="black-band">
            <div className="band-head">
              <p className="band-title">Get Information Like</p>
            </div>
            <div className="band-info">
              <div className="room-dimension"><div className="part1">Room dimensions</div><div className="part2"><p>1RK</p><p>1BHK</p><p>2BHK</p></div></div>
              <div className="room-dimension"><div className="part1">Parking Space</div><div className="part2"><p>1RK</p><p>1BHK</p><p>2BHK</p></div></div>
              <div className="room-dimension"><div className="part1">Rent</div><div className="part2"><p>1RK</p><p>1BHK</p><p>2BHK</p></div></div>
            </div>
          </div>

          <div></div>
        </div>

        <div className="hero-options">
          <div className="bavarchi">
            <p className="bavarchi-title">Search For Bavarchi or Personal Chef</p>
            <div className="bavarchi-but">Search</div></div>
          
          <div className="card1">
            <div className="card2">
              <p className="card2-info">Find Your Desired Stay Place With...</p>
              <div className="room-size">
                <p>1RK</p>
                <p>1BHK</p>
                <p>2BHK</p>
                <p>3BHK</p>
              </div>
              <div className="facilities">
                <p className="fac-dark">Facilities</p>
                <div className="fac-item">
                  <p>Bathroom</p>
                  <p>Internet</p>
                  <p>etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="designer-block">
        <div className="designer-container">

        </div>
      </div>
      <div className="seach">

      </div>
    </div>
  )
}

export default Home