import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMeal from '../../../Hook/useMeal';
import MealTab from './MealTab/MealTab';

const MealsCategory = () => {
    const [meals] = useMeal();
    const breakfast = meals.filter(meal => meal.category === 'Breakfast');
    const lunch = meals.filter(meal => meal.category === 'Lunch');
    const dinner = meals.filter(meal => meal.category === 'Dinner');
    // console.log(meals);

    return (
        <div>
            <div className='text-center my-14 space-y-3'>
                <h2 className='text-4xl font-bold'>Meals by Category</h2>
                <p className='px-2 lg:w-3/4 mx-auto'>Browse our tasty meal options by category: Breakfast, Lunch, Dinner, or All Meals. Each card includes an image, rating, price, and a details button for more information. Enjoy a convenient and delightful dining experience!</p>
            </div>
            <Tabs>
                <TabList className='mb-5'>
                    <Tab>All Meals</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

                <TabPanel>
                    <MealTab meals={meals} />
                </TabPanel>
                <TabPanel>
                    <MealTab meals={breakfast} />
                </TabPanel>
                <TabPanel>
                    <MealTab meals={lunch} />
                </TabPanel>
                <TabPanel>
                    <MealTab meals={dinner} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default MealsCategory;