const Checkbox = ({
    changeHandler,
    checkedStatus,
    displayName,
    name,
    value
}) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checkedStatus}
                name={name}
                value={value}
                onChange={changeHandler}
                className="h-4 w-4 text-gray-900 font-medium cursor-pointer"
            />
            <span className="ml-2 text-md  text-gray-900 ">{displayName}</span>
        </label>
    );
};

export default Checkbox;
