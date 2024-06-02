

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-2/5 mx-auto text-center space-y-2 my-8">
            <p className="text-[#D99904]">---{subHeading}---</p>
            <h3 className="text-4xl border-y-4 p-5">{heading}</h3>
        </div>
    );
};

export default SectionTitle;