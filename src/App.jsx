import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Congrasulation from './component/Congrasulation';
import Story from './component/Story_Page/Story';
import Tournament from './component/tournament/Tournament';
import Quiz from './component/Quize/Quiz';
import Navbar from './component/Navbar';
import Stories from './component/tournament/Stories';
import Rules from './component/Rules/Rules';
import Questions from './component/Questions/Questions';
import QuizAnalysis from './component/Questions/QuizAnalysis';
import Game from './component/tournament/Game';
import { Provider } from 'react-redux';
import store from './component/Redux/store';

function App() {
  return (
    <div className='container-game'>
      <Provider store={store}>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Quiz></Quiz>}></Route>
            <Route path='/congrasulation' element={<Congrasulation></Congrasulation>}></Route>
            <Route path='/tournament' element={<Tournament></Tournament>}></Route>
            <Route path='/story/:vCatId' element={<Story></Story>}></Route>
            <Route path='/stories' element={<Stories></Stories>}></Route>
            <Route path="/rule/:id" element={<Rules></Rules>}></Route>
            <Route path='/questions/:id' element={<Questions></Questions>}></Route>
            <Route path='/quiz-analysis' element={<QuizAnalysis></QuizAnalysis>}></Route>
            <Route path='/game' element={<Game></Game>}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
