import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
import districtRoutes from './routes/district.routes.js';

app.use("/api/v1/mgnrega", districtRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Mera MGNREGA API is running');
});

export default app;