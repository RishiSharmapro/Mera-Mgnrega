import { Router } from 'express';
import { getDistrictData, compareDistricts } from '../controllers/district.controller.js';

const router = Router();

router.route('/:fin_year/:district/:state').get(getDistrictData);
router.route('/:fin_year/:district').get(getDistrictData);

router.route('/compare/:fin_year/:district1/:district2').get(compareDistricts);

export default router;