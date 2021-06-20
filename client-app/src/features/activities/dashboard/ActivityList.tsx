import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities, } = activityStore

    return (
        <>
            {groupedActivities.map(([group, dashboard]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {dashboard.map(activity => (
                        <ActivityListItem key={activity.id} dashboard={activity} />
                    ))}
                </Fragment>
            ))}
        </>

    )
})