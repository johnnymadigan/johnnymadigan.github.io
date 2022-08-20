import React, { useState, useEffect } from 'react';
import './App.css';

import Nav from './Navi/Navi';
import Hero from './Hero/Hero';
import Bio from './Bio/Bio';
import Projects from './Projects/Projects';
import Footer from './Footer/Footer';


function App() {

  /**
   * {{{{{ GET PROJECT DATA (JSON) }}}}}
   * @author johnnymadigan
   * @brief Fetch API method to consume external JSON data.
   * 
   * This data is a local repo file that comprises of project info from 
   * pure strings for descriptions etc, to file paths for images.
   * 
   * This function will be called as a side-effect upon rendering/mounting 
   * to the DOM for the first time using the 'useEffect' hook.
   * 
   * The 'useState' hook will remember/store this data and render it to the DOM
   * within components.
   */

  const [data, setData] = useState([]); // default is empty array
  
  const url = 'projects.json';

  const getData = () => {
    fetch(url, {
      headers: {
        /* headers to let client know that we
        are accessing JSON from a server */
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res) => (res.json())) /* promise to get response as JSON */
    .then((resAsJSON) => (setData(resAsJSON))) /* promise to update STATE with the JSON data */
    .then(() => (console.log("Finished fetching data")));
  }

  /* perform once upon first render */
  /* useEffect fires twice because of strict-mode (see index.js) */
  useEffect(() => {
    getData();
    console.log("Side effect fired ∴ fetching data...");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Nav color="light" fixed="top" expand="md"/>
        <Hero/>
        <Bio/>
        <Projects projects={data}/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
