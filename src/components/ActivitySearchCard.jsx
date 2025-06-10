const ActivitySearch = ({search, onSearchChange}) => { 
    return(
        <div className="flex items-center justify-center w-full md:w-[300px]">
            <input
                type="text"
                placeholder="Cari aktivitas..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export default ActivitySearch;