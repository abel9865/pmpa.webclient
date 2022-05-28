/// <reference path="grapejs.d.ts" />



import React, {Fragment, Component, useEffect, useState} from 'react';

import grapesjs from 'grapesjs'

import gjsPresetWebpage from 'grapesjs-preset-webpage';

import 'grapesjs/dist/css/grapes.min.css';

import './formbuilder.css'

// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';

// import 'grapesjs/dist/grapes.min.js';

// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';


import 'grapesjs-preset-webpage';
 
 
 //declare let GrapesjsReact: any;
 //declare let grapesjs: any;


export default function FormBuilder (){


   

    // const [htmlString, setHtmlString] = useState(null);
    // const [cssString, setCssString] = useState("");
    // const [pluginLoaded, setPluginLoaded] = useState(false);
    // const [editor, setEditor] = useState(null);


   

//const[editor, setEditor] = useState<grapesjs.Editor>();

const[editor, setEditor] = useState(null);

useEffect(()=>{
    const editor = grapesjs.init({
        container:"#editor",
        plugins:[gjsPresetWebpage],
        pluginsOpts:{
            
        }
    });
    setEditor(editor);
}, []);

// useEffect(()=>{
//    grapesjs.init({
//        container: '#gjs',
//        plugins: ['gjs-preset-webpage'],
//    })
// }, []);


return(

   <div id="editor"></div>
   
/* <Fragment>
<div id='gps'>

</div>
</Fragment> */
  

)

}