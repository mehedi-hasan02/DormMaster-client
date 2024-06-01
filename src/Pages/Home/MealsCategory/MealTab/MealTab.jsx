import MealCard from '../../../Shared/MealCard/MealCard'

const MealTab = ({meals}) => {
    return (
        <div className='grid lg:grid-cols-3 gap-8'>
            {
                meals.map(meal=> <MealCard key={meal._id} meal={meal}></MealCard>)
            }
        </div>
    );
};

export default MealTab;