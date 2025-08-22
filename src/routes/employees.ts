import express from 'express';
import * as employeesController from '../controllers/employeesController';
import { validateEmployeeInput } from '../middleware/validation';

const router = express.Router();

router.get('/', employeesController.getEmployees);
router.get('/:id', employeesController.getEmployee);
router.post('/', validateEmployeeInput, employeesController.createEmployee);
router.put('/:id', validateEmployeeInput, employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

export default router;