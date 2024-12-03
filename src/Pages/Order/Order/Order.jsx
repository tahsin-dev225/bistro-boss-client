import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import OrderCard from '../OrderCard/OrderCard';
import { useParams } from 'react-router-dom';

const Order = () => {
    
    const [tabIndex , setTabIndex] = useState(0)
    const [menu] = useMenu();
    const {category} = useParams();
    console.log(category)
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <div>
            <Cover img={orderCover} title='Order Food'></Cover>
            <Tabs defaultIndex={tabIndex} className="" onSelect={(index) => console.log(index)}>
                <div className="flex justify-center">
                    <TabList className='my-10 '>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>soup</Tab>
                        <Tab>Desert</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <OrderCard items={salad}></OrderCard>
                </TabPanel>
                <TabPanel>
                    <OrderCard items={pizza}></OrderCard>
                </TabPanel>
                <TabPanel>
                    <OrderCard items={soup}></OrderCard>
                </TabPanel>
                <TabPanel>
                    <OrderCard items={desserts}></OrderCard>
                </TabPanel>
                <TabPanel>
                    <OrderCard items={drinks}></OrderCard>
                </TabPanel>
                
            </Tabs>
        </div>
    );
};

export default Order;