import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import Navbar from './navbar';



function App() {
  const [dashboard, setDashboard] = useState<Activity[]> ([]);

  useEffect(() => {
    axios.get<Activity[]> ('http://localhost:5000/api/dashboard').then(response => {
      console.log(response);
      setDashboard(response.data);
    })
  }, [])

  return (
    <div>
     <Navbar></Navbar>
        <List>
          {dashboard.map(dashboard => (
            <List.Item key={dashboard.id}>
              {dashboard.title}
            </List.Item>
          ) )}
        </List>
    </div>
  );
}

export default App;
