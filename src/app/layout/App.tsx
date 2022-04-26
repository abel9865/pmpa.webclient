import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { ClientProject } from '../models/clientProject';
import NavBar from './NavBar';
import ClientProjectDashboard from '../../features/clientProjects/dashboard/ClientProjectDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const { clientProjectStore } = useStore();

  useEffect(() => {
    clientProjectStore.loadClientProjects();
  }, [clientProjectStore])

  if (clientProjectStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment >

      <NavBar />

      <Container style={{ marginTop: '7em' }}>


        <ClientProjectDashboard />

      </Container>

    </Fragment>
  );
}

export default observer(App);
