import fs from 'fs';
import path from 'path';
import { District } from '../models/district.model.js';

const __dirname = path.resolve()
const filePath = path.join(__dirname, "/db/processed_data.json");

const seedDatabase = async () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const allDistricts = JSON.parse(data);
        
        console.log(`📦 Preparing to insert ${allDistricts.length} districts...`);

        for (const district of allDistricts) {
            if (district.district_code && district.district_name) {
                await District.insertOne(district);
            }
        }

        console.log("✅ Data seeded successfully!");
    } catch (error) {
        console.error("Error reading or parsing data.json:", error);
    }
}

export { seedDatabase };