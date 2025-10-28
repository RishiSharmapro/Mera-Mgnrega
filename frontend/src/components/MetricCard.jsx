const MetricCard = ({ icon, label, value, unit, color }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 border-l-4 ${color}`}>
        <div className="shrink-0 text-gray-600">{icon}</div>
        <div>
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-800">
                {value} <span className="text-base font-normal">{unit}</span>
            </p>
        </div>
    </div>
);

export default MetricCard;