import React, { useEffect } from 'react';
import {Grid} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function ActivityDashboard(){
    const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    const {SelectedActivity,editMode} = activityStore;
    return(
        <Grid >
            <Grid.Column width='10'>
                <ActivityList />
                    </Grid.Column>
                    <Grid.Column width={6}>
                            {!editMode && SelectedActivity &&
                            <ActivityDetails />}
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})