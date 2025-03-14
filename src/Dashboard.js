import React, { useState } from 'react';
import './styles/Dashboard.css';
import backgroundMusic from './assets/golden-hour-8-bit_bgmusic.mp3'; // Your background music file

// Import images and components
import calculatorImg from './assets/icons8-calculator-64.png';
import timerImg from './assets/icons8-timer-64.png';
import notesImg from './assets/icons8-notes-64.png';

import ScientificCalculator from './ScientificCalculator';
import Timer from './Timer';
import Notes from './Notes';
import MemoryMatch from './MemoryMatch';
import QuizGame from './QuizGame';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // activeTool can be "memoryMatch", "quizGame", "calculator", "timer", "notes", or null
  const [activeTool, setActiveTool] = useState(null);

  const handleToolsClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setActiveTool(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTool(null);
  };

  const handleSelectTool = (tool) => {
    setActiveTool(tool);
  };

  return (
    <>
      {/* Background Music */}
      <audio src={backgroundMusic} autoPlay loop />
      
      <div className="dashboard">
        {/* Menu Container */}
        <div className="menu-container">
          <ul className="menu">
            <li>
              <a href="#" onClick={() => setActiveTool("memoryMatch")}>
                Start
              </a>
            </li>
            <li>
              <a href="#" onClick={handleToolsClick}>
                Tools
              </a>
            </li>
          </ul>
        </div>

        {/* Toolbar Modal */}
        {isModalOpen && !activeTool && (
          <div className="toolbar-modal">
            <div className="toolbar-content">
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
              <h2>Tools</h2>
              <div className="tool-icons">
                <button onClick={() => handleSelectTool('calculator')}>
                  <img src={calculatorImg} alt="Calculator" />
                </button>
                <button onClick={() => handleSelectTool('timer')}>
                  <img src={timerImg} alt="Timer" />
                </button>
                <button onClick={() => handleSelectTool('notes')}>
                  <img src={notesImg} alt="Notes" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render the active tool */}
        {activeTool === 'memoryMatch' && (
          <div className="tool-component">
            <MemoryMatch onContinue={() => setActiveTool("quizGame")} />
          </div>
        )}
        {activeTool === 'quizGame' && (
          <div className="tool-component">
            <QuizGame />
          </div>
        )}
        {activeTool === 'calculator' && (
          <div className="tool-component">
            <ScientificCalculator onBack={() => setActiveTool(null)} />
          </div>
        )}
        {activeTool === 'timer' && (
          <div className="tool-component">
            <Timer onBack={() => setActiveTool(null)} />
          </div>
        )}
        {activeTool === 'notes' && (
          <div className="tool-component">
            <Notes onBack={() => setActiveTool(null)} />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
