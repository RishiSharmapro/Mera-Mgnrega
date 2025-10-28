import mongoose from "mongoose";
import monthSchema from "./month.schema.js";

const districtSchema = new mongoose.Schema(
    {
        state_name: {
            type: String,
            required: true,
        },
        state_code: {
            type: String,
            required: true,
        },
        district_code: {
            type: String,
            required: true,
        },
        district_name: {
            type: String,
            required: true
        },
        monthly_data: [monthSchema]
    }, { timestamps: true }
);

// adding index for faster search
districtSchema.index({ district_code: 1 });
districtSchema.index({ district_name: 1 });
districtSchema.index({ state_code: 1, district_code: 1 });
districtSchema.index({ state_name: 1, district_name: 1 });
districtSchema.index({ "monthly_data.fin_year": 1, "monthly_data.month": 1 });

export const District = mongoose.model('District', districtSchema);