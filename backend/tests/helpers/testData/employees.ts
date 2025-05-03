import { Employee } from "../../../src/entity/Employee"

export const employee1: Partial<Employee> = {
  firstName: 'John',
  lastName: 'Doe',
  priceNegotiable: false,
  hourlyRate: 50,
  description: 'A skilled developer',
  skillLevel: 'Senior',
}

export const employee2: Partial<Employee> = {
  firstName: 'Jane',
  lastName: 'Smith',
  priceNegotiable: true,
  hourlyRate: 60,
  description: 'An experienced manager',
  skillLevel: 'Manager',
}

export const employee3: Partial<Employee> = {
  firstName: 'Tom',
  lastName: 'Big',
  priceNegotiable: true,
  hourlyRate: 70,
  description: 'An experienced experiences',
  skillLevel: 'Senior',
}
