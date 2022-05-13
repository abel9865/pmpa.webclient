import React from 'react';
import { Header, Tab } from 'semantic-ui-react';
import RoleList from './roles/RoleList';
import UserList from './users/UserList';

export default function Security(){

    return(
        <div className='pmpacomp' >
         <Header as='h2' content='Access Management' />
       <Tab panes={
        [
            { menuItem: 'Users', render: () => <Tab.Pane><UserList /></Tab.Pane> },
            { menuItem: 'Roles', render: () => <Tab.Pane>< RoleList/></Tab.Pane> },
          
          ]
       } >
          
       </Tab>

       </div>
    )
}