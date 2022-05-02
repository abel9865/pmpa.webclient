import { observer } from "mobx-react-lite";
import {  Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";

import ClientProjectDashboard from "../../features/clientProjects/dashboard/ClientProjectDashboard";
import clientProjectDetails from "../../features/clientProjects/details/clientProjectDetails";
import ClientProjectForm from "../../features/clientProjects/form/ClientProjectForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";

function App() {

 const location = useLocation();

  

  return (
    
<>


<Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
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
</>
  );
}

export default observer(App);
