// import * as ReactDOM from "react-dom";
// import * as React from "react";
// import { SampleBase } from "./sample.base";
// import { enableRipple } from '@syncfusion/ej2-base';
// import { DashboardLayoutComponent, PanelModel, PanelsDirective, PanelDirective, ResizeArgs } from "@syncfusion/ej2-react-layouts";
// import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
// import { DialogComponent } from '@syncfusion/ej2-react-popups';
// import {
//     AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
//     Inject, AccumulationLegend, PieSeries, AccumulationTooltip,ColumnSeries, SeriesCollectionDirective, SeriesDirective, AccumulationTheme, IAccLoadedEventArgs,
//     AccumulationDataLabel, ChartComponent, Legend, Category, Tooltip,  DataLabel, SplineAreaSeries, DateTime, ILoadedEventArgs, ChartTheme
//   } from "@syncfusion/ej2-react-charts";



// import "./dashboardbuilder.css";
// import { useState } from "react";


// enableRipple(true);


// export default function DashboardBuilder () {

//     const[hideDialog, setHideDialog]= useState(false);

//    let primary_class:string = "dashboard-buttons";


//     let btnobj: ButtonComponent;
//     let dashboardObj: DashboardLayoutComponent;
//     let dialogObj: DialogComponent;
  
//     function btnClick() {
//         if (btnobj.element.classList.contains('e-active')) {
//             dashboardObj.allowDragging = true;
//             dashboardObj.allowResizing = true;
//             btnobj.content = "Save";
//             //btnobj.iconCss = 'save';
//             btnobj.cssClass = 'dashboard-buttons';
//             document.getElementById('dialogBtn')!.style.display = 'block';
//         }else {
//             dashboardObj.allowDragging = false;
//             dashboardObj.allowResizing = false;
//             btnobj.content = "Edit";
//             //btnobj.iconCss = 'edit';
//             btnobj.cssClass = 'dashboard-buttons';

//             document.getElementById('dialogBtn')!.style.display = 'none';
//         }
//     }
//     function onPanelResize(args: ResizeArgs) {
//         if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
//             let chartObj: any = ((args.element.querySelector('.e-panel-container .e-panel-content div div')) as any).ej2_instances[0];
//             chartObj.height = '95%';
//             chartObj.width = '100%';
//             chartObj.refresh();
//         }
//     }
//     function content(data: any): JSX.Element {
//         return (
//             <div id="dialogcontent">
//                 <div>
//                     <div id="linetemplate" >
//                         <p className="dialog-text">Linechart (1x1) </p>
//                     </div>
//                     <div id="pietemplate" >
//                         <p className="dialog-text">Piechart (1x1) </p>
//                     </div>
//                     <div id="splinetemplate" >
//                         <p className="dialog-text">Splinechart (2x1) </p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     let count: number = 4;
//     function onAdd(): void {
//         //let proxy: any = this;
//         let panel: PanelModel[] = [{
//             "id": count.toString() + "_layout", "sizeX": 2, "sizeY": 2, "row": 0, "col": 0,
//             header: "<div>Panel" + count.toString() + "</div>", content: "<div></div>"
//         }];
//         count = count + 1;
//         dashboardObj.addPanel(panel[0]);
//     }

//     function splineTemplate(): JSX.Element{
//         let splineData1: object[] = [
//             { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
//             { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
//             { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
//             { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
//             { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
//         ];

//         let splineData2: object[] = [
//             { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
//             { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
//             { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
//             { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
//             { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
//         ];
//         return(
//         <div className="template" >
//             <ChartComponent style={{ "height":"100%", "width":"100%", textAlign: "center" }}
//                         primaryXAxis={{
//                             valueType: 'DateTime',
//                             labelFormat: 'MMM',
//                             majorGridLines: { width: 0 },
//                             intervalType: 'Months',
//                             edgeLabelPlacement: 'Shift'
//                         }}
//                         primaryYAxis={{
//                             labelFormat: '{value}%',
//                             lineStyle: { width: 0 },
//                             maximum: 4, interval: 1,
//                             majorTickLines: { width: 0 },
//                             minorTickLines: { width: 0 }
//                         }}
//                         load={load}
//                         chartArea={{ border: { width: 0 } }}>
//                         <Inject services={[SplineAreaSeries, DateTime, Legend]} />
//                         <SeriesCollectionDirective>
//                             <SeriesDirective dataSource={splineData1} xName='x' yName='y' name='Jan'
//                                 opacity={0.5} type='SplineArea' width={2} fill='rgb(239, 183, 202)'>
//                             </SeriesDirective>
//                             <SeriesDirective dataSource={splineData2} xName='x' yName='y' name='Feb'
//                                 opacity={0.5} type='SplineArea' width={2}  fill='rgb(0, 189, 174)'>
//                             </SeriesDirective>
//                         </SeriesCollectionDirective>
//                     </ChartComponent>
//             </div>
//         );
//     }

//     function lineTemplate(): JSX.Element{
//         let data1: any[] = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
//         let data2: any[] = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
//         let data3: any[] = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];
//         return(
//         <div className="template" >
//                 <ChartComponent style={{"height":"100%", "width":"100%"}} 
//                 load={load}
//                         primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }}
//                         primaryYAxis={{
//                             majorGridLines: { width: 0 },
//                             majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
//                         }}
//                         chartArea={{ border: { width: 0 } }}
//                         tooltip={{ enable: true }}>
//                         <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
//                         <SeriesCollectionDirective>
//                             <SeriesDirective dataSource={data1} xName='x' yName='y' name='Jan' type='Column'
//                                 marker={{ dataLabel: { visible: false }}} fill = '#00bdae'>
//                             </SeriesDirective>
//                             <SeriesDirective dataSource={data2} xName='x' yName='y' name='Feb' type='Column'
//                                 marker={{ dataLabel: { visible: false }}} fill = '#e56691'>
//                             </SeriesDirective>
//                             <SeriesDirective dataSource={data3} xName='x' yName='y' name='Mar' type='Column'
//                                 marker={{ dataLabel: { visible: false }}} fill = '#357cd2'>
//                             </SeriesDirective>
//                         </SeriesCollectionDirective>
//                     </ChartComponent>
//             </div>
//         );
//     }

//     function pieTemplate(): JSX.Element{
//         let pieData: object[] = [
//             { "x": "Jan", y: 12.5, text: "January" },
//             { "x": "Feb", y: 25, text: "February" },
//             { "x": "Mar", y: 50, text: "March" },
//         ];
//         let piePalette: string[] = ["#00bdaed1", "#357cd2bf", "#e56691e8"];
//         return(
//         <div className="template" >
//             <AccumulationChartComponent style={{"height":"100%", "width":"100%"}}
//               legendSettings={{ visible: false }}
//               enableSmartLabels={true}
//               enableAnimation={true}
//               center={{x: '50%', y: '50%'}}
//               load={Pieload}
//               tooltip={{enable: true, header: '<b>${point.x}</b>', format: 'Composition : <b>${point.y}%</b>' }}>
//               <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
//               <AccumulationSeriesCollectionDirective>
//                 <AccumulationSeriesDirective dataSource={pieData} name='Earnings' xName='x' yName='y'
//                   dataLabel={{ visible: true, position: 'Inside', name: 'value', font: { fontWeight: '600' }}}
//                   radius='100%' innerRadius="40%" palettes ={ ['#00bdae', '#357cd2', '#e56691']}>
//                 </AccumulationSeriesDirective>
//               </AccumulationSeriesCollectionDirective>
//             </AccumulationChartComponent>
//         </div>
//         );
//     }


//     let cellSpacing: number [] = [10, 10];


//         return (
//             <div>
//                 <div id='edit_target' className="control-section">
//                 <div>
//                     <div style={{"width":"100%" ,"marginBottom": "10px", "marginTop": "10px", "height": "30px"}}>
//                         <ButtonComponent  cssClass='dashboard-buttons' ref={(scope) => { btnobj = scope!; }} 
//                         //iconCss='edit' 
//                             isToggle={true} onClick={ btnClick } style={{"float":"right", "width": "75px"}}>
//                             Edit
//                         </ButtonComponent>
//                     </div>
//                     <div style={{"padding":"5px","marginBottom":"5px", "textAlign": "end"}}>
//                         <div id="dialogBtn" className="add-widget-button e-control e-btn e-lib" onClick={ dlgClick }>
//                             Add New Widget
//                         </div>
//                     </div>
//                 </div>
//                 <DashboardLayoutComponent id="edit_dashboard" columns={2} cellSpacing={cellSpacing} ref={(scope) => { dashboardObj = scope!; }} 
//                  resizeStop={ onPanelResize} allowResizing={false} allowDragging={false}>
//                 <PanelsDirective>
//                     <PanelDirective sizeX={1} sizeY={1} row={0} col={0} content={lineTemplate as any} header="<div>Line Chart</div>"></PanelDirective>
//                     <PanelDirective sizeX={1} sizeY={1} row={0} col={1} content={pieTemplate as any} header="<div>Pie Chart</div>"></PanelDirective>
//                     <PanelDirective sizeX={2} sizeY={1} row={1} col={0} content={splineTemplate as any} header="<div>Spline Chart</div>"></PanelDirective>
//                 </PanelsDirective>
//                 </DashboardLayoutComponent>
//                 </div>
//                 <DialogComponent id="listdialog" width="500px" height="260px" visible={false} header={"Add a widget"} showCloseIcon={true}
//                 animationSettings={{effect:'Zoom'}} isModal={true} target='#edit_target' ref={(scope) => { dialogObj = scope!; }} content= {content as any}>
//                 </DialogComponent>
//             </div>
//         )
//     function dlgClick(): void {
//        dialogObj.visible = true;
//         document.getElementById('linetemplate')!.onclick = () => {
//             let countValue: string = count.toString();
//             let panel: PanelModel[] = [{
//                 'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
//                 header: '<div>Line Chart</div>', content: lineTemplate as any
//             }];
//             count = count + 1;
//             dashboardObj.addPanel(panel[0]);
//             dialogObj.visible = false;
//             (document.getElementById("_layout" + countValue)!.querySelector(".e-control.e-chart") as any).ej2_instances[0].refresh();
//         };
//         document.getElementById('pietemplate')!.onclick = () => {
//             let countValue: string = count.toString();
//             let panel: PanelModel[] = [{
//                 'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
//                 header: '<div>Pie Chart</div>', content: pieTemplate as any
//             }];
//             count = count + 1;
//             dashboardObj.addPanel(panel[0]);
//            dialogObj.visible = false;
//            (document.getElementById("_layout" + countValue)!.querySelector(".e-control.e-accumulationchart") as any).ej2_instances[0].refresh();
//         };
//         document.getElementById('splinetemplate')!.onclick = () => {
//             let countValue: string = count.toString();
//             let panel: PanelModel[] = [{
//                 'id': '_layout' + countValue, 'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
//                 header: '<div>Spline Chart</div>', content: splineTemplate as any
//             }];
//             count = count + 1;
//             dashboardObj.addPanel(panel[0]);
//             dialogObj.visible = false;
//             (document.getElementById("_layout" + countValue)!.querySelector(".e-control.e-chart") as any).ej2_instances[0].refresh();
//         };
//     }

//     function load(args: ILoadedEventArgs): void {
//         let selectedTheme: string = window.location.hash.split('/')[1];
//         selectedTheme = selectedTheme ? selectedTheme : 'Material';
//         args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
//     };

//     function Pieload(args: IAccLoadedEventArgs): void {
//         let selectedTheme: string = window.location.hash.split('/')[1];
//         selectedTheme = selectedTheme ? selectedTheme : 'Material';
//         args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as AccumulationTheme;
//     }
// }



import React, { useEffect, useState } from 'react';
import './dashboardbuilder.css';

import {BoldBI} from './embedWrapper.js';
import Axios from 'axios';
import { RptCreds } from '../../../app/models/rptCreds';
import CommonStore from '../../../app/stores/commonStore';
import { useStore } from '../../../app/stores/store';
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
const userEmail= "abel9865@gmail.com"; //"demo@boldbi.com";
const userPassword= "Sw33tt34!"; //"Demo$786";
//var BoldBiObj = new BoldBI();
var dashboard;

export default function DashboardBuilder () {
    const { id } = useParams<{ id: string }>();
    const[toke, setToke]= useState('');
    const[items, setItems] = useState<any[]>([]);
    const { commonStore, dashboardStore } = useStore();

  function renderDashboard(data:any): void {
    
    if(id){

        dashboard= BoldBI.create({
            serverUrl: rootUrl + siteIdentifier,
            //dashboardId: data.Id,
            dashboardId: id,
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

    }
    else{

        dashboard= BoldBI.create({
            serverUrl: rootUrl + siteIdentifier,
           
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

    }
  

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


    renderDashboard({Id:'9142af19-a581-43a4-9cd8-be04956272b9', Name:''})
  }, [toke, setToke, setItems, items, renderDashboard]  );

 
    return (
      <div id="DashboardListing">
         
          <div id="viewer-section">
            <div id="dashboard"></div>
          </div>
      </div>
    )
  


}

