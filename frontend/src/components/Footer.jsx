import { NavLink } from "react-router";
import { LanguageContext } from "../context/LanguageContext";
import { useContext } from "react";

const Footer = () => {
    const { t } = useContext(LanguageContext);
    return (
        <footer className="text-center text-gray-500 text-sm mt-12 py-6 border-t border-gray-200">
            <div className="flex justify-center space-x-6 mb-4">
                <NavLink
                    to="/compare"
                    className="hover:text-blue-700"
                >
                    {t("compare")}
                </NavLink>
            <NavLink 
                to="/getdistrictdata" 
                className="hover:text-blue-700"
            >
                {t("fetch_district")}
            </NavLink>
        </div>

        <p>{t("data_help")}</p>
        <p>&copy; 2024 {t("MERA MGNREGA")}</p>
    </footer>
)};

export default Footer;