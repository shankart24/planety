import { useSelector } from "react-redux";
import Card from "../Card";

export default function DataDisplay() {
    const planetsState = useSelector(state => state.data);

    return (
        <div className="py-2">
            <div className="flex flex-col space-y-4 ">
                {planetsState.finalData?.length !== 0 ? (
                    planetsState.finalData?.map(item => {
                        return (
                            <Card
                                key={item.id}
                                name={item.name}
                                desc={item.description}
                            />
                        );
                    })
                ) : (
                    <p className="text-gray-600 text-md tracking-tight">
                        Nothing to Show!
                    </p>
                )}
            </div>
        </div>
    );
}
