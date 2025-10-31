import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const displayNameToLabel = {
    families_worked: "Total_Households_Worked",
    projects_completed: "Number_of_Completed_Works",
    average_wage: "Average_Wage_rate_per_day_per_person",
    work_per_family: "Average_days_of_employment_provided_per_Household",
    women_participation: "Women_Persondays",
    timely_payments: "percentage_payments_gererated_within_15_days",
    families_100_days: "Total_No_of_HHs_completed_100_Days_of_Wage_Employment",
    ongoing_projects: "Number_of_Ongoing_Works",
    total_money_spent: "Total_Exp",
    sc_work: "SC_persondays",
    st_work: "ST_persondays",
};

const CompareMetricChart = ({ district1, district2, district1Data, district2Data, label, displayName }) => {
  const data = [
    {
      name: displayName,
      [district1]: district1Data[displayNameToLabel[label]],
      [district2]: district2Data[displayNameToLabel[label]],
    },
  ];

  return (
    <div className="p-6 rounded-b-2xl rounded-2x bg-white shadow-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        {displayName}: {district1} vs {district2}
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis type="number" />
            <XAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey={district1} fill="#4f46e5" barSize={40} radius={[8, 8, 0, 0]} />
            <Bar dataKey={district2} fill="#f59e0b" barSize={40} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompareMetricChart;
