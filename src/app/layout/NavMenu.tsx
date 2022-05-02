import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label, Menu, Dropdown, DropdownMenu  } from 'semantic-ui-react';
// import { withRouter } from 'react-router-dom';
// import LogoutModal from './LogoutModal';





    // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

export default function NavMenu(){
    const [activeItem, setActiveItem] = useState('inbox')
    const [showModal, setShowModal] = useState(false)

        function handleItemClick(){
      alert('test');
          }

    return (
     
        <Menu vertical>
        <Menu.Item
          name='inbox'
          active={activeItem === 'inbox'}
         as={Link} to='/forms'
        >
          <Label color='teal'>1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item
          name='spam'
          active={activeItem === 'spam'}
         
          as={Link} to='/reports'
        >
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item
          name='updates'
          active={activeItem === 'updates'}
          onClick={handleItemClick}
        >
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
      </Menu>
       
    )
}




