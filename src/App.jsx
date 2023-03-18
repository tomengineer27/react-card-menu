import { useContext } from 'react';
import Context from './context/Context';
import CreateCard from './modules/CreateCard';
import CardList from './modules/CardList';

function App() {
  return (
    <>
      <CardList />
      {/* <CardModal /> */}
    </>
  );
}

export default App;