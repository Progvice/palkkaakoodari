import { Employee } from "../entity/Employee";

const readOnlyFields: Record<string, string[]> = {
  employee: ['uuid', 'accountId', 'tags']
};

type Fields = Partial<Employee>;
type Entities = keyof typeof readOnlyFields;

export const getUpdateableFields = (
  entity: Entities,
  data: Record<string, any>
): Fields => {
  if (!(entity in readOnlyFields)) {
    console.error('getUpdateableFields entity was invalid');
    return {}
  };

  const readOnly = new Set(readOnlyFields[entity]);
  const updateable: Record<string, any> = {};

  for (const key in data) {
    if (readOnly.has(key)) continue;
    updateable[key] = data[key];
  }

  return updateable;
};
