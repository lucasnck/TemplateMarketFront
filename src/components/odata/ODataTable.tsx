import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table'
import { useMemo } from 'react'

interface Props<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  pageIndex: number
  pageSize: number
  totalCount?: number
  sort: SortingState
  loading?: boolean
  error?: boolean
  rowId?: (row: T) => string | number
  onPageChange: (pageIndex: number) => void
  onSortChange: (sort: SortingState) => void
  onPageSizeChange: (pageSize: number) => void
}

export default function ODataTable<T>({
  data,
  columns,
  pageIndex,
  pageSize,
  totalCount,
  sort,
  loading = false,
  error = false,
  rowId,
  onPageChange,
  onSortChange,
  onPageSizeChange,
}: Props<T>) {
  // pageCount seguro (quando totalCount vier indefinido, evita NaN)
  const pageCount = useMemo(() => {
    if (typeof totalCount !== 'number' || totalCount < 0) return 0
    return Math.max(1, Math.ceil(totalCount / pageSize))
  }, [totalCount, pageSize])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sort,
      pagination: { pageIndex, pageSize },
    },
    // Server-side
    manualSorting: true,
    manualPagination: true,
    pageCount, // informa a quantidade de páginas ao TanStack
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sort) : updater
      onSortChange(next)
      // opcional: reseta página ao ordenar
      onPageChange(0)
    },
    getRowId: (original, index) =>
      String(rowId ? rowId(original as T) : ((original as any)?.id ?? index)),
  })

  const canPrev = pageIndex > 0
  const canNext =
    typeof totalCount === 'number' && totalCount >= 0
      ? (pageIndex + 1) * pageSize < totalCount
      : data.length === pageSize // fallback quando não há count

  return (
    <>
      <div className="overflow-x-auto border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-neutral-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b">
                {hg.headers.map((h) => {
                  const canSort = h.column.getCanSort?.()
                  const sorted = h.column.getIsSorted() as false | 'asc' | 'desc'
                  return (
                    <th
                      key={h.id}
                      onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                      className={`px-3 py-2 text-left font-medium ${
                        canSort ? 'cursor-pointer select-none' : ''
                      }`}
                    >
                      <div className="inline-flex items-center gap-1">
                        {h.isPlaceholder
                          ? null
                          : flexRender(h.column.columnDef.header, h.getContext())}
                        {sorted === 'asc' && <span>▲</span>}
                        {sorted === 'desc' && <span>▼</span>}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-4 text-neutral-500" colSpan={columns.length}>
                  Carregando…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="px-3 py-4 text-red-600" colSpan={columns.length}>
                  Erro ao carregar.
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-neutral-500" colSpan={columns.length}>
                  Sem resultados.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-neutral-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-600">Itens por página:</label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded border px-2 py-1 text-sm"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {typeof totalCount === 'number' && totalCount >= 0 && (
            <span className="text-xs text-neutral-500">
              Total: {totalCount} — Página {pageIndex + 1} de {pageCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={!canPrev || loading}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!canNext || loading}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  )
}
