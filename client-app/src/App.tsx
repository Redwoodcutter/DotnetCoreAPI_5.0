import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



function App() {
  const [dashboard, setDashboard] = useState ([]);

  useEffect(() => {
    axios.get ('http://localhost:5000/api/dashboard').then(response => {
      console.log(response);
      setDashboard(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {dashboard.map((dashboard: any) => (
            <li key={dashboard.id}>
              {dashboard.title}
            </li>
          ) )}
        </ul>
      </header>
    </div>
  );
}

export default App;
