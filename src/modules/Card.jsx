import React, {useState} from 'react';
import EditCardModal from './EditCardModal';

function Card({ title, desc, img, id }) {
  const [isOpen, setIsOpen] = useState(false)

  const openCardEditor = ()=>{
    setIsOpen(true)
  }

  return (
    <div 
      className="card" 
      onClick={(openCardEditor)}
    >
      <div className='card-cont' >
        <div className='card-img-div'>
          <img src={img?.src} className="card-img" alt="NO IMAGE SELECTED" />
        </div>
        <div className='card-content'>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
      <EditCardModal isOpen={isOpen} setIsOpen={setIsOpen} props={{img, title, desc, id}}/>
    </div>
  );
}

export default Card;