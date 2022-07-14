// import React, { useEffect } from 'react'
// import { Header } from 'semantic-ui-react';
// import { useStore } from '../../app/stores/store';

// export default function ConnectionForm (){

//     const {  commonStore} = useStore();

//     const{setSideBarDisplay}= commonStore;
  
  
//     useEffect(()=>{
//       //display sidebar nav
//       setSideBarDisplay(false);
     
//     }, [setSideBarDisplay])

//     return(
//         <div className='pmpacomp' >
//             <Header as='h2' content='Add/Edit Connection' />
//             </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import './connectors.css';


import {BoldBI} from './EmbedWrapper.js';
import Axios from 'axios';
import { useParams } from 'react-router-dom';


//For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
const siteIdentifier = "site/acmebi";

//Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
const environment = "onpremise";

//ASP.NET Core application would be run on http://localhost:61377/, which needs to be set as `apiHost`
const apiHost="http://localhost:5000/"

//Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
const rootUrl = "http://desktop-1mq5eqq:49987/bi/"; //"https://demo-chargebackgurus.boldbi.com/bi/";

//Url of the GetDetails action in ValuesController of the ASP.NET Core application
const authorizationUrl="Dashboard/getdetails";

//Enter your BoldBI credentials here
// const userEmail= "useyouruser"; //"demo@boldbi.com";
// const userPassword= "useyourpassword"; //"Demo$786";

const userEmail= "abel9865@gmail.com"; //"demo@boldbi.com";
const userPassword= "Sw33tt34!"; //"Demo$786";

var BoldBiObj = new BoldBI();
var dashboard;
var datasource;

export default function Connectors() {

  const { id } = useParams<{ id: string }>();

  function renderDashboard(data:any): void {
    dashboard= BoldBI.create({
      serverUrl: rootUrl + siteIdentifier,
      dashboardId: data.Id,
      embedContainerId: "dashboard_container",
      mode: 'design',	
      embedType: BoldBI.EmbedType.Component,
      environment: environment,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl,
          headers: {
            'Authorization': "Bearer " +  window.localStorage.getItem("jwt")
          }
      }
  });

  //console.log(dashboard);
  dashboard.loadDesigner();     
    
  }

  function renderNewDataSource(): void {
    datasource= BoldBI.create({
      serverUrl: rootUrl + siteIdentifier,
      //datasourceId: data.Id,
      embedContainerId: "dashboard",
      mode: 'connection',
     // mode:'datasource'	,
      embedType: BoldBI.EmbedType.Component,
      environment: environment,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl,
          headers: {
            'Authorization': "Bearer " +  window.localStorage.getItem("jwt")
          }
      }
  });

  console.log(datasource);
  datasource.loadDatasource();     
    
  }


  function renderExistingDataSource(data:any): void {
    datasource= BoldBI.create({
      serverUrl: rootUrl + siteIdentifier,
      datasourceId: data.Id,
      embedContainerId: "dashboard",
      //mode: 'connection',
     mode:'datasource'	,
      embedType: BoldBI.EmbedType.Component,
      environment: environment,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl,
          headers: {
            'Authorization': "Bearer " +  window.localStorage.getItem("jwt")
          }
      }
  });

  console.log(datasource);
  datasource.loadDatasource();     
    
  }

 function serialize (obj:any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }



  useEffect(() => {
   if(id){
    renderExistingDataSource({Id:id, Name:''})
   }
   else{
    renderNewDataSource()
   }
   
  }, []  );

 
    return (
     <div id="DashboardListing">
         <div id="viewer-section">
         <div id="dashboard"></div>
         </div>
     </div>
          
        
    )
  


}

