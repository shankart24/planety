import { useSelector } from "react-redux";

export default function DataDisplay() {
    const planetsState = useSelector(state => state.data);
    return (
        <div className="py-2">
            <div class="flex flex-col space-y-4 ">
                {planetsState.finalData?.length !== 0 ? (
                    planetsState.finalData?.map(item => {
                        return (
                            <div
                                key={item.id}
                                className="rounded-md shadow-md px-3 py-6  text-gray-900 flex items-center "
                            >
                                <div className="">
                                    <h2 class="text-lg font-semibold   tracking-tight ">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
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
