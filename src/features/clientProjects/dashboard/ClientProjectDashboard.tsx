import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ClientProjectDetails from '../details/clientProjectDetails';
import ClientProjectForm from '../form/ClientProjectForm';
import ClientProjectList from './ClientProjectList';



export default observer(function ClientProjectDashboard(){
 
 const {clientProjectStore} = useStore();
const{selectedClientProject, editMode} = clientProjectStore;
    return(
        <Grid>
            <Grid.Column width='10'>          
           <ClientProjectList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedClientProject && !editMode &&
                
                <ClientProjectDetails   />
                
                }
                {editMode && 
                <ClientProjectForm />}
            </Grid.Column>
        </Grid>
    )
})