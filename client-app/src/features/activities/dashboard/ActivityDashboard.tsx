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

}

export default function ActivityDashboard({dashboard,selectedActivity,selectActivity,cancelSelectActivity}: Props){
    return(
        <Grid >
            <Grid.Column width='10'>
                <ActivityList dashboard={dashboard}
                selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width={6}>
                    {selectedActivity &&
                    <ActivityDetails dashboard={selectedActivity} cancelSelectActivity={cancelSelectActivity}  />}
                    <ActivityForm/>
            </Grid.Column>
        </Grid>
    )
}