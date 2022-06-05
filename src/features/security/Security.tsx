import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Tab, TabProps } from 'semantic-ui-react';
import { history } from '../..';
import ResourceHeader from '../../app/common/chat/ResourceHeader';
import { useStore } from '../../app/stores/store';
import RoleList from './roles/RoleList';
import UserList from './users/UserList';

export default observer(function Security(){

  const {  commonStore} = useStore();
  const{setSideBarDisplay}= commonStore;
  // const{setSideBarDisplay}= commonStore;

const[activeIndex, setActiveIndex] = useState(1);
const location = useLocation<{from: string}>();

  useEffect(()=>{
    // show sidebar nav
    setSideBarDisplay(true);

    if(location.state){

      console.log(location.state.from);


switch(location.state.from){
  case 'role':
    setActiveIndex(1);
    break;
    case 'user':
      setActiveIndex(0);
      break;
      default:
}


        
      }
      else{

        console.log('use 1st tab');
        setActiveIndex(0);
      }



 
   
  }, [setActiveIndex])



function getDefaultIndex(){
  return activeIndex;
}

  const useIndex = getDefaultIndex();

  function handleTabChange( data:TabProps) {
  
setActiveIndex(data.activeIndex! as number);

  } 

    return(
        <div className='pmpacomp' >
         {/* <Header as='h2' content='Access Management' /> */}
         <ResourceHeader headerText='Access Management'/>
       <Tab panes={
        [
            { menuItem: 'Users', render: () => <Tab.Pane><UserList /></Tab.Pane> },
            { menuItem: 'Roles', render: () => <Tab.Pane>< RoleList/></Tab.Pane> },
          
          ]
       }  activeIndex={useIndex} onTabChange={(e, data) => (handleTabChange(data))}  >
          
       </Tab>

       </div>
    )
})