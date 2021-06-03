import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
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
    <>
     <Navbar/>
     <Container style={{marginTop:'7em'}}>
        <ActivityDashboard dashboard={dashboard}/>
     </Container>
       
    </>
  );
}

export default App;
