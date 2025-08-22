import { Request, Response } from 'express';
import * as employeesService from '../services/employeesService';
import { Employee } from '../types/employees.d';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeesService.getAllEmployees();
    res.json(employees);
    console.log('Fetched all employees:', employees);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await employeesService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
    console.log(`Fetched employee with ID ${req.params.id}:`, employee);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployee = await employeesService.createEmployee(req.body);
    res.status(201).json(newEmployee);
    console.log('Created new employee:', newEmployee);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await employeesService.updateEmployee(
      req.params.id,
      req.body
    );
    res.json(updatedEmployee);
    console.log(`Updated employee with ID ${req.params.id}:`, updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    await employeesService.deleteEmployee(req.params.id);
    res.status(204).send();
    console.log(`Deleted employee with ID ${req.params.id}`);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};