import { Link } from 'react-router-dom';
import errorImg from '../../assets/others/404.jpg'

const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <div>
                        <img src={errorImg} alt="" />
                    </div>
                    <Link to='/' rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-orange-400 dark:text-gray-50">Back to homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;