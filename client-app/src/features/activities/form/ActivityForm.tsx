import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    const {SelectedActivity,closeForm, createActivity, updateActivity,loading} = activityStore;

    const initialState = SelectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date:'',
    }

    const [dashboard, setDashboard] = useState(initialState);
    function handleSubmit(){
        dashboard.id ? updateActivity(dashboard) : createActivity(dashboard);
    }
    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setDashboard({...dashboard, [name]: value});
    }
  
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={dashboard.title} name="title" onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={dashboard.description} name="description" onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={dashboard.category} name="category" onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={dashboard.date} name="date" onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})