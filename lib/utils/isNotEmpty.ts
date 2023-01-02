import { Optional } from '../types/optional'

export function isNotEmpty<T>(value: Optional<T>): value is T {
  return value != null
}
