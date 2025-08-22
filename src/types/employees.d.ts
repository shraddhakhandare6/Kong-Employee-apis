export interface Employee {
  id?: string;
  name: string;
  email: string;
  age?: number | null;
  location?: string | null;
  created_at?: string;
  updated_at?: string;
}