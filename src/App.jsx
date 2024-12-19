import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Navbar />
          <Routes>
            <Route path='/' element={<Quiz />} />
            <Route path='/congrasulation' element={<Congrasulation />} />
            <Route path='/tournament' element={<Tournament />} />
            <Route path='/story' element={<Story />} />
            <Route path='/stories' element={<Stories />} />
            <Route path='/rule/:id' element={<Rules />} />
            <Route path='/questions/:id' element={<Questions />} />
            <Route path='/quiz-analysis' element={<QuizAnalysis />} />
            <Route path='/game' element={<Game />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
