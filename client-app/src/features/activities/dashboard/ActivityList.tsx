import { observer } from 'mobx-react-lite';
import { Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { activitiesByDate, } = activityStore

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(dashboard => (
                    <ActivityListItem key={dashboard.id} dashboard={dashboard} />
                ))}
            </Item.Group>
        </Segment>
    )
})