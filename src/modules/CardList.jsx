import React, { useContext } from 'react'
import Context from '../context/Context';
import CreateCard from './CreateCard';
import Card from './Card';

function CardList() {
  const { cards } = useContext(Context);

  return (
    <>
    <h1>Card Menu</h1>
    <div className="card-list">
      <CreateCard />
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
    </>
  )
}

export default CardList;