export default function stringToId(value?: string): string | undefined {
  return value?.replaceAll(' ', '-').toLowerCase()
}
