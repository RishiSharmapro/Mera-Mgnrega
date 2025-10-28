import connectDB from "./db/connect.js";
import "dotenv/config";
import app from "./app.js";
// import { seedDatabase } from "./db/seed.js";
import { seedDatabase } from "./db/seed_from_processed_data.js";
import { fetchAndStoreData } from "./jobs/fetch_corn.js";

connectDB()
.then(async () => {
    // await seedDatabase(); // Uncomment to seed the database
    // await fetchAndStoreData(); // Fetch and store data at startup
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Failed connecting to database:", error);
});