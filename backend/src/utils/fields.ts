import { Request } from "express";

export const requiredFields = async (req: Request, requiredFields: string[]) => {
  let missingFields = [];
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      missingFields.push(field);
    }
  }
  return {
    status: missingFields.length < 1 ? true : false,
    fields: missingFields
  };
};

/**
 * Pick properties added by key-params to a new Object.
 * @param source Source object
 * @param keys Property keys as array
 * @returns New Object with the selected properties
 */
export function pickProperties<T extends object, K extends keyof T>(source: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.filter(key => key in source).map(key => [key, source[key]])) as Pick<T, K>;
}
