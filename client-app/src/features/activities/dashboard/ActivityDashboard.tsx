import React from 'react';
import {Grid,List} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';

interface Props {
    dashboard: Activity[];
}

export default function ActivityDashboard({dashboard}: Props){
    return(
        <Grid >
            <Grid.Column width='10'>
                <ActivityList dashboard={dashboard} />
            </Grid.Column>
            <Grid.Column width={6}>
                    <ActivityDetails dashboard={dashboard[0]} />
            </Grid.Column>
        </Grid>
    )
}