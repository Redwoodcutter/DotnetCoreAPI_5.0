import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


interface Props {
    dashboard: Activity
}

export default function ActivityListItem({ dashboard }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore
    const [target, setTarget] = useState('');
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Item key={dashboard.id}>
            <Item.Content>
                <Item.Header as='a'>{dashboard.title}</Item.Header>
                <Item.Meta>{dashboard.date}</Item.Meta>
                <Item.Description>
                    <div>{dashboard.description}</div>
                    <div>{dashboard.category}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/activities/${dashboard.id}`} floated='right' content='view' color='blue'></Button>
                    <Button
                        name={dashboard.id}
                        loading={loading && target === dashboard.id}
                        onClick={(e) => handleActivityDelete(e, dashboard.id)}
                        floated='right'
                        content='Delete'
                        color='red'></Button>
                    <Label basic content={dashboard.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}