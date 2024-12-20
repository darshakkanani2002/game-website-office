import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
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
import store from './component/Redux/store';

function App() {
  useEffect(() => {
    // Optionally clear specific keys in sessionStorage if necessary
    sessionStorage.removeItem('specificKey');
  }, []);

  return (
    <div className='container-game'>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            {/* Define all routes */}
            <Route path="/" element={<Quiz />} />
            <Route path="/congrasulation" element={<Congrasulation />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/story" element={<Story />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/rule/:id" element={<Rules />} />
            <Route path="/questions/:id" element={<Questions />} />
            <Route path="/quiz-analysis" element={<QuizAnalysis />} />
            <Route path="/game" element={<Game />} />
            {/* Fallback route to handle undefined paths */}
            <Route path="*" element={<Navigate to="/tournament" />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
