export default function Search({search, setSearch, handleSearch}){
    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                    type="text"
                    placeholder="Enter City Name"
                    name="search"
                    value={search}
                    className="flex-1 h-14 px-4 rounded-lg bg-gray-700/30 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button 
                    className="h-14 px-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    onClick={handleSearch}
                >
                    Search Weather
                </button>
            </div>
        </div>
    )
}

