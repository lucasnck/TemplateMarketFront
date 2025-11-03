import api from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { SortingState } from '@tanstack/react-table'
import odata from 'odata-query'

// Tipagem opcional para meta por campo (tipo/op/nome no servidor)
type FieldMeta = {
  type?: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'guid'
  op?: 'contains' | 'eq' | 'startswith' | 'endswith'
  serverField?: string // <- importante: nome no EDM (ex.: Name)
}

type MetaMap<T> = Partial<Record<keyof T & string, FieldMeta>>

interface UseODataTableProps<TFilter> {
  endpoint: string
  pageIndex: number
  pageSize: number
  sort: SortingState
  filters?: TFilter | undefined
  meta?: MetaMap<TFilter>
}

interface ODataResponse<T> {
  value: T[]
  '@odata.count'?: number
}

interface ODataTableResult<T> {
  data: T[]
  totalCount: number
  hasNextPage: boolean
}

// ---- helpers
function isDate(v: any): v is Date {
  return v instanceof Date && !isNaN(v.valueOf())
}

function normalizeFilters<TFilter>(filters?: TFilter | undefined, meta?: MetaMap<TFilter>) {
  if (!filters) return undefined

  const result: Record<string, any> = {}
  for (const [key, raw] of Object.entries(filters)) {
    const val = (typeof raw === 'string' ? raw.trim() : raw) as any
    if (val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length))
      continue

    const m = meta?.[key as keyof TFilter & string]
    const field = m?.serverField ?? key
    const hintedType = m?.type

    if ((hintedType ?? typeof val) === 'string') {
      const op = m?.op ?? 'contains'
      result[field] = { [op]: String(val) }
      continue
    }
    if ((hintedType ?? typeof val) === 'boolean') {
      result[field] = Boolean(val)
      continue
    }
    if ((hintedType ?? typeof val) === 'number') {
      const n = Number(val)
      if (!Number.isNaN(n)) result[field] = n
      continue
    }
    if (hintedType === 'date' || isDate(val)) {
      result[field] = isDate(val) ? val.toISOString() : val
      continue
    }
    if (typeof val === 'object') {
      result[field] = val
      continue
    }
  }

  return Object.keys(result).length ? result : undefined
}

// NEW: mapeia sort -> array de strings "Field asc|desc"
function buildOrderBy<TFilter>(sort: SortingState, meta?: MetaMap<TFilter>): string[] | undefined {
  if (!sort?.length) return undefined
  const mapped = sort
    .filter((s) => !!s.id)
    .map((s) => {
      const id = String(s.id)
      // tenta achar meta por "id" (nome do filter/coluna)
      const serverField = meta?.[id as keyof TFilter & string]?.serverField ?? id
      return `${serverField} ${s.desc ? 'desc' : 'asc'}`
    })
    .filter(Boolean)
  return mapped.length ? mapped : undefined
}

export function useODataTable<TData, TFilter>({
  endpoint,
  pageIndex,
  pageSize,
  sort,
  filters,
  meta,
}: UseODataTableProps<TFilter>) {
  const filterAst = normalizeFilters(filters, meta)
  const orderBy = buildOrderBy<TFilter>(sort, meta)

  const query = odata({
    top: pageSize,
    skip: pageIndex * pageSize,
    count: true,
    orderBy, // <- array de strings evita "Name/asc"
    filter: filterAst,
  })

  // Evita key instável: serializa filtros/sort
  const key = [
    'odata',
    endpoint,
    pageIndex,
    pageSize,
    JSON.stringify(sort),
    JSON.stringify(filterAst ?? null),
  ] as const

  return useQuery<ODataTableResult<TData>>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get<ODataResponse<TData>>(`/odata/${endpoint}${query}`)
      const data = res.data.value
      const totalCount = res.data['@odata.count'] ?? 0
      const hasNextPage = (pageIndex + 1) * pageSize < totalCount
      return { data, totalCount, hasNextPage }
    },
  })
}
