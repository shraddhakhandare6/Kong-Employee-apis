import { supabase } from '../utils/supabaseClient';
import { Employee } from '../types/employees.d';

export const getAllEmployees = async (): Promise<Employee[]> => {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data as Employee[];
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Employee;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const { data, error } = await supabase
    .from('employees')
    .insert(employee)
    .select()
    .single();
  if (error) throw error;
  return data as Employee;
};

export const updateEmployee = async (id: string, employee: Partial<Employee>): Promise<Employee> => {
  const { data, error } = await supabase
    .from('employees')
    .update(employee)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Employee;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) throw error;
};