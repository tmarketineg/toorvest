export function toCamelCase(str: string): string {
  return str.replace(/^_/, '').replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function transformKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeys(item));
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toCamelCase(key),
        transformKeys(value),
      ]),
    );
  }
  return obj;
}

export function keysToCamelCase<T>(obj: T | Promise<T>): T | Promise<T> {
  if (obj && typeof (obj as any).then === 'function') {
    return (obj as Promise<any>).then((resolved) => transformKeys(resolved)) as T | Promise<T>;
  }
  return transformKeys(obj) as T;
}
