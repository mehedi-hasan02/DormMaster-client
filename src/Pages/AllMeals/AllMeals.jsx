import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMeal from '../../Hook/useMeal';
import allMealsCover from '../../assets/banner/cover1.jpg';
import Cover from '../Shared/Cover/Cover';
import MealCard from '../Shared/MealCard/MealCard';

const AllMeals = () => {
    const [meals] = useMeal();
    const [displayedMeals, setDisplayedMeals] = useState([]);

    useEffect(() => {
        if (meals.length) {
            setDisplayedMeals(meals.slice(0, 21));
        }
    }, [meals]);

    const fetchMoreData = () => {
        setTimeout(() => {
            setDisplayedMeals(prevMeals => [
                ...prevMeals,
                ...meals.slice(prevMeals.length, prevMeals.length + 21)
            ]);
        }, 1000);
    };

    return (
        <div>
            <Cover
                img={allMealsCover}
                title='CHOOSE YOUR MEAL'
            />
            <InfiniteScroll
                dataLength={displayedMeals.length}
                next={fetchMoreData}
                hasMore={displayedMeals.length < meals.length}
                loader={
                    <div className='text-center mt-2'>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                }
            >
                <div className='grid lg:grid-cols-3 gap-8 mt-10'>
                    {
                        displayedMeals.map(meal => <MealCard key={meal._id} meal={meal} />)
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default AllMeals;
