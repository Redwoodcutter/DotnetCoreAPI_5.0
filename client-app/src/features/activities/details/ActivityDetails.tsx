import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    dashboard : Activity
    cancelSelectActivity: () => void;
    openForm : (id: string) => void;
}

export default function ActivityDetails({dashboard,cancelSelectActivity,openForm}: Props) {
    return (
        <Card>
            <Image src={`/assets/categoryImages/${dashboard.category}.jpg`} />
            <Card.Content>
                <Card.Header>{dashboard.title}</Card.Header>
                <Card.Meta>
                    <span >{dashboard.date}</span>
                </Card.Meta>
                <Card.Description>
                    {dashboard.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
               <Button.Group>
                   <Button onClick={() => openForm(dashboard.id)}   basic color='blue' content='Edit' />
                   <Button onClick={cancelSelectActivity} basic color='grey' content='Cancel' />
               </Button.Group>
            </Card.Content>
        </Card>
    )
}