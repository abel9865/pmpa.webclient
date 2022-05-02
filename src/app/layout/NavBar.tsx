import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';



export default function NavBar(){


    return (
       
       <Container>
      


 <Menu inverted fixed="top" >

     <Menu.Item as ={NavLink} to ='/' exact header>
        <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}></img>
        MergencePro
        </Menu.Item> 

    <Menu.Item as= {NavLink} to='/clientProjects' name='Solutions'/>

    <Menu.Item as= {NavLink} to='/workFlows' name='WorkFlows'/>

    <Menu.Item as= {NavLink} to='/connections' name='Data Connections'/> 

 
    <Menu.Item>
        
<Button as={NavLink}  to = '/createClientProject' positive content = 'Create New Solution'/>
        </Menu.Item> 

         </Menu> 
    
        </Container>


      
    )
}