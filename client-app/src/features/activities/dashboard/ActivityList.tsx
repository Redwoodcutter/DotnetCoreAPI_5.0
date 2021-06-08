import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    dashboard : Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({dashboard,selectActivity,deleteActivity,submitting}:Props){
    const [target, setTarget] = useState('');
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
        }
    return(
        <Segment>
            <Item.Group divided>
                {dashboard.map(dashboard =>(
                    <Item key={dashboard.id}>
                        <Item.Content>
                            <Item.Header as='a'>{dashboard.title}</Item.Header>
                            <Item.Meta>{dashboard.date}</Item.Meta>
                            <Item.Description>
                                <div>{dashboard.description}</div>
                                <div>{dashboard.category}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(dashboard.id)} floated='right' content='view' color='blue'></Button>
                                <Button 
                                    name={dashboard.id}
                                    loading={submitting && target === dashboard.id} 
                                    onClick={(e) => handleActivityDelete(e, dashboard.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'></Button>
                                <Label basic content = {dashboard.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}