import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${users?.email}`);
            return res.data;
        }
    });

    console.log(payments);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Transactions ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.price}</td>
                                </tr>
                            ))
                        ) : (
                            <>
                                <td colSpan="4">
                                    <h3 className="text-4xl lg:mt-20">No Payment history</h3>
                                </td>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;