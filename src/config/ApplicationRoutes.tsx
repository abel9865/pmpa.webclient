// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
// // import List from "../components/pages/list";
// // import Form from "../components/pages/form";
// // import SideNav from "../components/layouts/sidebar";
// // import File from "../components/pages/files";
// // import Videos from "../components/pages/videos";
// import { Layout, MenuProps } from 'antd';
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined
// } from '@ant-design/icons';
// import SideNav from '../app/layout/SideNav';
// import FormTest from '../features/forms/FormTest';
// import ClientProjectDashboard from '../features/clientProjects/dashboard/ClientProjectDashboard';
// import clientProjectDetails from '../features/clientProjects/details/clientProjectDetails';
// import ClientProjectForm from '../features/clientProjects/form/ClientProjectForm';
// import HomePage from '../features/home/HomePage';
// import NavBar from '../app/layout/NavBar';
// import { Container } from 'semantic-ui-react';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';


// const { Header, Sider, Content } = Layout;
// const ApplicationRoutes = () => {
//     // const [collapse, setCollapse] = useState(false);
//     // useEffect(() => {
//     //     window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
//     // }, []);
//     // const handleToggle = (event: any) => {
//     //     event.preventDefault();
//     //     collapse ? setCollapse(false) : setCollapse(true);
//     // }

//     const location = useLocation();


 
//     return (
//         <Router>

//             <Route exact path='/' component={HomePage} />
//             <Route exact path='/clientProjects' component={ClientProjectDashboard} />
//             {/* <Route exact path={['/clientProjects', '/createClientProject', '/manage/:id', 'workFlows', 'connections']}
        
//         render={() => (
//           <>
//             <NavBar />
//             <Container style={{ marginTop: '7em' }}>

//             <Switch>
//                 <Route exact path='/clientProjects' component={ClientProjectDashboard} />
             

//                <Route key={location.key} path={['/createClientProject', '/manage/:id']} component={ClientProjectForm} />
               

//                <Route exact path='/workFlows' component={ClientProjectDashboard} />
//                <Route exact path='/connections' component={ClientProjectDashboard} />
             


//                 </Switch>
//             </Container>

//           </>
//         )}
//       /> */}

//             <Route
//                 path={['/clientProjects', '/clientProjects/:id', '/form', 'report', 'workflow', 'files', 'videos', '/createClientProject', '/manage/:id', 'workFlows', 'connections']}
//                 render={() => (
//                     <>

// <Switch>
//                 <Route exact path='/clientProjects' component={ClientProjectDashboard} />
             

//                <Route key={location.key} path={['/createClientProject', '/manage/:id']} component={ClientProjectForm} />
               

//                <Route exact path='/workFlows' component={ClientProjectDashboard} />
//                <Route exact path='/connections' component={ClientProjectDashboard} />
             


//                 </Switch>
// </>
                       
// )}
// />
                                

//         </Router>
//     );
// }
// export default ApplicationRoutes;