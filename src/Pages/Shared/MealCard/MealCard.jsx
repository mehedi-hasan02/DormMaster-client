

const MealCard = ({ meal }) => {
    return (
        <div className="card bg-base-100 shadow-xl mb-5">
            <figure><img src={meal.image} alt="Meals" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {meal.name}
                </h2>
                <p>${meal.price}</p>
                <div className="card-actions justify-end">
                    {/* <div className="badge badge-outline">Fashion</div> */}
                    <button className="badge badge-outline">Details</button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;