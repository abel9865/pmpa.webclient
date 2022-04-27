import React, { Component, useState } from 'react'
import { Icon, Menu, Rail } from "semantic-ui-react";
import { NavLink } from "react-router-dom";






export default function SideBar() {



    const [activeItem, setActiveItem] = useState();

    function handleItemClick(name: any) {
        setActiveItem(name);
    }
    function toggleSideMenu() {
       // setActiveItem(name);
    }




    return (
        <Menu vertical>
            <Menu.Item as ={NavLink} to ='/' exact header>
        <img src="/assets/logo.png" alt="logo"></img>
        MergencePro
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='enterprise'
              active={activeItem === 'enterprise'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='consumer'
              active={activeItem === 'consumer'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>CMS Solutions</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='rails'
              active={activeItem === 'rails'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='python'
              active={activeItem === 'python'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='php'
              active={activeItem === 'php'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Hosting</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='shared'
              active={activeItem === 'shared'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='dedicated'
              active={activeItem === 'dedicated'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='email'
              active={activeItem === 'email'}
              onClick={handleItemClick}
            >
              E-mail Support
            </Menu.Item>

            <Menu.Item
              name='faq'
              active={activeItem === 'faq'}
              onClick={handleItemClick}
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
}