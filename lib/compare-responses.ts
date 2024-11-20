export function compareResponses<T>(actual: T, expected: T): boolean {
  return baseCompare(actual, expected);
}

function isObject<T>(value: T): value is T & object {
  return typeof value === 'object' && value !== null;
}

function hasSameNumberOfKeys(obj1: object, obj2: object): boolean {
  return Object.keys(obj1).length === Object.keys(obj2).length;
}

function areValuesEqual(actual: object, expected: object): boolean {
  for (const key in actual) {
    if (!compareResponses((actual as Record<string, unknown>)[key], (expected as Record<string, unknown>)[key])) {
      return false;
    }
  }
  return true;
}

function baseCompare<T>(actual: T, expected: T): boolean {
  // Base case: If both values are primitive, compare them directly
  if (!isObject(actual) || !isObject(expected)) {
    return actual === expected;
  }

  // Check if both objects have the same number of keys
  if (!hasSameNumberOfKeys(actual, expected)) {
    return false;
  }

  // Recursively compare each key-value pair
  return areValuesEqual(actual, expected);
}

function validateApiResponse<T extends object>(response: unknown, expectedType: T): response is T {
  return (
    typeof response === 'object' &&
    response !== null &&
    response instanceof Object &&
    Object.keys(response).every((key) => key in expectedType)
  );
}

interface ABC {
  name: string;
  foo: number[];
}

async function fetchAndValidate(): Promise<boolean> {
  const response = await fetch('your_api_endpoint');
  const data = await response.json();

  return validateApiResponse<ABC>(data, { name: '', foo: [] });
}

const f = fetchAndValidate();
console.log(f);
