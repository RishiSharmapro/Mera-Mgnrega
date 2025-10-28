import { NavLink } from 'react-router';
import { LanguageContext } from '../context/LanguageContext';
import { useContext } from 'react';

const LandingPage = () => {
    const { t } = useContext(LanguageContext);
    return (
    <>
        <main>
            <section className="text-center my-8 sm:my-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    {t("simple_reports_title")}
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">
                    {t("simple_reports_subtitle")}
                </p>
            </section>


            <section className="bg-white p-6 rounded-xl shadow-lg mb-12 border border-green-700 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-blue-600 mb-1">{t("district_snapshot")}</h3>
                <p className="text-gray-500 mb-6">{t("period")}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600">{t("families_worked")}</p>
                        <p className="text-2xl font-bold text-gray-900">316679</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600">{t("average_wage")}</p>
                        <p className="text-2xl font-bold text-gray-900">₹194.56<span className="text-base font-normal">/{t("day")}</span></p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600">{t("work_per_family")}</p>
                        <p className="text-2xl font-bold text-gray-900">44<span className="text-base font-normal"> {t("days")}</span></p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600">{t("timely_payments")}</p>
                        <p className="text-2xl font-bold text-green-600">99.99%</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <NavLink
                        to="/getdistrictdata"
                        className="inline-block bg-green-600 text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {t("check_district_report")}
                    </NavLink>
                </div>
            </section>

            <section className="mt-12 mx-4">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">{t("why_use_site")}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center mb-3">
                            <svg className="w-8 h-8 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A.75.75 0 003 9v4.5a.75.75 0 00.98.727l1.252-.376A.75.75 0 015.99 13.5v-3a.75.75 0 01.758-.727l1.252.376a.75.75 0 00.98-.727V8.223A.75.75 0 008.25 7.5h-1.5a.75.75 0 00-.75.75v3a.75.75 0 01-.758.727l-1.252-.376A.75.75 0 003.98 8.223zM15.98 8.223A.75.75 0 0015 9v4.5a.75.75 0 00.98.727l1.252-.376a.75.75 0 01.758.727v-3a.75.75 0 01.758-.727l1.252.376a.75.75 0 00.98-.727V8.223A.75.75 0 0019.5 7.5h-1.5a.75.75 0 00-.75.75v3a.75.75 0 01-.758.727l-1.252-.376a.75.75 0 00-.98.727z" />
                            </svg>
                            <h4 className="text-xl font-semibold">{t("easy_to_understand")}</h4>
                        </div>
                        <p className="text-gray-600">
                            {t("easy_to_understand_desc")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center mb-3">
                            <svg className="w-8 h-8 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                            <h4 className="text-xl font-semibold">{t("fast_on_any_phone")}</h4>
                        </div>
                        <p className="text-gray-600">
                            {t("fast_on_any_phone_desc")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center mb-3">
                            <svg className="w-8 h-8 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className="text-xl font-semibold">{t("answers_questions")}</h4>
                        </div>
                        <p className="text-gray-600">
                            {t("answers_questions_desc")}
                        </p>
                    </div>

                </div>
            </section>
        </main>
    </>
)};

export default LandingPage;