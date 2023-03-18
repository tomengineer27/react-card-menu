import React, { useState } from "react";
import CreateCardModal from "./CreateCardModal";

function CreateCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="create-card" onClick={e=>setIsOpen(true)}>
      <h1>+</h1>
      <h3>New Card</h3>
      <CreateCardModal open={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
}

export default CreateCard;