import { Path } from 'react-hook-form'

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function generateFieldMap<T>(
  config: Record<string, { name: string; baseName: string }>
): Record<string, Path<T>> {
  return Object.values(config).reduce(
    (map, field) => {
      map[field.baseName] = field.name as Path<T>
      return map
    },
    {} as Record<string, Path<T>>
  )
}

const utils = {
  cn,
  generateFieldMap,
}

export default utils
