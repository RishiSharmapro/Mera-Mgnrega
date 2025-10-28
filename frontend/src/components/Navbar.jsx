import { NavLink } from "react-router";
import { LanguageContext } from "../context/LanguageContext";
import { useContext } from "react";

const Navbar = () => {
    const useLang = () => useContext(LanguageContext);
    const { t, lang, setLang } = useLang();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="mx-auto p-4 flex justify-between items-center flex-col space-y-4 sm:flex-row">
                <NavLink 
                    className="text-xl font-bold text-blue-700 cursor-pointer"
                    to="/"
                    >
                    {t("MERA MGNREGA")}
                </NavLink>
                <div className="space-x-4 sm:space-x-6">
                    <NavLink
                        to="/compare"
                        className="text-sm font-medium text-gray-600 hover:text-blue-700"
                        >
                        {t("compare")}
                    </NavLink>
                    <NavLink
                        to="/getdistrictdata"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 p-2 rounded-md bg-blue-50 hover:bg-blue-100"
                        >
                        {t("fetch_district")}
                    </NavLink>
                    <select 
                        name="language" 
                        id="language" 
                        defaultValue={lang}
                        onChange={(e) => setLang(e.target.value === "English" ? "en" : "hi")}
                        className="border border-gray-300 rounded-md p-2 text-sm"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;