export const numberParser = (earlierValue: number | '', newValue: unknown) => {
  if (!newValue) return '';
  if (!isNaN(Number(newValue))) return Number(newValue);
  return earlierValue;
}
