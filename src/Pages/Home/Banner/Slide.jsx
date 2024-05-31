

const Slide = ({ image, heading, description }) => {
    return (
        <div>
            <div
                className='w-full bg-center bg-cover h-[38rem] rounded-xl'
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                <div className='flex items-center justify-center w-full h-full bg-gray-900/50 rounded-2xl'>
                    <div className='text-center'>
                        <h1 className='text-xl lg:text-3xl font-semibold text-white lg:text-4xl p-5'>
                            {heading}
                        </h1>
                        <p className="text-white w-3/4 mx-auto">
                            {description}
                        </p>
                        <br />
                        <div className="lg:w-2/5 mx-auto">
                            <label className="input input-bordered flex items-center gap-2 relative">
                                <input type="text" className="grow" placeholder="Search" />
                                <span className="btn bg-[#55c2da] hover:bg-[#55c2da] text-white absolute right-0 px-8">Search</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;