import React, { Component, useState } from 'react'
import { Icon, Menu, Rail } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent, SidebarType } from '@syncfusion/ej2-react-navigations';
import SideBarAccordion from './SiceBarAccordion';


export default function SideBar() {



  const [activeItem, setActiveItem] = useState();

  function handleItemClick(name: any) {
      setActiveItem(name);
  }
  function toggleSideMenu() {
     // setActiveItem(name);
  }




  return (
      <Menu vertical style={{height:'100%'}}>
      
      <Menu.Item>
        <Menu.Header>Products</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='enterprise'
            as= {NavLink} to='/enterprise' 
          />
          <Menu.Item
            name='consumer'
            as= {NavLink} to='/consumer' 
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>CMS Solutions</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='rails'
            as= {NavLink} to='/rails' 
          />
          <Menu.Item
            name='python'
            as= {NavLink} to='/python' 
          />
          <Menu.Item
            name='php'
            as= {NavLink} to='/php' 
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Hosting</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='shared'
            as= {NavLink} to='/shared' 
          />
          <Menu.Item
            name='dedicated'
            as= {NavLink} to='/dedicated' 
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Support</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='email'
            as= {NavLink} to='/email' 
          >
            E-mail Support
          </Menu.Item>

          <Menu.Item
            name='faq'
            as= {NavLink} to='/faq' 
          >
            FAQs
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Configuration</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='formbuilder'
            as= {NavLink} to='/formbuilder' 
          >
            Form Builder
          </Menu.Item>

          <Menu.Item
            name='reportbuilder'
            as= {NavLink} to='/reports' 
          >
            Report Builder
          </Menu.Item>


          <Menu.Item
            name='dashboardbuilder'
            as= {NavLink} to='/dashboards' 
          >
            Dashboard Builder
          </Menu.Item>


 <Menu.Item
            name='usermanagement'
            as= {NavLink} to='/security' 
          >
            User Management
          </Menu.Item>
         

          <Menu.Item
            name='import-export'
            as= {NavLink} to='/import-export' 
          >
            Import/Export
          </Menu.Item>

          

          <Menu.Item
            name='chat'
            as= {NavLink} to='/chat' 
          >
            Chat
          </Menu.Item>

        
          
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  )
}