import React from 'react';

import './globals';
// Needed for redux-saga es6 generator support
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


import ReactDOM from 'react-dom';
import 'react-calendar/dist/Calendar.css';
 import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';


import './app/layout/styles.css';
import './app/layout/layout.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { registerLicense } from '@syncfusion/ej2-base';




// Registering Syncfusion license key
//registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFaclhJW3xPYVF2R2FJflx6dlFMZVxBNQtUQF1hS35WdkJiWXxXc31XQmZc');

registerLicense('Mgo+DSMBaFt/QHFqVVhkW1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9jTH9adERnX3pddnVXQw==;Mgo+DSMBPh8sVXJ0S0d+XE9AcVRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xTc0RqW35adnFWQGJYVA==;ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBiUH1fdHJQRWZfVEE=;NjQyMDI5QDMyMzAyZTMxMmUzMFRDRko3VlE5MXBYclk5UEVUTG1YZ0FJSWpSZzNHaFJqODh3RnpZWVZ4K0E9;NjQyMDMwQDMyMzAyZTMxMmUzME92N01SbXgvV0NXZ0pvTjZiWUJYNEpaRE1SV0wrTGdwcmtvdmFIdlFQY0E9;NRAiBiAaIQQuGjN/V0Z+XU9EaFtFVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdEVmWHZccXBTQ2NbUEVz;NjQyMDMyQDMyMzAyZTMxMmUzMFBBMjhlL1hhNGVxT3JsSUhsdTdTYldxVkNpblpvYXBDbnlTSE9WaEVzOWc9;NjQyMDMzQDMyMzAyZTMxMmUzMEFQcGFOOTNzVnI5MEd5cmI1c2VqWFhZUDNrUTJWZjRCOGtNeGJmU0w4YXM9;Mgo+DSMBMAY9C3t2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBiUH1fdHJQRWdUWUE=;NjQyMDM1QDMyMzAyZTMxMmUzMEwzSTZZUnJWQll3bThaQkpqK05vWHlKTlh4ZU53WjU1ZGFWbXorbjR5ejg9;NjQyMDM2QDMyMzAyZTMxMmUzMG5SZU1ZV2RmbkZPQndzeEpTWUl2SFBiMTNUSVZacXI5UktGR3dzKytLazA9');

export const history = createBrowserHistory();


ReactDOM.render(

<StoreContext.Provider value={store}>
  <Router history = {history}>
  <App />
  </Router>

</StoreContext.Provider>,

 
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
