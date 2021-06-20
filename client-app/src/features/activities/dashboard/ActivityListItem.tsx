import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


interface Props {
    dashboard: Activity
}

export default function ActivityListItem({ dashboard }: Props) {
  
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${dashboard.id}`}>
                                {dashboard.title}
                            </Item.Header>
                            <Item.Description>Hosted by Cevdet</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {dashboard.date}
                    <Icon name='marker' /> {dashboard.description}
                </span>
            </Segment>
            <Segment>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>
                    {dashboard.category}
                </span>
                <Button as={Link} to={`/activities/${dashboard.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
    )
}