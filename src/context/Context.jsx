import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [cards, setCards] = useState([
  ]);

  const addCard = (newCardObj) => {
    setCards([...cards, newCardObj]);
  };

  const deleteCard = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  const replaceCard = (oldId, newCardObj) => {
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.id === oldId) {
          return {
            ...card,
            title: newCardObj.title,
            desc: newCardObj.desc,
            img: newCardObj.img,
            id: uuidv4()
          };
        } else {
          return card;
        }
      });
    });
  };

  return (
    <Context.Provider value={{cards, addCard, replaceCard, deleteCard }}>
      {children}
    </Context.Provider>
  );
};

export default Context;