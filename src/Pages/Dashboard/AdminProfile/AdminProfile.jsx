import { FaUtensils } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useMeal from "../../../Hook/useMeal";


const AdminProfile = () => {
    const { users } = useAuth();
    const [meals] = useMeal(); 
    const myAddedMeal = meals.filter(meal=>meal?.adminEmail === users?.email);
    const headingStyle = {
        color: '#151515',
        fontFamily: 'Cinzel',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
    };
    return (
        <div className="mt-10">
            <h3 style={headingStyle}>Welcome! {users?.displayName}</h3>
            <div className="flex flex-col lg:flex-row mt-6">
                <div className="bg-[#FFEDD5] lg:w-1/2 p-24 flex flex-col gap-4 justify-center items-center">
                    <div className="avatar">
                        <div className="w-36 rounded-full">
                            <img src={users?.photoURL} />
                        </div>
                    </div>
                    <div>
                        <h1 style={headingStyle}>{users?.displayName}</h1>
                        <p>{users?.email}</p>
                    </div>
                </div>
                <div className="bg-[#FEF9C3] lg:w-1/2">
                    <div className="p-20">
                        <h3 style={headingStyle}>Your Activities</h3>
                        <p className="flex gap-1 items-center text-[#FFBB28]">
                            <FaUtensils />
                            Add Meals: <span>{myAddedMeal?.length}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;