import React from 'react';
import {Grid,List} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';

interface Props {
    dashboard: Activity[];
}

export default function ActivityDashboard({dashboard}: Props){
    return(
        <Grid >
            <Grid.Column width='10'>
                <ActivityList dashboard={dashboard} />
            </Grid.Column>
        </Grid>
    )
}