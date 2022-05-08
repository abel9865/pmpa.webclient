import React from 'react';
import ReactDOM from 'react-dom';
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import './app/layout/styles.css';
// import 'antd/dist/antd.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
// import "../node_modules/@syncfusion/ej2-grids/styles/tailwind.css";
import { registerLicense } from '@syncfusion/ej2-base';




// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFaclhJW3xPYVF2R2FJflx6dlFMZVxBNQtUQF1hS35WdkJiWXxXc31XQmZc');

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
