import React from 'react';
import TrainTrajectory from './trajet';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Choix from './liste/choix';
import BasicTable from './liste/table';
import Trajet from './trajet';
function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Choix />} />
        <Route path="/table" element={<Choix clas={<BasicTable  />} />} />
        <Route path='/map' element={<Trajet />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
