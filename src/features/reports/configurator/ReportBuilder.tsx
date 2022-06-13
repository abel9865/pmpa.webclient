
/* eslint-disable */
import React, { useEffect, useState } from 'react';

//additional files added to see if it helps
import '../../../globals'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


import 'sanitize.css/sanitize.css';


//Report designer source
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
// import '@boldreports/javascript-reporting-controls/Content/office-365/bold.reports.all.min.css';
// import '@boldreports/javascript-reporting-controls/Content/office-365/bold.reportdesigner.min.css';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.compatibility.min.css';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reportdesigner.compatibility.min.css';


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
import { OperationCanceledException } from 'typescript';
import { RptCreds } from '../../../app/models/rptCreds';
import { string } from 'yup/lib/locale';
declare let BoldReportDesignerComponent: any;



// var innerHeight = window.innerHeight;
// var outerHeight = window.outerHeight;

// alert('innerHeight: '+ innerHeight + ' outerHeight: '+ outerHeight);

var height = window.innerHeight - 52;
var designerStyle = {
 'height': height + 'px',
 //'height':  '750px',
  'width': '100%'
};




// var designerStyle = {
//   'height': '1200px',
//   'width': '100%'
// };

interface Props {
  messages: any;

}



export default function ReportBuilder({ messages }: Props) {

  const { commonStore, reportStore } = useStore();

  const { setSideBarDisplay } = commonStore;

  const [rptToken, setRptToken] = useState('');

   // const {loading, getReportItems, getToken } = reportStore;

  // const MOUNT_NODE = document.getElementById('reportdesigner_container') as HTMLElement;

  // const ConnectedApp = (props: { messages: any }) => (
  //   <div style={designerStyle}>
  //       <BoldReportDesignerComponent id="reportdesigner_container"    serviceUrl={'https://demos.boldreports.com/services/api/ReportDesignerWebApi'}>
  //       </BoldReportDesignerComponent>
  //     </div>
  // );

  // const render = (messages: any) => {
  //   ReactDOM.render(<ConnectedApp messages={messages} />, MOUNT_NODE);
  // };

  // var tokenToUse: any;
  // let tkn = '';


  // async function retrieveToken() {
  //   let result;
  //   var apiRequest: RptCreds =
  //   {
  //     password: "Sw33tt34!",
  //     userid: "abel9865@gmail.com"
  //   }
  //   try {
  //     result = await $.ajax({
  //       url: "http://desktop-1mq5eqq:49987/reporting/api/site/acmerpt/get-user-key",
  //       type: 'POST',
  //       data: apiRequest
  //     });

  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
 

  useEffect(() => {
    // show sidebar nav
    setSideBarDisplay(true);

  }, [commonStore])

  function testFn(args: any, token: string) {
    console.log(args);

    //alert(token);
  }

  function openRpt(args: any) {
    console.log(args);
    //alert('rpt opened');
  }

  // function getToken(){
  //   return rptToken;
  // }


  //alert(rptToken);

  return (

    <div>

      {/* <Menu secondary >
       
        <Menu.Item as={NavLink} to='/' exact header>
          <Button as={Link} to={`/clientProjects/${window.localStorage.getItem("pjid")}`} icon color='blue' labelPosition='left' floated='left'  >
            <Icon name='arrow alternate circle left' />
            Back to solution
          </Button>
        </Menu.Item>
      </Menu> */}


  

      <div id='rptContainer' style={designerStyle} >


        <BoldReportDesignerComponent
          id="reportdesigner_container"


          //serviceUrl={'https://demos.boldreports.com/services/api/ReportDesignerWebApi'}

          //serviceUrl = {'https://localhost:5003/ReportingAPI'}

          //filterDataConnectors={['SQL', 'WebAPI', 'Excel', 'MariaDB', 'MySQL']}

          //ajaxSuccess={(args: any) => (testFn(args, rptToken))}

          //openReportClick={(args: any) => (openRpt(args))}

          serviceAuthorizationToken={'bearer '+ commonStore.reportToken || window.localStorage.getItem("tk1")}
          //{'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZWw5ODY1QGdtYWlsLmNvbSIsIm5hbWVpZCI6IjEiLCJ1bmlxdWVfbmFtZSI6IjM0MGI4ZTIyLWEyYWYtNGQ5NC1hOGRhLTZjY2ExMWRkYmVjOSIsIklQIjoiMjYwMDoxNzAwOjE0YjA6NWQ1MDo0OWVlOjRkZTQ6OGZkMzpiYjI1IiwiaXNzdWVkX2RhdGUiOiIxNjU0ODIzNjI1IiwibmJmIjoxNjU0ODIzNjI1LCJleHAiOjE2NTU0Mjg0MjUsImlhdCI6MTY1NDgyMzYyNSwiaXNzIjoiaHR0cDovL2Rlc2t0b3AtMW1xNWVxcTo0OTk4Ny9yZXBvcnRpbmcvc2l0ZS9hY21lcnB0IiwiYXVkIjoiaHR0cDovL2Rlc2t0b3AtMW1xNWVxcTo0OTk4Ny9yZXBvcnRpbmcvc2l0ZS9hY21lcnB0In0.pjKqIVpE6fCqDVNCa205TVBCS0EgMH4aY3YrCEYpjCE'}
          reportServerUrl={'http://desktop-1mq5eqq:49987/reporting/api/site/acmerpt'}
          serviceUrl={'http://desktop-1mq5eqq:49987/reporting/reportservice/api/Designer'}
          //serviceAuthorizationToken = {`${rptToken}`}
         
        // serviceAuthorizationToken={JSON.stringify(rptToken)}
        // serviceAuthorizationToken={`Bearer ${window.localStorage.getItem('jwt')}`}

        //locale="fr-FR"
        >

        </BoldReportDesignerComponent>
      </div>
    </div>
  );
}