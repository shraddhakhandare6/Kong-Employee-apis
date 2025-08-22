import { Request, Response, NextFunction } from 'express';
import { Employee } from '../types/employees.d';

export const validateEmployeeInput = (req: Request, res: Response, next: NextFunction) => {
  const employee: Partial<Employee> = req.body;
  
  if (!employee.name || !employee.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (typeof employee.name !== 'string' || typeof employee.email !== 'string') {
    return res.status(400).json({ error: 'Name and email must be strings' });
  }

  if (employee.age && (typeof employee.age !== 'number' || employee.age < 0)) {
    return res.status(400).json({ error: 'Age must be a positive number' });
  }

  if (employee.location && typeof employee.location !== 'string') {
    return res.status(400).json({ error: 'Location must be a string' });
  }

  next();
};