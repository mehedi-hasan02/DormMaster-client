import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMeal from '../../Hook/useMeal';
import allMealsCover from '../../assets/banner/cover1.jpg';
import Cover from '../Shared/Cover/Cover';
import MealCard from '../Shared/MealCard/MealCard';

const AllMeals = () => {
    const [meals, refetch, filter, setFilter, setSearch, searchText, setSearchText, minPrice, setMinPrice, maxPrice, setMaxPrice] = useMeal();
    const [displayedMeals, setDisplayedMeals] = useState([]);

    useEffect(() => {
        if (meals.length) {
            setDisplayedMeals(meals.slice(0, 3));
        }
        // fetchMoreData();
    }, [meals]);

    const fetchMoreData = () => {
        setTimeout(() => {
            setDisplayedMeals(prevMeals => [
                ...prevMeals,
                ...meals.slice(prevMeals.length, prevMeals.length + 3)
            ]);
        }, 1000);
    };

    const handleSearch = e => {
        e.preventDefault()

        setSearch(searchText)
    }

    const handelFilter = (e) => {
        e.preventDefault();
        setSearch(searchText)
    }

    const handleReset = () => {
        setFilter('')
        setSearch('')
        setSearchText('')
        setMinPrice('')
        setMaxPrice('')
    }

    return (
        <div>
            <Cover
                img={allMealsCover}
                title='CHOOSE YOUR MEAL'
            />
            <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between mb-10 md:px-2 gap-2 mt-8">
                <div className="text-center lg:text-left">
                    <select
                        onChange={e => {
                            setFilter(e.target.value)
                        }}
                        value={filter}
                        name='category'
                        id='category'
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Breakfast'>Breakfast</option>
                        <option value='Lunch'>Lunch</option>
                        <option value='Dinner'>Dinner</option>
                    </select>
                </div>

                <div>
                    <form onSubmit={handelFilter}>
                        <div className='flex gap-2'>
                            <input type="number"
                                onChange={e => setMinPrice(e.target.value)}
                                value={minPrice}
                                name='minPrice'
                                placeholder="low price"
                                className="input input-bordered w-full max-w-xs" />
                            <input type="number"
                                onChange={e => setMaxPrice(e.target.value)}
                                value={maxPrice}
                                name='maxPrice'
                                placeholder="high price" className="input input-bordered w-full max-w-xs" />
                            <button className='btn bg-orange-400 text-white px-5 -ml-2'>Filter</button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row md:flex-row gap-3">
                    <form onSubmit={handleSearch}>
                        <div className='flex p-1 overflow-hidden border rounded-lg w-[300px] md:w-[330px] lg:w-[330px] mx-auto focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                                name='search'
                                placeholder='Search'
                                aria-label='Search'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                    <button onClick={handleReset} className='btn'>
                        Reset
                    </button>
                </div>
            </div>
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
