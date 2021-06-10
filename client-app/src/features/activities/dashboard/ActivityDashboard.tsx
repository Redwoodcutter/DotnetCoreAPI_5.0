import React from 'react';
import {Grid} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    dashboard: Activity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({dashboard,deleteActivity,submitting}: Props){
    const {activityStore} = useStore();
    const {SelectedActivity,editMode} = activityStore;
    return(
        <Grid >
            <Grid.Column width='10'>
                <ActivityList dashboard={dashboard}
                        deleteActivity={deleteActivity}
                        submitting={submitting}
                        />
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