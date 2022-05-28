/* eslint-disable */

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
import MainLayout from "./MainLayout";





function App() {

  // const location = useLocation();
  // const { commonStore, userStore } = useStore();

  // useEffect(() => {
  //   //hide sidebar display
  //   commonStore.setSideBarDisplay(false);

  //   if (commonStore.token) {
  //     userStore.getUser().finally(() => commonStore.setAppLoaded());
  //   }
  //   else {
  //     commonStore.setAppLoaded();
  //   }
  // }, [commonStore, userStore])

  // if (!commonStore.appLoaded) return <LoadingComponent content="Loadin app..." />

  return (

    
      
    <MainLayout/>
  );
}



export default observer(App);
