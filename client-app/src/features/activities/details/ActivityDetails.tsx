import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {SelectedActivity: dashboard,} = activityStore;

    if(!dashboard) return <LoadingComponent/>;

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
                   <Button  basic color='blue' content='Edit' />
                   <Button  basic color='grey' content='Cancel' />
               </Button.Group>
            </Card.Content>
        </Card>
    )
}