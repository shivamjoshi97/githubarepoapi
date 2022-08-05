import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/Card';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/details/:username' element={<Card></Card>}></Route>
      </Routes>
    </>
  );
}

export default App;
