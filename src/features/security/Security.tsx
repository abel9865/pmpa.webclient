import React from 'react';
import { Header, Tab } from 'semantic-ui-react';
import RoleList from './roles/RoleList';
import UserList from './users/UserList';

export default function Security(){

    return(
        <>
         <Header as='h1' content='Access Management' />
       <Tab panes={
        [
            { menuItem: 'Users', render: () => <Tab.Pane><UserList /></Tab.Pane> },
            { menuItem: 'Roles', render: () => <Tab.Pane>< RoleList/></Tab.Pane> },
            { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
          ]
       } >
          
       </Tab>

       </>
    )
}