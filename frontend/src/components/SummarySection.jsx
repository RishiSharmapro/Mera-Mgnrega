const SummarySection = ({ title, items, color }) => (
  <div>
    <h4 className={`text-lg font-semibold ${color} mb-2`}>{title}</h4>
    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {items?.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

export default SummarySection;