export default function Navbar() {
    return (
        <nav className="bg-blue-900">
            <div className="max-w-5xl mx-auto px-2 ">
                <div className="relative flex items-center justify-between h-20 ">
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7  w-7 text-white mr-2 mt-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h1 className="text-white text-2xl md:text-3xl tracking-tighter font-semibold">
                            Planety
                        </h1>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="hidden sm:block ml-3 relative">
                            <button
                                type="button"
                                className="flex text-sm rounded-full focus:outline-none  items-center"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <img
                                    className=" h-7 w-7 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <h2 className="text-white text-md tracking-tight font-medium ml-2">
                                    Jason Bourne
                                </h2>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
