import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { v4 as uuidv4 } from "uuid";

function EditCardModal({ isOpen, props, setIsOpen }) {
  const { cards, replaceCard, deleteCard } = useContext(Context);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDesc, setNewDesc] = useState(props.desc);
  const [newImg, setNewImg] = useState(props.img);
  const [imgPreview, setImgPreview] = useState(null);
  const [dragging, setDragging] = useState(null)

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

  const saveChanges = () => {
    const newCardObj = {
      title: newTitle,
      desc: newDesc,
      img: newImg,
      id: props.id,
    };
    replaceCard(props.id, newCardObj);
    setImgPreview(null);
  };

  const handleNewTitle = e=>{
    setNewTitle("")
    setNewTitle(e.target.value)
  }

  const handleNewDesc = e=>{
    setNewDesc("")
    setNewDesc(e.target.value)
  }

  return (
    <div
      className={`edit-card-modal-overlay ${isOpen ? "show" : ""}`}
      onClick={(e) => {
        setIsOpen(false);
        e.stopPropagation();
      }}
    >
      <div className="edit-card-modal" onClick={(e) => e.stopPropagation()}>
      <div
          className="edit-card-cont"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="edit-card-img">
            <input
              type="file"
              onChange={handleImgChange}
              className="edit-card-file-input"
            />
            {imgPreview ? (
              <img src={imgPreview} alt="Selected image" className="selected-img"/>
            ) : (
              <img src={props.img?.src}></img>
            )}
          </div>
          <div className="edit-card-content">
            <input
              type="text"
              className="edit-card-title"
              placeholder={`Title: ${props.title}`}
              onChange={handleNewTitle}
            />
            <textarea
              className="edit-card-desc"
              placeholder={`Description: ${props.desc}`}
              onChange={handleNewDesc}
            />
          </div>
        </div>
      </div>
      <button
        className="edit-card-delete"
        onClick={() => deleteCard(props.id)}
      >
        Delete Card
      </button>
      <button className="create-card-save" onClick={saveChanges}>
        Save
      </button>
    </div>
  );
}

export default EditCardModal;
