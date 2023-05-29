export type Parameters = {
  targetFieldsApiKey: string[];
  invert: boolean;
};

export function typedBoolean<T>(value: T): value is Exclude<T, false | null | undefined | '' | 0> {
  return Boolean(value);
}
