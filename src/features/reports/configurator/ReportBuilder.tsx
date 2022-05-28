
/* eslint-disable */
import React, { useEffect } from 'react';
//Report designer source
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Content/office-365/bold.reports.all.min.css';
import '@boldreports/javascript-reporting-controls/Content/office-365/bold.reportdesigner.min.css';
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';
//fr localization files
// import '@boldreports/global/l10n/reportdesigner/ej.localetexts.fr-FR.min.js';
// import '@boldreports/global/i18n/ej.culture.fr-FR.min.js';
import './reportbuilder.css'

import { Button, Container, Icon, Menu } from 'semantic-ui-react';



import { useStore } from '../../../app/stores/store';
import { Link, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
declare let BoldReportDesignerComponent: any;


var designerStyle = {
  'height': '1200px',
  'width': '100%'
};

interface Props{
  messages:any;
  
}



export default function ReportBuilder({messages}:Props){

    const {  commonStore} = useStore();

    const{setSideBarDisplay}= commonStore;


    const MOUNT_NODE = document.getElementById('reportdesigner_container') as HTMLElement;

    const ConnectedApp = (props: { messages: any }) => (
      <div style={designerStyle}>
          <BoldReportDesignerComponent id="reportdesigner_container"    serviceUrl={'https://demos.boldreports.com/services/api/ReportDesignerWebApi'}>
          </BoldReportDesignerComponent>
        </div>
    );

    // const render = (messages: any) => {
    //   ReactDOM.render(<ConnectedApp messages={messages} />, MOUNT_NODE);
    // };

    useEffect(()=>{
        // show sidebar nav
        setSideBarDisplay(false);
    
 
    
    
     
       
      }, [])

  
      return (

        <div>

<Menu secondary >
        {/* <Container> */}
            <Menu.Item as ={NavLink} to ='/' exact header>
            <Button as={Link} to={`/clientProjects/${window.localStorage.getItem("pjid")}`} icon color='blue' labelPosition='left' floated='left'  >
      <Icon name='arrow alternate circle left' />
      Back to solution
    </Button>
               </Menu.Item> 
               </Menu>
               {/* <ConnectedApp messages={messages} /> */}
               {/* <ConnectedApp messages={messages} /> */}

        <div id ='rptContainer' style={designerStyle} >
        <BoldReportDesignerComponent
        id="reportdesigner_container"
         serviceUrl={'https://demos.boldreports.com/services/api/ReportDesignerWebApi'}

        //serviceUrl = {'https://localhost:5003/ReportingAPI'}
        filterDataConnectors={['SQL', 'WebAPI', 'Excel', 'MariaDB', 'MySQL']}

        // serviceAuthorizationToken={`Bearer ${window.localStorage.getItem('jwt')}`}

locale="fr-FR">

        </BoldReportDesignerComponent>
</div>
</div>
      );
}