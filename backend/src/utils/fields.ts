import { Request } from "express";

export function requiredFields<T>
  (data: Partial<T>, requiredFields: string[]) : {status: boolean, missingFields: string[]} {

  const missingFields = requiredFields.filter(field => !(field in data));

  return {
    status: missingFields.length === 0,
    missingFields,
  };
};

export function filterFields<T>(
  data: T,
  fields: string[]
): Partial<T> {
  const result = {} as Partial<T>;

  for (const key in data) {
    if (fields.includes(key)) {
      result[key] = data[key];
    }
  }

  return result;
}

/**
 * Pick properties added by key-params to a new Object.
 * @param source Source object
 * @param keys Property keys as array
 * @returns New Object with the selected properties
 */
export function pickProperties<T extends object, K extends keyof T>(source: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.filter(key => key in source).map(key => [key, source[key]])) as Pick<T, K>;
}
