import React, { useState } from 'react';
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
          onClick={handleItemClick}
        >
          <Label color='teal'>1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item
          name='spam'
          active={activeItem === 'spam'}
         
          onClick={handleItemClick}
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




