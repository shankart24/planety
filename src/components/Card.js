const Card = ({ name, desc }) => {
    return (
        <div className="rounded-md shadow-md px-3 py-6  text-gray-900 flex items-center ">
            <div className="">
                <h2 className="text-lg font-semibold   tracking-tight ">
                    {name}
                </h2>
                <p className="text-gray-600 text-sm">{desc}</p>
            </div>
        </div>
    );
};

export default Card;
