import React,{ useEffect, useRef , useState} from 'react'
import { Link } from 'react-router-dom'
import  './static/upload.css'
import database from '../firebase';


function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [imagedata,setImagedata] = useState([]);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    accommodationType: '',
    facilities: [],
    facilitiesnearby: [],
    mapLink: '',
    instituteNearby: '',
  });

  function embedMap() {
    const userLink = document.getElementById('mapLink').value.trim();
    const mapFrame = document.getElementById('mapFrame');

    if (userLink.includes("https://www.google.com/maps")) {
        // Extract and transform the URL into embed format
        const embedLink = userLink.replace("/maps/", "/maps/embed?pb").split("&")[0];
        mapFrame.src = embedLink;
        console.log(embedLink);
    } else {
        // Handle invalid links
        alert("Please provide a valid Google Maps link.");
        mapFrame.src = ""; // Clear the iframe
    }
}


  const handleFormClick = () => {
    fileInputRef.current.click(); // Programmatically click the file input
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // Generate preview URL
    }));
    if(files.length <  5){
      //console.log('Selected files:', selectedFiles);
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileData]);
      setImagedata(files)
      console.log('Selected data:',fileData);
    }
    else{
      alert('Chose only 5 images')
    }
  };

  const removeimages = () => {
    selectedFiles.pop(document.getElementById('Imag'));
    console.log(selectedFiles);   
  }

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,[name]: checked ? [...formData[name], value] : formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToUpload = {
      ...formData,
      'images': imagedata,
    };
    console.log(dataToUpload)
    database.ref('accommodations').push(dataToUpload)
      .then(() => {
        alert('Form data uploaded successfully!');
        setFormData({
          accommodationType: '',
          facilities: [],
          facilitiesNearby: [],
          mapLink: '',
          instituteNearby: '',
        });
        setSelectedFiles([]);
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
      });
  };


  return (
    <>
      <div className='header'>
        <div className='left'>
          <Link to='/'><div className='revert'></div></Link>
          <p className="logo">SetOne</p>
        </div>
        <div className='right'>
          <p>Upload Accomodation Details Here</p>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className='form'>
          <div className='image-upload'>
            <div className='image-container' onClick={handleFormClick}>
              <p>Click here to upload files here</p>
              <input type='file' accept='image/png' ref={fileInputRef} onChange={handleFileChange} className='uploadfile' hidden multiple></input>
            </div>
            <div className='prev-images'>
              {selectedFiles.map((file, index) => (
                <div key={index} style={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    id='imag'
                    src={file.url}
                    alt={file.name}
                    onClick={removeimages}
                    style={{ width: '100%', height: '200px ', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <p style={{ maxWidth: '300px', wordWrap: 'break-word',marginTop:'0px' }}>{file.name}</p>
                </div>
              ))}
            </div>

          </div>
            <div className='form-input'>
              <div className='room-details'>
                {/* flat type */}

                <p style={{fontFamily:'poppins', fontWeight:'bolder', marginTop:'0px',padding:'8px',backgroundColor:'#b9b9b9'}}>Accomodation Cost</p>
                <div className='acc-cost'>
                  <div className='cost-container'>
                    <p>Accomodation Rent:   </p>
                  <input type='number' className='acc-input' placeholder='Accomodation Rent' name='rent'></input>
                  <div className='cost-container'>
                    <p>Security Deposit:   </p>
                    <input type='number' className='acc-input' placeholder='Security Deposit' name='security'></input>
                  </div>
                  </div>
                </div>


                <p style={{fontFamily:'poppins', fontWeight:'bolder', marginTop:'0px',padding:'8px',backgroundColor:'#b9b9b9'}}>Type of Accomodation</p>
                <div style={{width:'100%', display:'flex',height:'30px', flexDirection:'row', gap:'30px'}}>
                  <label><input type='radio' value='1 RK' name='accommodationType' onChange={handleInputChange}></input>1 RK</label>
                  <label><input type='radio' value='1 BHK' name='accommodationType' onChange={handleInputChange}></input>1 BRK</label>
                  <label><input type='radio' value='2 BHK' name='accommodationType' onChange={handleInputChange}></input>2 BHK</label>
                  <label><input type='radio' value='3 BHK' name='accommodationType' onChange={handleInputChange}></input>3 BHK</label>
                  <label><input type='radio' value='PG' name='accommodationType' onChange={handleInputChange}></input>PG</label>
                  <label><input type='radio' value='Single Room' name='accommodationType' onChange={handleInputChange}></input>Single Room</label>
                </div>

                <p style={{fontFamily:'poppins', fontWeight:'bolder',padding:'8px',backgroundColor:'#b9b9b9'}}>Facilities</p>
                <div style={{width:'100%', display:'grid',height:'auto', gap:'20px',gridTemplateColumns:'150px auto 150px auto'}}>
                  <label><input type='checkbox' value='Invertor' name='facilities' onChange={handleInputChange}></input>Invertor</label>
                  <label><input type='checkbox' value='Washing' name='facilities' onChange={handleInputChange}></input>Washing machine</label>
                  <label><input type='checkbox' value='Heater' name='facilities' onChange={handleInputChange}></input>Heater</label>
                  <label><input type='checkbox' value='Water Filter' name='facilities' onChange={handleInputChange}></input>Water Filter</label>
                  <label><input type='checkbox' value='Internet Router' name='facilities' onChange={handleInputChange}></input>Internet Router</label>
                  <label><input type='checkbox' value='Chair and Study Table' name='facilities' onChange={handleInputChange}></input>Chair and Study Table</label>
                  <label><input type='checkbox' value='Bed' name='facilities' onChange={handleInputChange}></input>Bed</label>
                  <label><input type='checkbox' value='Balcony' name='facilities' onChange={handleInputChange}></input>Balcony</label>
                  <label><input type='checkbox' value='Wadrobe' name='facilities' onChange={handleInputChange}></input>Wadrobe</label>
                </div>

                <p style={{fontFamily:'poppins', fontWeight:'bolder',marginTop:'20px',padding:'8px',backgroundColor:'#b9b9b9'}}>Facilities Nearby</p>
                <div style={{width:'100%', display:'grid',height:'auto', gap:'20px',gridTemplateColumns:'150px auto 150px auto'}}>
                  <label><input type='checkbox' value='D-Mart' name='facilitiesnearby' onChange={handleInputChange}></input>D-Mart</label>
                  <label><input type='checkbox' value='Grocessary Store' name='facilitiesnearby' onChange={handleInputChange}></input>Grocessary Store</label>
                  <label><input type='checkbox' value='Stationary Store' name='facilitiesnearby' onChange={handleInputChange}></input>Stationary Store</label>
                  <label><input type='checkbox' value='laundry' name='facilitiesnearby' onChange={handleInputChange}></input>laundry</label>
                  <label><input type='checkbox' value='Cafe' name='facilitiesnearby' onChange={handleInputChange}></input>Cafe</label>
                  <label><input type='checkbox' value='Mess' name='facilitiesnearby' onChange={handleInputChange}></input>Mess</label>
                </div>

                <p style={{fontFamily:'poppins', fontWeight:'bolder',marginTop:'20px',marginBottom:'0px',padding:'8px',backgroundColor:'#b9b9b9'}}>Input Map Loction</p>
                <div className='map-link'>
                  <input type='text' name='mapLink' placeholder='Accomodation Location Link' id='mapLink' onChange={handleInputChange}></input>
                  <div onClick={() => { embedMap() }} style={{width:'70px',height:'15px',color:'white',fontFamily:'poppins',backgroundColor:'black',padding:'10px',marginLeft:'20px',display:'flex',alignItems:'center',justifyContent:'center', cursor:'pointer'}}>Check</div>
                </div>
                <iframe className='map-container' id='mapFrame' src=''>
                  {/* Map demonstartion here */}
                </iframe>

                <p style={{fontFamily:'poppins', fontWeight:'bolder',marginTop:'20px',marginBottom:'0px',padding:'8px',backgroundColor:'#b9b9b9'}}>Institute Nearby</p>
                <div className='map-link'>
                  <input type='text' name='instituteNearby' placeholder='Institute Name Here' onChange={handleInputChange} required='true'></input>
                  <div style={{width:'70px',height:'15px',color:'white',fontFamily:'poppins',backgroundColor:'black',padding:'10px',marginLeft:'20px',display:'flex',alignItems:'center',justifyContent:'center', cursor:'pointer',borderRadius:'20px'}}>Add</div>
                </div>

                <p style={{fontFamily:'poppins', fontWeight:'bolder',marginTop:'20px',marginBottom:'0px',padding:'8px',backgroundColor:'#b9b9b9'}}>Policies</p>
                <br></br>
                <div style={{width:'100%',display:'flex',height:'auto'}}>
                <label><input type='checkbox' required='true' defaultChecked='true'></input>I accept the Terms and Conditions by posting the information and images.</label>
                <p style={{color:'blue',textDecoration:'underline',marginTop:'0px',marginBottom:'0px',cursor:'pointer'}}>Terms & Conditions</p>
                </div>
                <br></br>
                <button type='submit' className='submit-but'>Submit</button>
              </div>
            </div>
          </div>
        </form>
      <div className='footer'></div>
    </>
  )
}

export default Upload