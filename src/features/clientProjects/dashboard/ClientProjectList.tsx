import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';
import ClientProjectListItem from './ClientProjectListItem';



export default observer(function ClientProjectList() {

    const {clientProjectStore} = useStore();
    const { clientProjectsByTitle} = clientProjectStore;
   

    return (

     
<>
        
                {clientProjectsByTitle.map(clientProject  => (
                  <ClientProjectListItem key={clientProject.projectId} clientProject={clientProject} />
                ))}
          
</>
      
    )
})