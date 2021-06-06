import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container  } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './navbar';



function App() {
  const [dashboard, setDashboard] = useState<Activity[]> ([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]> ('http://localhost:5000/api/dashboard').then(response => {
      console.log(response);
      setDashboard(response.data);
    })
  }, [])

  function handleSelectActivity(id: string){
    setSelectedActivity(dashboard.find( x => x.id === id ))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }

  return (
    <>
     <Navbar openForm={handleFormOpen} />
     <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          dashboard={dashboard}
          selectedActivity={SelectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
     </Container>
       
    </>
  );
}

export default App;
