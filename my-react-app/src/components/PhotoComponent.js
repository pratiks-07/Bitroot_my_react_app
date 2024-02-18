import React, { useEffect, useState } from 'react'
import '../../src/components/photo.css'
import NestedModal from './Popupphotos';

const PhotoComponent = () => {
const [data,setdata]=useState([]);
const [dates,setdate]=useState('');
//const [props,setprops]=useState(false)
const [selectedItem, setSelectedItem] = useState(null);
useEffect(()=>{
    fetchData();
},[])
const [popup,setpopup]=useState(false)
const fetchData=async ()=>{
    try{
        const response=await fetch('db.json');
        const jsonData=await response.json();
        setdata(jsonData);
        const dates = jsonData.map(item => {
          const unixdate = item.date * 1000;
          const date = new Date(unixdate);
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const year = date.getFullYear();
          const month = monthNames[date.getMonth()];
          const day = ('0' + date.getDate()).slice(-2);
          return `${month} ${day},${year}`;
        });
    
        setdate(dates);
     
        
    }catch(error){
        console.log(error);
    }
}
const handleClickLearn = (index) => {
  setSelectedItem(data[index]);
  setpopup(true);
}
const handleClosePopup = () => {
  setpopup(false);
}


  return (
    <>
    <div className="container">
      {popup&&<NestedModal item={selectedItem} handleClosePopup={handleClosePopup} />}
        <div className="image-container">
          {data.map((item, index) => (
            <div key={index} className="image-card" onClick={()=>handleClickLearn(index)}>
              <img src={item.thumbnail.large} alt={`Image ${index + 1}`} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <span id='name' >{item.author.name}: {item.author.role}</span>
                <span className='date'  id={index}>{dates[index]}</span>
              </div>
            <div className='learn-more-overlay' onClick={()=>handleClickLearn(index)}>Learn More</div>
            </div>
          ))}
        </div>
      </div>
     
   </>
        )}
     


export default PhotoComponent