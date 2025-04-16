/**
 * Creates a deep clone of an object
 * @param obj The object to clone
 * @returns A deep copy of the object
 */
export const deepClone = <T extends unknown>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  // Handle Object
  if (obj instanceof Object) {
    const copy = {} as Record<string, unknown>;
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as Record<string, unknown>)[key]);
    });
    return copy as T;
  }

  throw new Error(`Unable to copy object: ${obj}`);
};