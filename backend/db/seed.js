import fs from 'fs';
import path from 'path';
import { District } from '../models/district.model.js';

const __dirname = path.resolve()
const filePath = path.join(__dirname, "/db/data.json");

const seedDatabase = async (data) => {
    try {
        // const data = fs.readFileSync(filePath, 'utf-8');
        // const jsonData = JSON.parse(data);
        // const seedData = jsonData.mgnrega.data;
        const seedData = JSON.parse(data);

        const grouped = {};

        for (const row of seedData) {
            const districtKey = `${row["district_code"]}-${row["district_name"]}`;
            const monthKey = `${row["fin_year"]}-${row["month"]}`;

            if (!grouped[districtKey]) {
                grouped[districtKey] = {
                    state_name: row["state_name"],
                    state_code: row["state_code"],
                    district_name: row["district_name"],
                    district_code: row["district_code"],
                    monthly_data: [],
                };
            }

            grouped[districtKey].monthly_data[monthKey] = {
                fin_year: row["fin_year"],
                month: row["month"],
                Average_Wage_rate_per_day_per_person: row["Average_Wage_rate_per_day_per_person"],
                Average_days_of_employment_provided_per_Household: row["Average_days_of_employment_provided_per_Household"],
                Number_of_Completed_Works: row["Number_of_Completed_Works"],
                Number_of_Ongoing_Works: row["Number_of_Ongoing_Works"],
                SC_persondays: row["SC_persondays"],
                ST_persondays: row["ST_persondays"],
                Total_Exp: row["Total_Exp"],
                Total_Households_Worked: row["Total_Households_Worked"],
                Total_No_of_HHs_completed_100_Days_of_Wage_Employment: row["Total_No_of_HHs_completed_100_Days_of_Wage_Employment"],
                Total_No_of_Workers: row["Total_No_of_Workers"],
                Total_No_of_Works_Takenup: row["Total_No_of_Works_Takenup"],
                Women_Persondays: row["Women_Persondays"],
                percentage_payments_gererated_within_15_days: row["percentage_payments_gererated_within_15_days"]
            };
        }

        const allDistricts = Object.values(grouped).map(district => ({
            ...district,
            monthly_data: Object.values(district.monthly_data)
        }));
        // console.log(allDistricts[0]);
        // fs.writeFileSync(path.join(__dirname, "/db/data.json"), JSON.stringify(allDistricts, null, 2));
        console.log(`📦 Preparing to insert ${allDistricts.length} districts...`);
        // await District.deleteMany({});
        for (const district of allDistricts) {
            if (district.district_code && district.district_name) {
                const existing = await District.findOne({ district_code: district.district_code });

                if (existing) {
                    const merged = [
                    ...new Map(
                        [...existing.monthly_data, ...district.monthly_data]
                        .map((m) => [`${m.month}-${m.fin_year}`, m])
                    ).values(),
                    ];
                    existing.monthly_data = merged;
                    await existing.save();
                    continue;
                }
                await District.insertOne(district);
            }
        }
        // await District.insertMany(allDistricts);
        console.log("✅ Data seeded successfully!");
    } catch (error) {
        console.error("Error reading or parsing data.json:", error);
    }
}
// seedDatabase();

export { seedDatabase };