import React, { useEffect, useState } from 'react';
import './dashboardbuilder.css';

import {BoldBI} from './embedWrapper.js';
import Axios from 'axios';
import { RptCreds } from '../../../app/models/rptCreds';
import CommonStore from '../../../app/stores/commonStore';
import { useStore } from '../../../app/stores/store';

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
const userEmail= "abel9865@gmail.com"; //"demo@boldbi.com";
const userPassword= "Sw33tt34!"; //"Demo$786";
//var BoldBiObj = new BoldBI();
var dashboard;

export default function DashboardListing () {

    const[toke, setToke]= useState('');
    const[items, setItems] = useState<any[]>([]);
    const { commonStore, dashboardStore } = useStore();

  function renderDashboard(data:any): void {
    dashboard= BoldBI.create({
      serverUrl: rootUrl + siteIdentifier,
      dashboardId: data.Id,
      embedContainerId: "dashboard",
      mode: 'design',	
      embedType: BoldBI.EmbedType.Component,
      environment: environment,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl,
          headers: {
            'Authorization': "Bearer " + commonStore.token || window.localStorage.getItem("jwt")
          }

      }
  });

  console.log(dashboard);
  dashboard.loadDesigner();     
    
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


    dashboardStore.getDashboardItems().then(data => {

      console.log(Array.from(dashboardStore.dashboardItemRegistry.values()));

     console.log(dashboardStore.dashboardItemsByTitle);

  });

    // var dashboard = undefined;
    // //var querystring = require('querystring');
    // var token = "";
    //   var apiData: RptCreds =
    // {
    //   password: userPassword,
    //   userid: userEmail
    // }
    // Axios.post(rootUrl+'api/'+ siteIdentifier +'/get-user-key',
    // // querystring.stringify({
    // //         UserId: userEmail,
    // //         Password: userPassword
    // // })
    // serialize(apiData)
    // , {
    //   headers: { 
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // }).then(response => {
    //       var result = response;
    //       token = JSON.parse(result.data.Token).access_token;
    //       console.log(token);
    //       setToke(token);
    //       //Get Dashboards
    //   Axios.get(rootUrl+'api/'+ siteIdentifier +'/v2.0/items?ItemType=2',
    //   {
    //     headers: { 
    //       "Access-Control-Allow-Origin": "*",
    //      // "Authorization":'bearer ' + toke
    //      "Authorization":'bearer ' + commonStore.reportToken || window.localStorage.getItem("tk1")!
    //     }
    //   }).then(res => {
    //       var arrayOfObjects = res.data;
    //       setItems(arrayOfObjects);
    //       renderDashboard(arrayOfObjects[0]);
    //   },
    //   error => {
    //       setItems([]);
    //   });
    // },
    // error => {
    //    setToke("error");
    // });


  //   const script1 = document.createElement('script');
  // script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js";
  // script1.async = true;
  // document.body.appendChild(script1);

  // const script2 = document.createElement('script');
  // script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js";
  // script2.async = true;
  // document.body.appendChild(script2);

  // const script3 = document.createElement('script');
  // script3.src = "https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.0-beta/jsrender.min.js";
  // script3.async = true;
  // document.body.appendChild(script3);

  // const script4 = document.createElement('script');
  // script4.src = "https://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-2.1.0.min.js";
  // script4.async = true;
  // document.body.appendChild(script4);

  // const script5 = document.createElement('script');
  // script5.src = "https://cdn.boldbi.com/embedded-sdk/v5.1.55/embed-js.js";
  // script5.async = true;
  // document.body.appendChild(script5);

// return () => {
//     document.body.removeChild(script1);
//     document.body.removeChild(script2);
//     document.body.removeChild(script3);
//     document.body.removeChild(script4);
//     document.body.removeChild(script5);
//   }





    renderDashboard({Id:'9142af19-a581-43a4-9cd8-be04956272b9', Name:''})
  }, [toke, setToke, setItems, items, renderDashboard]  );

 
    return (
      <div id="DashboardListing">
          {/* <div id="container">
            <div className="header-section">
              <div id="grid-title">All Dashboard</div>
            </div>
            <div id="panel">
              {items.map((el) => 
                <button className="dashboard-item" attr-name ={el.Name} attr-id = {el.Id} value={el} onClick={((e) => renderDashboard(el))} >
                {el.Name}
                </button>
              )}
            </div>
          </div> */}
          <div id="viewer-section">
            <div id="dashboard"></div>
          </div>
      </div>
    )
  


}

