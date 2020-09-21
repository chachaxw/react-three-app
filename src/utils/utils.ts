/**
 *
 * @param v0
 * @param v1
 * @param t
 */
export function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}
