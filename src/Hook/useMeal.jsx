import { useEffect, useState } from "react";


const useMeal = () => {
    const [meals, setMeals] = useState([]);

    useEffect(()=>{
        fetch('meals.json')
        .then(res=>res.json())
        .then(data=>{
            setMeals(data)
        })
    },[])

    console.log(meals);
    return [meals];
};

export default useMeal;