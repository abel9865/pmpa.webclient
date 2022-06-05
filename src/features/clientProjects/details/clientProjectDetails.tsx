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
  const{clientProjectStore, commonStore} = useStore();
  const{selectedClientProject:clientProject, loadClientProject, loadingInitial}= clientProjectStore;
  const{setSideBarDisplay}= commonStore;
const {id} = useParams<{id:string}>();

useEffect(()=>{
  //display sidebar nav
  setSideBarDisplay(true);
  if(id) loadClientProject(id);
}, [id, loadClientProject, setSideBarDisplay])


if(loadingInitial || !clientProject) return <LoadingComponent/>;

    return (
     

<div className='pmpacomp'>
<Grid>
<Grid.Column width={10}>
  <ClientProjectDetailedHeader clientProject={clientProject} />
  <ClientProjectDetailedInfo clientProject={clientProject}/>
  <ClientProjectDetailedChat resourceId='36622530-d111-49e1-a23a-53999752a58d' />
  
</Grid.Column>

<Grid.Column width={6}>
<ClientProjectDetailedSideBar />
</Grid.Column>
</Grid>
</div> 
    )
})