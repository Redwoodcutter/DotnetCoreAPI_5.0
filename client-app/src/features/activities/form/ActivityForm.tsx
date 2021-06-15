import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [dashboard, setDashboard] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setDashboard(activity!))
    }, [id, loadActivity]);

    function handleSubmit() {
        if (dashboard.id.length === 0) {
            let newActivity = {
                ...dashboard,
                id: uuid()
            };
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            })
        } else {
            updateActivity(dashboard).then(() => {
                history.push(`/activities/${dashboard.id}`)
            })
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setDashboard({ ...dashboard, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activities...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={dashboard.title} name="title" onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={dashboard.description} name="description" onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={dashboard.category} name="category" onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={dashboard.date} name="date" onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})