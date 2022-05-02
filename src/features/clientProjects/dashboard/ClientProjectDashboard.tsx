import { observer } from 'mobx-react-lite';
import  { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ClientProjectFilters from './ClientProjectFilters';

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
             <ClientProjectFilters/>
            </Grid.Column>
        </Grid>
       
    )
})