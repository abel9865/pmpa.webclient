import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ClientProjectDetailedChat from './tempStuff/clientProjectDetailedChat';
import ClientProjectDetailedHeader from './tempStuff/clientProjectDetailedHeader';
import ClientProjectDetailedInfo from './tempStuff/clientProjectDetailedInfo';
import ClientProjectDetailedSideBar from './tempStuff/clientProjectDetailedSideBar';



export default observer(function ClientProjectDetails(){
  const{clientProjectStore} = useStore();
  const{selectedClientProject:clientProject, loadClientProject, loadingInitial}= clientProjectStore;
const {id} = useParams<{id:string}>();

useEffect(()=>{
  if(id) loadClientProject(id);
}, [id, loadClientProject])


if(loadingInitial || !clientProject) return <LoadingComponent/>;

    return (
     


<Grid>
<Grid.Column width={10}>
  <ClientProjectDetailedHeader clientProject={clientProject} />
  <ClientProjectDetailedInfo clientProject={clientProject}/>
  <ClientProjectDetailedChat />
  
</Grid.Column>

<Grid.Column width={6}>
<ClientProjectDetailedSideBar />
</Grid.Column>
</Grid>
     
    )
})