import React from 'react';
import {Grid,List} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    dashboard: Activity[];
}

export default function ActivityDashboard({dashboard}: Props){
    return(
        <Grid >
            <Grid.Column width='10'>
                <List>
                    {dashboard.map(dashboard => (
                        <List.Item key={dashboard.id}>
                        {dashboard.title}
                        </List.Item>
                    ) )}
            </List>
            </Grid.Column>
        </Grid>
    )
}