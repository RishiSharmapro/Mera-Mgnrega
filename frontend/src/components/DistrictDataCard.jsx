import { LanguageContext } from '../context/LanguageContext.js';
import { useContext } from 'react';
import Icon from './Icon.jsx';
import MetricCard from './MetricCard.jsx';
import DetailedInfo from './DetailedInfo.jsx';

const Icons = {
  families: <Icon path="/families-worked.svg" />,
  projects: <Icon path="project-completed.svg" />,
  wage: <Icon path="indian-rupee.svg" />,
  days: <Icon path="work-per-family.svg" />,
  women: <Icon path="women-participation.svg" />,
  timely: <Icon path="timely-payments.svg" />,
  hundredDays: <Icon path="calendar-days.svg" />,
};

const DistrictDataCard = ({ showDetails, monthlyData, setShowDetails }) => {
    const useLang = () => useContext(LanguageContext);
    const { t } = useLang();
    
    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

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
    );
}

export default DistrictDataCard;