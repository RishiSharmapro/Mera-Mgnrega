import connectDB from "./db/connect.js";
import "dotenv/config";
import app from "./app.js";
import { fetchAndStoreData } from "./jobs/fetch_corn.js";

connectDB()
.then(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Failed connecting to database:", error);
});