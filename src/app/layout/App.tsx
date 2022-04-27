import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ClientProjectDashboard from '../../features/clientProjects/dashboard/ClientProjectDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ClientProjectForm from '../../features/clientProjects/form/ClientProjectForm';
import clientProjectDetails from '../../features/clientProjects/details/clientProjectDetails';



function App() {

  const location = useLocation();
  return (
    // <Fragment >
<>
      <Route exact path='/' component={HomePage} />
<Route
path={'/(.+)'} 
render={()=>(
  <>
 <NavBar />
      <Container style={{ marginTop: '7em' }}>

        <Route exact path='/clientProjects' component={ClientProjectDashboard} />
        <Route path='/clientProjects/:id' component={clientProjectDetails} />
        <Route key={location.key} path={['/createClientProject', '/manage/:id']} component={ClientProjectForm} />

      </Container>

  </>
)}
/>
     




      {/* <Grid>
            <Grid.Column width='3'>          
           <SideBar/> 
            </Grid.Column>
            <Grid.Column width='13'>
              <Grid.Row>  <NavBar /> </Grid.Row>
              <Grid.Row>
              <Container style={{ marginTop: '7em' }}>
            <Route exact path='/' component={HomePage}/>
      <Route exact path='/clientProjects' component={ClientProjectDashboard}/>
      <Route path='/clientProjects/:id' component={clientProjectDetails}/>
      <Route path='/createClientProject' component={ClientProjectForm}/>

      </Container>
              </Grid.Row>
           
            </Grid.Column>
        </Grid>  */}



    {/* </Fragment> */}
    </>
  );
}

export default observer(App);
