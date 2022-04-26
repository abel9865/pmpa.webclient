import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';




export default function NavBar(){

const {clientProjectStore} = useStore();

    return (
        <Menu inverted fixed='top'>
<Container>
    <Menu.Item header>
        <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}></img>
        MergencePro
        </Menu.Item>

    <Menu.Item name='ClientProjects'/>

    <Menu.Item>
<Button onClick={()=>clientProjectStore.openForm()} positive content = 'Create New Application'/>
        </Menu.Item>
</Container>
        </Menu>
    )
}