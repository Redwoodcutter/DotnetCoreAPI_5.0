import React, { useEffect, useState } from 'react';
import './styles.css';
import { Container  } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './navbar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';



function App() {

  const {activityStore} = useStore();

  const [dashboard, setDashboard] = useState<Activity[]> ([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

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
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setDashboard([...dashboard.filter(x=>x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setDashboard([...dashboard, activity]); 
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setDashboard([...dashboard.filter(x=>x.id !==id)])
      setSubmitting(false);
    })
   
  }
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
  return (
    <>
     <Navbar openForm={handleFormOpen} />
     <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          dashboard={activityStore.activities}
          selectedActivity={SelectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
     </Container>
       
    </>
  );
}

export default observer(App);
