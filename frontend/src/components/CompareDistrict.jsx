import { useState, useContext } from 'react';
import '../index.css';
import useDistrictData from '../hooks/UseDistrictData.jsx';
import { LanguageContext } from '../context/LanguageContext.js';
import { districts, months, fin_years, states } from '../constants.js';
import DistrictDataCard from './DistrictDataCard.jsx';
import CompareDistrictChart from './CompareDistrictChart.jsx';


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);


export default function CompareDistrict() {

  const [state1, setState1] = useState("Rajasthan");
  const [state2, setState2] = useState("Rajasthan");
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [selectedDistrict1, setSelectedDistrict1] = useState("JAIPUR");
  const [selectedDistrict2, setSelectedDistrict2] = useState("AJMER");
  const [month1, setMonth1] = useState("Jan");
  const [month2, setMonth2] = useState("Jan");
  const [fin_year1, setFin_year1] = useState("2024-2025");
  const [fin_year2, setFin_year2] = useState("2024-2025");
  const [field, setField] = useState("families_worked")
  const { data: monthlyData1, isLoading1, isError1 } = useDistrictData(
    selectedDistrict1,
    fin_year1,
    month1,
    state1
  );
  const { data: monthlyData2, isLoading2, isError2 } = useDistrictData(
    selectedDistrict2,
    fin_year2,
    month2,
    state2
  );

  const useLang = () => useContext(LanguageContext);
  const { t } = useLang();

  if (isLoading1 || isLoading2 || !monthlyData1 || !monthlyData2) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-blue-800">{t("title-compare")}</h1>
          <p className="text-gray-600 mt-2">{t("subtitle")}</p>
        </header>

        <div className="mb-6 flex justify-center gap-3  md:flex-row flex-col">
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_state")} 1`}</label>
            <select
              id="state-select"
              value={state1}
              onChange={(e) => setState1(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {states.map(state => (
                <option key={state} value={t(state)}>{t(state)}</option>
              ))}
            </select>

          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="district-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_district")} 1`}</label>
            <select
              id="district-select"
              value={selectedDistrict1}
              onChange={(e) => setSelectedDistrict1(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {(districts).map(district => (
                <option key={district} value={district}>{t(district)}</option>
              ))}
            </select>

          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_month")} 1`}</label>
            <select
              id="month-select"
              value={month1}
              onChange={(e) => setMonth1(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>{t(month)}</option>
              ))}
            </select>
          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="fin_year-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_year")} 1`}</label>
            <select
              id="fin_year-select"
              value={fin_year1}
              onChange={(e) => setFin_year1(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {fin_years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

          </div>
        </div>
        <div className="mb-6 flex justify-center gap-3  md:flex-row flex-col">
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_state")} 2`}</label>
            <select
              id="state-select"
              value={state2}
              onChange={(e) => setState2(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {states.map(state => (
                <option key={state} value={t(state)}>{t(state)}</option>
              ))}
            </select>

          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="district-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_district")} 2`}</label>
            <select
              id="district-select"
              value={selectedDistrict2}
              onChange={(e) => setSelectedDistrict2(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {(districts).map(district => (
                <option key={district} value={district}>{t(district)}</option>
              ))}
            </select>

          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_month")} 2`}</label>
            <select
              id="month-select"
              value={month2}
              onChange={(e) => setMonth2(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>{t(month)}</option>
              ))}
            </select>
          </div>
          <div className="mb-6 w-full max-w-xs mx-auto">
            <label htmlFor="fin_year-select" className="block text-sm font-medium text-gray-700 mb-2">{`${t("select_year")} 2`}</label>
            <select
              id="fin_year-select"
              value={fin_year1}
              onChange={(e) => setFin_year2(e.target.value)}
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {fin_years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

          </div>
        </div>

        {isError1 || !monthlyData1 ? (
          <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Data Not Available</h2>
              <p className="text-gray-700">{t("Sorry, we do not have data for")} {t(selectedDistrict1)}, {t(state1)} {t("for the financial year")} {fin_year1}.</p>
              <p className="text-gray-700">{t("Either the data is not available or the parameters are incorrect.")}</p>
            </div>
          </div>
          ) : (
        <>
            <DistrictDataCard showDetails={showDetails1} monthlyData={monthlyData1} setShowDetails={setShowDetails1} />
        </>
          )}
        {!monthlyData2 || isError2 ? (
          <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Data Not Available</h2>
              <p className="text-gray-700">{t("Sorry, we do not have data for")} {t(selectedDistrict2)}, {t(state2)} {t("for the financial year")} {fin_year2}.</p>
              <p className="text-gray-700">{t("Either the data is not available or the parameters are incorrect.")}</p>
            </div>
          </div>
          ) : (
        <>
        <DistrictDataCard showDetails={showDetails2} monthlyData={monthlyData2} setShowDetails={setShowDetails2} />
        </>
          )}

        <div>
          <div className='p-10 rounded-t-2xl rounded-2x bg-white shadow-lg border border-gray-200 flex flex-col md:flex-row justify-center align-middle space-x-2'>
            <label htmlFor="data-row" className="font-bold  text-gray-700 pt-3 sm:pb-3 mx-auto md:mx-2">{t("select_field")}:</label>
            <select name="data-row" id="data-row" 
            defaultValue={field} 
            onChange={(e) => setField(e.target.value)}
            className="p-3 max-w-96 mx-auto md:mx-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="families_worked">{t("families_worked")}</option>
              <option value="projects_completed">{t("projects_completed")}</option>
              <option value="average_wage">{t("average_wage")}</option>
              <option value="work_per_family">{t("work_per_family")}</option>
              <option value="women_participation">{t("women_participation")}</option>
              <option value="timely_payments">{t("timely_payments")}</option>
              <option value="families_100_days">{t("families_100_days")}</option>
              <option value="ongoing_projects">{t("ongoing_projects")}</option>
              <option value="total_money_spent">{t("total_money_spent")}</option>
              <option value="sc_work">{t("sc_work")}</option>
              <option value="st_work">{t("st_work")}</option>
            </select>

          </div>
          <CompareDistrictChart district1={selectedDistrict1} district2={selectedDistrict2} district1Data={monthlyData1} district2Data={monthlyData2} label={field} displayName={t(`${field}`)} />
        </div>
    </div>
    </div >
  );
}
