const EventFilters = ({ onFilter }) => {
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleFilter = () => {
        onFilter({ type, startDate, endDate });
    };

    return (
        <div>
            <select onChange={(e) => setType(e.target.value)} value={type}>
                <option value="">All Types</option>
                <option value="Cultural">Cultural</option>
                <option value="Adventure">Adventure</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Workshops">Workshops</option>
            </select>
            <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
            />
            <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
            />
            <button onClick={handleFilter}>Apply Filters</button>
        </div>
    );
};
