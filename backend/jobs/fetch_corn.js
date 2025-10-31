import cron from "node-cron";
import axios from "axios";
import { seedDatabase } from "../db/seed.js";

const API_URL = `https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=${process.env.MGNREGA_API_KEY}&format=json&limit=1000&filters%5Bstate_name%5D=RAJASTHAN&filters%5Bfin_year%5D=2023-2024`

export async function fetchAndStoreData() {
  try {
    console.log("🕒 Fetching new MGNREGA data...");
    const res = await axios.get(API_URL);
    const data = res.data;

    await seedDatabase(JSON.stringify(data?.records));

    console.log("✅ Data refreshed successfully!");
  } catch (err) {
    console.error("❌ Error fetching MGNREGA data:", err);
  }
}

// Schedule — every Sunday 2 AM
cron.schedule("0 2 * * 0", fetchAndStoreData);
