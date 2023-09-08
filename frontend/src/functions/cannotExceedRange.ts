export default function cannotExceedRange(
  value: number | string,
  max: number,
  min: number | null = null
): number | string {
  if (typeof value === "string") {
    if (value.length > max) {
      return value.slice(0, max) as string;
    }
    return value as string;
  } else {
    if (min && value < min) {
      return min as number;
    }
    if (value > max) {
      return max as number;
    }
    return value as number;
  }
}
