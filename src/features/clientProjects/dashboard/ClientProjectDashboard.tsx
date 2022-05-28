import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Grid, Segment } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ClientProjectForm from '../form/ClientProjectForm';
import ClientProjectFilters from './ClientProjectFilters';

import ClientProjectList from './ClientProjectList';



export default observer(function ClientProjectDashboard() {

    const { userStore, commonStore,  clientProjectStore, modalStore } = useStore();

    const { loadClientProjects, clientProjectRegistry } = clientProjectStore;

    const{setSideBarDisplay}= commonStore;

    useEffect(() => {

 //hide sidebar display
 setSideBarDisplay(false);
  

        if (clientProjectRegistry.size <= 1) loadClientProjects(userStore.user?.clientId!);
    }, [clientProjectRegistry.size, loadClientProjects, setSideBarDisplay])

    if (clientProjectStore.loadingInitial) return <LoadingComponent content='Loading solutions' />


    return (

        <div className='pmpacomp' >

            <Grid>
                <Grid.Column width='10'>
                    <Button onClick={() => (modalStore.openModal(<ClientProjectForm />, "large"))} positive content='Create New Solution' />
                    <ClientProjectList />
                </Grid.Column>
                <Grid.Column width='6'>
                    <ClientProjectFilters />
                </Grid.Column>
            </Grid>

        </div>

    )
})