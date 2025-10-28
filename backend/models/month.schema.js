import mongoose from "mongoose";

const monthSchema = new mongoose.Schema(
    {
        fin_year: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        Average_Wage_rate_per_day_per_person: {
            type: Number,
        },
        Average_days_of_employment_provided_per_Household: {
            type: Number,
        },
        Number_of_Completed_Works: {
            type: Number,
        },
        Number_of_Ongoing_Works: {
            type: Number,
        },
        SC_persondays: {
            type: Number,
        },
        ST_persondays: {
            type: Number,
        },
        Total_Exp: {
            type: Number,
        },
        Total_Households_Worked: {
            type: Number,
        },
        Total_No_of_HHs_completed_100_Days_of_Wage_Employment: {
            type: Number,
        },
        Total_No_of_Workers: {
            type: Number,
        },
        Total_No_of_Works_Takenup: {
            type: Number,
        },
        Women_Persondays: {
            type: Number,
        },
        percentage_payments_gererated_within_15_days: {
            type: Number,
        }
    }, { timestamps: true }
);

export default monthSchema;