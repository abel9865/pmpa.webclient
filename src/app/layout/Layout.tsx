import React from 'react';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';
// import  './layout.css';
import SideBar from './SideBar';

export default function Layout(){

    return (
        <div className="grid">
        <div className="menu">
            <TopMenu/>
        </div>
        <div className="main-content">
          <div className='parent'>
              <div className='side'>
<SideBar/>
              </div>
              <div className='content'>

              </div>
        </div>
    </div>
    </div>
    )
}