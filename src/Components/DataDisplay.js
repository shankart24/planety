import { useSelector } from "react-redux";

export default function DataDisplay() {
    const planetsState = useSelector(state => state.data);
    return (
        <div className="bg-purple-200">
            {planetsState.finalData?.map(item => {
                return (
                    <li key={item.id}>
                        {item.name} <br />
                    </li>
                );
            })}
        </div>
    );
}
