import {Router} from 'express';
import { shorterURL, redirectUrl } from '../controllers/urlController.js';

const router = Router();

router.post('/shorten', shorterURL);
router.get('/:hash', redirectUrl);

export default router;