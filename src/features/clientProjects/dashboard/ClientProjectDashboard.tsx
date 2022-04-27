import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ClientProjectDetails from '../details/clientProjectDetails';

import ClientProjectForm from '../form/ClientProjectForm';
import ClientProjectList from './ClientProjectList';



export default observer(function ClientProjectDashboard(){
 
 const {clientProjectStore} = useStore();

const{loadClientProjects, clientProjectRegistry} = clientProjectStore;


useEffect(() => {
  if (clientProjectRegistry.size<=1) loadClientProjects();
}, [clientProjectRegistry.size, loadClientProjects])

if (clientProjectStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return(
        <Grid>
            <Grid.Column width='10'>          
           <ClientProjectList />
            </Grid.Column>
            <Grid.Column width='6'>
              <h1>Filter</h1>
            </Grid.Column>
        </Grid>
    )
})