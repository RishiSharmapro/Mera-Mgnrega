import React, { useState, useContext } from 'react';
import { MetricCard, DetailedInfo, Icon } from './index.js';
import '../index.css';
import useDistrictData from '../hooks/UseDistrictData.jsx';
import { LanguageContext } from '../context/LanguageContext.js';
import { districts, months, fin_years, states } from '../constants.js';


// Specific icons for each metric
const Icons = {
  families: <Icon path="/families-worked.svg" />,
  projects: <Icon path="project-completed.svg" />,
  wage: <Icon path="indian-rupee.svg" />,
  days: <Icon path="work-per-family.svg" />,
  women: <Icon path="women-participation.svg" />,
  timely: <Icon path="timely-payments.svg" />,
  hundredDays: <Icon path="calendar-days.svg" />,
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);


export default function GetDistrictData() {
  
  const [state, setState] = useState("Rajasthan");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("JAIPUR");
  const [month, setMonth] = useState("Jan");
  const [fin_year, setFin_year] = useState("2024-2025");
  const { data: monthlyData, isLoading, isError } = useDistrictData(
    selectedDistrict,
    fin_year,
    month,
    state
  );

  const useLang = () => useContext(LanguageContext);
  const { t } = useLang();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8">
      <div className="continer mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-blue-800">{t("title")}</h1>
          <p className="text-gray-600 mt-2">{t("subtitle")}</p>
        </header>

        <div className="mb-6 flex justify-center gap-3  md:flex-row flex-col">
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">{t("select_state")}</label>
            <select
              id="state-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {states.map(state => (
                <option key={state} value={t(state)}>{t(state)}</option>
              ))}
            </select>

          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="district-select" className="block text-sm font-medium text-gray-700 mb-2">{t("select_district")}</label>
            <select
              id="district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {(districts).map(district => (
                <option key={district} value={district}>{t(district)}</option>
              ))}
            </select>

          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2">{t("select_month")}</label>
            <select
              id="month-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>{t(month)}</option>
              ))}
            </select>
          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="fin_year-select" className="block text-sm font-medium text-gray-700 mb-2">{t("select_year")}</label>
            <select
              id="fin_year-select"
              value={fin_year}
              onChange={(e) => setFin_year(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {fin_years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

          </div>
        </div>

        {isError || !monthlyData ? (
          <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Data Not Available</h2>
              <p className="text-gray-700">{t("Sorry, we do not have data for")} {t(selectedDistrict)}, {t(state)} {t("for the financial year")} {fin_year}.</p>
              <p className="text-gray-700">{t("Either the data is not available or the parameters are incorrect.")}</p>
            </div>
          </div>
          ) : (
            <>
            <div className="bg-white p-6 rounded-xl shadow-lg">

            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-600">{t(monthlyData?.district)}, {t(monthlyData?.state)}</h2>
                <p className="text-gray-500">{monthlyData?.date}</p>
              </div>
              <div className="text-blue-500">
                <Icon path="location.svg" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard icon={Icons.families} label={t("families_worked")} value={monthlyData?.Total_Households_Worked} unit="" color="border-green-500" />
              <MetricCard icon={Icons.projects} label={t("projects_completed")} value={monthlyData?.Number_of_Completed_Works} unit="" color="border-green-500" />
              <MetricCard icon={Icons.wage} label={t("average_wage")} value={`₹${monthlyData?.Average_Wage_rate_per_day_per_person.toFixed(2)}`} unit={`/ ${t("day")}`} color="border-green-500" />
              <MetricCard icon={Icons.days} label={t("work_per_family")} value={monthlyData?.Average_days_of_employment_provided_per_Household} unit={t("days")} color="border-yellow-500" />
              <MetricCard icon={Icons.women} label={t("women_participation")} value={monthlyData?.Women_Persondays} unit={t("person_days")} color="border-green-500" />
              <MetricCard icon={Icons.timely} label={t("timely_payments")} value={monthlyData?.percentage_payments_gererated_within_15_days} unit="" color="border-green-500" />
              <MetricCard icon={Icons.hundredDays} label={t("families_100_days")} value={monthlyData?.Total_No_of_HHs_completed_100_Days_of_Wage_Employment} unit="" color="border-red-500" />
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                >
                {showDetails ? t("hide_details") : t("more_details")}
              </button>
            </div>

            {showDetails && <DetailedInfo data={monthlyData} />}
          </div>
          </>
          )}
    </div>
    </div >
  );
}
