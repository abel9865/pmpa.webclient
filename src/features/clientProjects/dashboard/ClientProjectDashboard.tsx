import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ClientProject } from '../../../app/models/clientProject';
import ClientProjectDetails from '../details/clientProjectDetails';
import ClientProjectForm from '../form/ClientProjectForm';
import ClientProjectList from './ClientProjectList';

interface Props{
    clientProjects: ClientProject[];
    selectedClientProject: ClientProject |undefined;
    selectClientProject:(id:string)=>void;
    cancelSelectClientProject:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createOrEdit: (clientProject: ClientProject)=>void;
    deleteClientProject:(id:string)=>void;
}

export default function ClientProjectDashboard({clientProjects, selectedClientProject, selectClientProject, cancelSelectClientProject, editMode, openForm, closeForm, createOrEdit, deleteClientProject}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>          
           <ClientProjectList clientProjects={clientProjects} selectClientProject={selectClientProject} deleteClientProject = {deleteClientProject}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedClientProject && !editMode &&
                
                <ClientProjectDetails 
                clientProject={selectedClientProject} 
                cancelSelectClientProject = {cancelSelectClientProject}
                openForm={openForm}
                />
                
                }
                {editMode && 
                <ClientProjectForm closeForm={closeForm} clientProject={selectedClientProject} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}