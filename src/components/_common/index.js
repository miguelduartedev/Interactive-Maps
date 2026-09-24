export const exists = (obj) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  if (typeof obj === "boolean") return obj;
  if (obj == null || (typeof obj === "string" && !Boolean(obj.trim())))
    return false;
  if (obj.length > 0 && typeof obj === "number") return true;
  if (obj.length > 0) return true;
  if (
    Object.getOwnPropertyNames(obj).length === 0 &&
    obj.constructor === Object
  )
    return false; // validate if Object is empty
  if (typeof obj !== "object") return false;
  if (Array.isArray(obj)) return Boolean(obj.length); // validate if Array is empty
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return true;
  }
  return true;
};
