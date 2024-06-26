export const fromValue = <T extends Readonly<Record<string, any>>>(
  enumLike: T,
  value: any,
): T[keyof T] | undefined => {
  const enumEntries = Object.entries(enumLike) as [string, T[keyof T]][];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, enumValue] of enumEntries) {
    if (enumValue === value) {
      return enumValue;
    }
  }
  return undefined;
};
