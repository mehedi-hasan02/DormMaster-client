import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMeal from '../../../Hook/useMeal';
import MealTab from './MealTab/MealTab';

const MealsCategory = () => {
    const [meals] = useMeal();

    return (
        <Tabs>
            <TabList>
                <Tab>All Meals</Tab>
                <Tab>Breakfast</Tab>
                <Tab>Lunch</Tab>
                <Tab>Dinner</Tab>
            </TabList>

            <TabPanel>
                <MealTab meals={meals}/>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
        </Tabs>
    );
};

export default MealsCategory;