import React, { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import { v4 as uuidv4 } from 'uuid';

function CreateCardModal({ open, setIsOpen }) {
  const { cards, addCard } = useContext(Context);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImg, setNewImg] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [imgPreview, setImgPreview] = useState(null);
  
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      setNewImg(img);
      setImgPreview(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setDragCounter(0);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      setNewImg(img);
      setImgPreview(URL.createObjectURL(file));
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragCounter(dragCounter - 1);
    if (dragCounter === 0) {
      setDragging(false);
    }
  };

  const newCard = () => {
    if (!newTitle) {
      return 
    }
    const newCardObj = {
      title: newTitle,
      desc: newDesc,
      img: newImg,
      id: uuidv4(),
      key: uuidv4()
    };
    addCard(newCardObj);
    setImgPreview(null);
    setNewTitle("");
    setNewDesc("");
    setNewImg(null);
    setIsOpen(false)
  };

  if (open) {
    return (
      <div
        className={`create-card-modal-overlay ${open ? "show" : ""}`}
        onClick={(e) => {setIsOpen(false); e.stopPropagation()}}
      >
        <div 
          className={`create-card-modal ${dragging ? "dragging" : ""}`} 
          onClick={(e) => e.stopPropagation()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={() => setDragCounter(dragCounter + 1)}
          onDragLeave={handleDragLeave}
        >
          <div className="create-card-modal-cont">
          <div className="create-card-modal-img-input">
            {imgPreview ? (
              <img src={imgPreview} alt="Selected image" className="selected-img"/>
            ) : (
              <>
              <input type="file" onChange={handleImgChange} />
              <h3>Introduce your image here</h3>
              </>
            )}
          </div>
            <div className="create-card-modal-text-input">
              <input
                placeholder="Card Name"
                className="create-card-modal-title"
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <textarea
                placeholder="Card Description"
                className="create-card-modal-desc"
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="create-card-save" onClick={newCard}>
          Create Card
        </button>
      </div>
    );
  } else return null;
}

export default CreateCardModal;
