import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionTitleProps, Header, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ThemeBuilder from '../theme/ThemeBuilder';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import PaymentGatewaySettings from '../paymentGateway/PaymentGatewaySettings';
import "../../features/syncFusion.css";

export default observer(function Settings (){

    const {  commonStore} = useStore();

    const{setSideBarDisplay}= commonStore;
  

    const [activeIndex, setActiveIndex] = useState(0);



   function  handleAccordionClick(titleProps: AccordionTitleProps)  {
      


      const index = Number(titleProps.index);
      let newIndex: number = activeIndex === index ? -1 : index

      setActiveIndex(newIndex!);
  
   }



   function content0() {
    return <div>
        Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.
      </div>;
      }
      function content1()  {
    return <div>
       <PaymentGatewaySettings/>
      </div>;
      }
      function content2() {
    return <div>
       <ThemeBuilder/>
      </div>;
      }

    useEffect(()=>{
      //show sidebar nav
      setSideBarDisplay(false);
     
    }, [setSideBarDisplay])

    return(
        <div className='pmpacomp' >
            <Header as='h2' content='Settings' />


            {/* <AccordionComponent expandMode='Multiple'>
        <AccordionItemsDirective>
         
          <AccordionItemDirective expanded={true} header='Payment Gateway' content={content1} />
          <AccordionItemDirective header='Theme Builder' content={content2} />
        </AccordionItemsDirective>
    </AccordionComponent> */}


            <Accordion  fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={(e, data) => (handleAccordionClick(data))}
        >
          <Icon name='dropdown' />
          Payment Gateway 
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        <PaymentGatewaySettings/>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={(e, data) => (handleAccordionClick(data))}
        >
          <Icon name='dropdown' />
          Theme Builder
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
         <ThemeBuilder/>
        </Accordion.Content>

      </Accordion>

      
            </div>
    )
})