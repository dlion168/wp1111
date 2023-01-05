import { Router } from 'express';
import WaterRouter from './water.js';
import SleepRouter from './sleep.js';
import SymptomRouter from './symptom.js';
import LibraryRouter from './library.js';
import CheckListRouter from './checklist';
import loginRouter from './login';

const router = Router();
router.use('/water', WaterRouter);
router.use('/sleep', SleepRouter);
router.use('/symptom', SymptomRouter);
router.use('/library', LibraryRouter);
router.use('/checklist', CheckListRouter);
router.use('/', loginRouter);
export default router;