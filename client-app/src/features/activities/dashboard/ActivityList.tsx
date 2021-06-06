import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    dashboard : Activity[];
    selectActivity: (id: string) => void;

}

export default function ActivityList({dashboard,selectActivity}:Props){
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
                                <Label basic content = {dashboard.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}