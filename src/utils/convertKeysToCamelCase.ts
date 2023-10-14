export default function convertKeysToCamelCase(obj: Obj): Obj {
  const camelCaseObj: Obj = {} as Obj;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = convertKeyToCamelCaseString(key);
      camelCaseObj[camelCaseKey as keyof Obj] = obj[key];
    }
  }
  return camelCaseObj;
}

type Obj = Record<string, string>

export function convertKeyToCamelCaseString(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
