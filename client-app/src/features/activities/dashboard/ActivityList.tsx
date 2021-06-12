import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList(){
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate,loading} = activityStore
    const [target, setTarget] = useState('');
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
        }
    

    return(
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(dashboard =>(
                    <Item key={dashboard.id}>
                        <Item.Content>
                            <Item.Header as='a'>{dashboard.title}</Item.Header>
                            <Item.Meta>{dashboard.date}</Item.Meta>
                            <Item.Description>
                                <div>{dashboard.description}</div>
                                <div>{dashboard.category}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(dashboard.id)} floated='right' content='view' color='blue'></Button>
                                <Button 
                                    name={dashboard.id}
                                    loading={loading && target === dashboard.id} 
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
})