import Icon from "./Icon";
import SummarySection from "./SummarySection";
import MetricCard from "./MetricCard";
import { LanguageContext } from "../context/LanguageContext";
import { useContext, useState } from "react";
import { useEffect } from "react";


const Icons = {
    inclusion: <Icon path="work-per-family.svg" />,
    expenditure: <Icon path="total-money-spent.svg" />,
    ongoing: <Icon path="ongoing-project.svg" />,
};

const DetailedInfo = ({ data }) =>  { 
    const [summary, setSummary] = useState({});
    const useLang = () => useContext(LanguageContext);
    const { t, lang } = useLang();
    const englishSummary = data?.summary?.english;
    const hindiSummary = data?.summary?.hindi;

    useEffect(() => {
        if (lang === "en") {
            setSummary(englishSummary);
        } else {
            setSummary(hindiSummary);
        }
    }, [data, lang]);
    
    return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg animate-fade-in">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{t("more_details")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard icon={Icons.ongoing} label={t("ongoing_projects")} value={data.Number_of_Ongoing_Works} unit="" color="border-blue-500" />
            <MetricCard icon={Icons.expenditure} label={t("total_money_spent")} value={`₹${data.Total_Exp.toFixed(2)}`} unit="" color="border-purple-500" />
            <MetricCard icon={Icons.inclusion} label={t("sc_work")} value={data.SC_persondays} unit={t("person_days")} color="border-gray-500" />
            <MetricCard icon={Icons.inclusion} label={t("st_work")} value={data.ST_persondays} unit={t("person_days")} color="border-gray-500" />
        </div>
        
        <div className="mt-8">
             <h3 className="text-xl font-bold text-gray-800 mb-4">{t("summary")}</h3>
            <div className="space-y-4">
                 <SummarySection title={t("good_points")} items={summary?.goodPoints} color="text-green-600" />
                 <SummarySection title={t("can_be_better")} items={summary?.canBeBetter} color="text-yellow-600" />
                 <SummarySection title={t("needs_improvement")} items={summary?.needsImprovement} color="text-red-600" />
            </div>
        </div>
    </div>
)};

export default DetailedInfo;