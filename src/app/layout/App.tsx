import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ClientProject } from '../models/clientProject';
import NavBar from './NavBar';
import ClientProjectDashboard from '../../features/clientProjects/dashboard/ClientProjectDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [clientProjects, setClientProjects] = useState<ClientProject[]>([]);
  const [selectedClientProject, setSelectedClientProject]=useState<ClientProject| undefined>(undefined);

  const [editMode, setEditMode] = useState(false);


  useEffect(()=>{
    axios.get<ClientProject[]>('http://localhost:5000/ClientProject/GetAllClientProjects').then(response=>{
    console.log(response); 
    setClientProjects(response.data);
    })
  }, [])

function handleSelectClientProject(id:string){
setSelectedClientProject(clientProjects.find(x=>x.projectId===id))
  }

  function handleCancelSelectClientProject(){
    setSelectedClientProject(undefined);
  }

  function handleFormOpen(id?: string){
    id? handleSelectClientProject(id): handleCancelSelectClientProject();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditClientProject(clientProject: ClientProject){
    clientProject.projectId
    //update existing clientProject
    ? setClientProjects([...clientProjects.filter(x=>x.projectId!==clientProject.projectId), clientProject])
    //create new clientProject
    : setClientProjects([...clientProjects, {...clientProject, projectId:uuid()} ]);
    setEditMode(false);
    setSelectedClientProject(clientProject);

  }


  function handleDeleteClientProject(id:string){
setClientProjects([...clientProjects.filter(x=>x.projectId!==id)])
  }

  return (
    <Fragment >
       
     <NavBar openForm={handleFormOpen}/>
   
   <Container style ={{marginTop:'7em'}}>
       <ClientProjectDashboard 
       clientProjects={clientProjects} 
       selectedClientProject={selectedClientProject}
       selectClientProject={handleSelectClientProject}
       cancelSelectClientProject = {handleCancelSelectClientProject} 
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm= {handleFormClose}
       createOrEdit={handleCreateOrEditClientProject}
       deleteClientProject={handleDeleteClientProject}
       />
        
        </Container>
      
    </Fragment>
  );
}

export default App;
