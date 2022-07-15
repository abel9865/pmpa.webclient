import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Dropdown, Menu, Image, } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default observer(function TopMenu(){

    const{userStore:{user, logout}}=useStore();

    return (

        <Menu inverted >
        {/* <Container> */}
            <Menu.Item as ={NavLink} to ='/' exact header>
               <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}></img>
               MergencePro
               </Menu.Item> 
       
           <Menu.Item as= {NavLink} to='/clientProjects' name='Solutions'/>
       
           <Menu.Item as= {NavLink} to='/workFlows' name='WorkFlows'/>
       
           <Menu.Item as= {NavLink} to='/connections' name='Data Connectors'/> 

          
       
           {/* <Menu.Item as= {NavLink} to='/errors' name='Err'/>  */}

           <Menu.Item as= {NavLink} to='/settings' name='settings'/> 
       
         
       
       <Menu.Item position='right'>
          
       <Image src={user?.image || '/assets/user.png'}  avatar spaced='right' />
       <Dropdown pointing='top left' text={user?.email}>
           <Dropdown.Menu>
           <Dropdown.Item as ={Link} to={`/manageUser/${user?.userId}`} text='My Profile' icon='user' />
       
       <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
           </Dropdown.Menu>
       
       </Dropdown>
       </Menu.Item>
               {/* </Container> */}
                </Menu> 
           
             

    )
})