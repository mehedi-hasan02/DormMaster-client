import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Footer = () => {

    const handelNewsletter = e => {
        e.preventDefault();
        const form = e.target;

        Swal.fire({
            icon: "success",
            title: "Thank you for subscribing to our newsletter!",
            showConfirmButton: false,
            timer: 1500
        });

        form.reset();
    }


    return (
        <footer className="footer p-10 bg-neutral text-neutral-content mt-14">
            <aside>
                <div className="space-y-3 ml-20">
                    <h3 className="text-3xl">Support</h3>
                    <p>Phone: +8801300000000 (10AM - 10PM)</p>
                    <p>Email: dormmaster@support.com</p>
                </div>
            </aside>
            <nav>
                <h6 className="text-3xl">Follow Us</h6>
                <p>SOCIAL MEDIA CHANNELS</p>
                <div className="grid grid-flow-col gap-4">
                    <Link className="w-5">
                        <FaFacebookF className="text-blue-500 w-5 h-6"/>
                    </Link>
                    <Link>
                        <FaTwitter className="text-blue-500 w-5 h-6"/>
                    </Link>
                    <Link>
                        <FaInstagram className=" w-5 h-6"/>
                    </Link>
                </div>
            </nav>
            <nav>
                <h6 className="text-3xl">Our Newsletter</h6>
                <p>SIGN UP FOR SPECIAL OFFERS</p>
                <div className="mt-2">
                    <form onSubmit={handelNewsletter}>
                        <label className="input input-bordered flex items-center gap-2 relative">
                            <input type="email" className="grow text-black w-[260px]" placeholder="E-mail" />
                            <button className="btn absolute right-0 bg-[#c19b76] p-2">SUBSCRIBE</button>
                        </label>
                    </form>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;