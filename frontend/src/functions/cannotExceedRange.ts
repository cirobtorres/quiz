// export default function cannotExceedRange(
//   value: number | string,
//   max: number,
//   min: number | null = null
// ): number | string {
//   console.log(value);
//   try {
//     value = Number(value);
//   } catch (error) {
//     if (error instanceof TypeError) {
//       if (typeof value === "string" && value.length > max) {
//         return value.slice(0, max) as string;
//       }
//       return value as string;
//     }
//     throw new Error("cannotExceedRange: value is not a number or string");
//   }
//   if (min && value < min) {
//     return min as number;
//   }
//   if (value > max) {
//     return max as number;
//   }
//   return value as number;
// }
