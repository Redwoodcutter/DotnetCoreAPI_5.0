import React from 'react';
import {Grid} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    dashboard: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id:string)=> void;
    closeForm: () => void;
    createOrEdit : (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({dashboard,selectedActivity,selectActivity,cancelSelectActivity,
editMode,openForm,closeForm,createOrEdit,deleteActivity,submitting}: Props){
    return(
        <Grid >
            <Grid.Column width='10'>
                <ActivityList dashboard={dashboard}
                        selectActivity={selectActivity} 
                        deleteActivity={deleteActivity}
                        submitting={submitting}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                            {selectedActivity && !editMode &&
                            <ActivityDetails 
                            dashboard={selectedActivity} 
                            cancelSelectActivity={cancelSelectActivity} 
                            openForm={openForm}
                    />}
                {editMode &&
                <ActivityForm 
                    closeForm={closeForm} 
                    dashboard={selectedActivity} 
                    createOrEdit={createOrEdit} 
                    submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    )
}