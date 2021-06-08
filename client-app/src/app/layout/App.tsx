import React, { useEffect, useState } from 'react';
import './styles.css';
import { Container  } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './navbar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';



function App() {
  const [dashboard, setDashboard] = useState<Activity[]> ([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[]=[];
      response.forEach(activity =>{
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setDashboard(response);
      setLoading(false);
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
  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
    ? setDashboard([...dashboard.filter(x=> x.id !== activity.id), activity])
    : setDashboard([...dashboard, {...activity, id: uuid()}]); 
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(id: string){
    setDashboard([...dashboard.filter(x=>x.id !==id)])
  }
  if(loading) return <LoadingComponent content='Loading app' />
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
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
     </Container>
       
    </>
  );
}

export default App;
