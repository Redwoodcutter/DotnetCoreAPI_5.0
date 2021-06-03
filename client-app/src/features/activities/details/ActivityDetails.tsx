import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    dashboard : Activity
}

export default function ActivityDetails({dashboard}: Props) {
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
                   <Button basic color='blue' content='Edit' />
                   <Button basic color='grey' content='Cancel' />
               </Button.Group>
            </Card.Content>
        </Card>
    )
}