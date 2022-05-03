import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import ClientProjectDashboard from "../../features/clientProjects/dashboard/ClientProjectDashboard";
import clientProjectDetails from "../../features/clientProjects/details/clientProjectDetails";
import ClientProjectForm from "../../features/clientProjects/form/ClientProjectForm";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import TestErrors from "../../features/Errors/TestErrors";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";

function App() {

  const location = useLocation();



  return (

    <>
<ToastContainer position='bottom-right' hideProgressBar />

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
<Switch>
              <Route exact path='/clientProjects' component={ClientProjectDashboard} />
              <Route path='/clientProjects/:id' component={clientProjectDetails} />
              <Route key={location.key} path={['/createClientProject', '/manage/:id']} component={ClientProjectForm} />
              <Route path='/errors' component={TestErrors} />
              <Route path='/server-error' component={ServerError} />
              <Route  component={NotFound} />
              </Switch>
            </Container>

          </>
        )}
      />
    </>
  );
}

export default observer(App);
