import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';

function App() {

  // state
  const [allHouses, setAllHouses] = useState([]);

  //load data
  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("/houses.json");
      const houses = await response.json();
      setAllHouses(houses);
    }
    fetchHouses();
  }, [])

  let featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses])
  
  return (
    <BrowserRouter>
      <div className='container'>
        <Header subtitle="Providing houses all over the world"/>
        <Routes>
          <Route path='/' element={<FeaturedHouse house={featuredHouse}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
