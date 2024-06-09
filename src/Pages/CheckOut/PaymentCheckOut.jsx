import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";


const PaymentCheckOut = ({ price }) => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();

    

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiosSecure, price]);

    const handelSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: users?.email || 'anonymous',
                    name: users?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error: ', confirmError);
        } else {
            console.log('payment intent: ', paymentIntent);
        }
    }

    return (
        <form onSubmit={handelSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {
                <p className="text-red-500">{error}</p>
            }
            <button className="btn bg-orange-400 text-white mt-5 flex" type="submit" disabled={!stripe}>
                Pay
            </button>

        </form>
    );
};

export default PaymentCheckOut;