/// <reference path="grapejs.d.ts" />

/// <reference path="grapejsblockbasic.d.ts" />

import React, {Fragment, Component, useEffect, useState} from 'react';

import grapesjs from 'grapesjs'

// import gjsPresetWebpage from 'grapesjs-preset-webpage';

import gjsBlockBasic from 'grapesjs-blocks-basic';

import 'grapesjs/dist/css/grapes.min.css';

import './formbuilder.css'



 



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
        plugins:[gjsBlockBasic],
        pluginsOpts:{
            gjsPresetWebpage:{},
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