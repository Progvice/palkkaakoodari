import { createContext } from "react";
import { Employee } from "../types";
import { useState, useContext } from "react";
import type { ReactElement } from "react";

interface EmployeeContextType {
  employee: Employee | undefined;
  setEmployee: (employee: Employee) => void
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider : React.FC<{children: ReactElement}> = ({children}) => {
  const [employee, setEmployee] = useState<Employee>();

  return <EmployeeContext.Provider value={{employee: employee, setEmployee: setEmployee}}>{children}</EmployeeContext.Provider>
}

export const useEmployee = () => {
  try {
    const ctx = useContext(EmployeeContext);
    if (!ctx) throw new Error("Could not load LangContext");
    return ctx;
  }
  catch (err) {
    throw new Error("Could not load LangContext" + err);
  }
}
