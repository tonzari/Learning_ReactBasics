import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';

function App() {

  // state
  const [allHouses, setAllHouses] = useState([]);

  //load data. This runs one time, when the component is first loaded
  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("/houses.json");
      const houses = await response.json();
      setAllHouses(houses);
    }
    fetchHouses();
  }, [])

  // Why use useMemo()? I still don't undestand the benefit or necessity of useMemo() here. Study up on useMemo!
  // Possible Answer: we want to 'remember' the value of featuredHouse. useMemo() will cache this value.
  // useMemo() will assign either the value returned from the function to the variable,
  // ...or a previously assigned value.
  // If our App component is re-rendered due to outside conditions that don't pertain to the featuredHouse,
  // ...useMemo() will just grab the cached version (so a random new house won't be selected)
 
  let featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses])


  // same feature, but an approach without react hooks
  // let featuredHouse = {};

  // if (allHouses.length) {
  //     const randomIndex = Math.floor(Math.random() * allHouses.length);
  //     featuredHouse = allHouses[randomIndex];
  //   }
  
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
