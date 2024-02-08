import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//---

import {Auth} from './pages/auth/index';
import {ExpenseTracker} from './pages/expense_tracker/index';

//------------------------------------------------

function App() {
  return (
    <div className="App">

      <Router>

        <Routes>

          <Route exact path="/" element={<Auth />} />
          <Route exact path="expense_tracker" element={<ExpenseTracker />} />

        </Routes>

      </Router>

    </div>
  );
}

//------------------------------------------------

export default App;
