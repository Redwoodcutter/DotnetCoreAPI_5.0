import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {SelectedActivity: dashboard,loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id, loadActivity]);

    if(loadingInitial || !dashboard) return <LoadingComponent/>;

    return (
        <Card fluid>
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
               <Button.Group widths='2'>
                   <Button basic color='blue' content='Edit' />
                   <Button basic color='grey' content='Cancel' />
               </Button.Group>
            </Card.Content>
        </Card>
    )
})