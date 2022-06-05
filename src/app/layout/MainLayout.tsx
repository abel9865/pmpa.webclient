import React from 'react'
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import ClientProjectDashboard from "../../features/clientProjects/dashboard/ClientProjectDashboard";
import clientProjectDetails from "../../features/clientProjects/details/clientProjectDetails";
import ClientProjectForm from "../../features/clientProjects/form/ClientProjectForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/login/LoginForm";
import RoleForm from "../../features/security/roles/RoleForm";
import RoleList from "../../features/security/roles/RoleList";
import UserForm from "../../features/security/users/UserForm";
import UserList from "../../features/security/users/UserList";
import ModalContainer from "../common/modals/ModalContainer";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import Security from "../../features/security/Security";
import Layout from "./Layout";
import TopMenu from "./TopMenu";
import SideBar from "./SideBar";
import { SidebarComponent, SidebarType } from '@syncfusion/ej2-react-navigations';
import SideBarAccordion from './SiceBarAccordion';
import FormBuilder from "../../features/forms/configurator/FormBuilder";
import settings from '../../features/settings/settings';
import ConnectionList from '../../features/connections/ConnectionList';
import WorkFlowDashboard from '../../features/workFlows/dashboard/WorkFlowDashboard';
import ThemeBuilder from '../../features/theme/ThemeBuilder';
import ReportBuilder from '../../features/reports/configurator/ReportBuilder';
import DashboardBuilder from '../../features/dashboard/configurator/DashboardBuilder';
import ResetPassword from '../../features/login/ResetPassword';

export default observer(function MainLayout(){

    const location = useLocation();
    const { commonStore, userStore } = useStore();
    const{setSideBarDisplay, showSideBar:displaySideBar}= commonStore;
    useEffect(() => {
      //hide sidebar display
      setSideBarDisplay(false);
  
      if (commonStore.token) {
        userStore.getUser().finally(() => commonStore.setAppLoaded());
      }
      else {
        commonStore.setAppLoaded();
      }
    }, [commonStore, userStore, setSideBarDisplay])
  
    if (!commonStore.appLoaded) return <LoadingComponent content="Loadin app..." />
  


    return (

        <>
          <ToastContainer position='bottom-right' hideProgressBar />
          <ModalContainer />
    
          <Route exact path='/' component={HomePage} />
          <Route exact path={'/resetpassword'} component={ResetPassword} />

          <Route
            path={'/(.+)'}
           // path={'^(?=/(.+))(?= /\/(?!resetpassword)/).*$'}
            render={() => (
              <>
    
    
                <div className="grid-layout">
                  <div className="menu-layout">
                    <TopMenu />
                  </div>
                  <div className="main-content-layout">
                    <div className='parent-layout' style={{ height: '100vh' }}>
                      {/* <div className='side-layout' style={{ height: '100vh'}}> */}
                      {displaySideBar ? (
                        <div className='side-layout' style={{ height: '100vh' }}>
                          <SideBar />
                        </div>
                      ) :
                        (
                          <></>
                        )
                      }
    
                      {/* </div> */}
                      <div className={displaySideBar?('content-layout'):('')} >
    
    
                        <Switch>
                          <Route exact path='/clientProjects' component={ClientProjectDashboard} />
                          <Route path='/clientProjects/:id' component={clientProjectDetails} />
                          <Route key={location.key} path={['/createClientProject', '/manage/:id']} component={ClientProjectForm} />
                          <Route path='/errors' component={TestErrors} />
                          <Route path='/server-error' component={ServerError} />
                          <Route path='/login' component={LoginForm} />
    
    
    
    
                          <Route exact path='/security' component={Security} />
                          <Route exact path='/users' component={UserList} />
                          <Route key={location.key} path={['/addUser', '/manageUser/:id', '/profile/:id']} component={UserForm} />
    
                          <Route exact path='/roles' component={RoleList} />
                          <Route key={location.key} path={['/addRole', '/manageRole/:id']} component={RoleForm} />
    
                          <Route  path='/workFlows' component={WorkFlowDashboard} />

                          <Route  path='/connections' component={ConnectionList} />
                        
                          <Route  path='/settings' component={settings} />

                          <Route  path='/theme' component={ThemeBuilder} />
    
    
                          <Route exact path='/reportbuilder' component={ReportBuilder} />
                          <Route exact path='/formbuilder' component={FormBuilder} />

                          <Route exact path='/dashboardbuilder' component={DashboardBuilder} />
    
                          <Route component={NotFound} />
                        </Switch>
    
                      </div>
                    </div>
                  </div>
                </div>
    
                </>
        )}
      />
    </>
  );

})