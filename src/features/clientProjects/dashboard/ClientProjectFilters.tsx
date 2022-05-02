import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ClientProjectFilters(){
    return (
<>

<Menu vertical size = 'large' style={{width:'100%'}}>
<Header icon='filter' attached color='teal' content='Filter' />
<Menu.Item content = 'All Solutions' />
<Menu.Item content = ""/>
<Menu.Item content = 'All Solutions' />
</Menu>
       <Header />
<Calendar/>
</>


 
    )
}