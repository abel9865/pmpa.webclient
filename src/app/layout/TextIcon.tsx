import React from 'react'
import { Icon } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default function TextIcon(){

    const{layoutStore}=useStore();

    return (
        <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}>
            <Icon size='large'
                  color='teal'
                  name='home'/>
            <div style={{paddingLeft: '4px'}} hidden={layoutStore.layoutProps!.hideText}>
                {layoutStore.layoutProps!.children}
            </div>
        </div>
    );
}


