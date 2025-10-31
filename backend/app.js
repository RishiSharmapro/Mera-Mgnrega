import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = JSON.parse(process.env.CORS_ORIGIN || '[]');

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // allowing requests with no origin
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    }
}));
app.use(express.json());

// routes
import districtRoutes from './routes/district.routes.js';

app.use("/api/v1/mgnrega", districtRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Mera MGNREGA API is running');
});

export default app;