import FieldInput from '@/components/form/FieldInput'
import ODataFilterForm from '@/components/odata/ODataFilterForm'
import ODataTable from '@/components/odata/ODataTable'
import { useODataTable } from '@/hooks/useODataTable'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormValues, defaultValues, formConfig, schema } from './form'
import { GetUserCompanyODataResponse } from '@/services/user-companies/types/odata'

type UserCompaniesFilter = {
  identification?: string
  name?: string
}

export default function UserCompaniesGrid() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState<SortingState>([])
  const [filters, setFilters] = useState<UserCompaniesFilter>({})

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    data: response,
    isLoading,
    isError,
  } = useODataTable<GetUserCompanyODataResponse, typeof filters>({
    endpoint: 'UserCompanies',
    pageIndex,
    pageSize,
    sort,
    filters,
  })

  const columns = useMemo<ColumnDef<GetUserCompanyODataResponse>[]>(
    () => [
      { accessorKey: 'name', header: 'Nome' },
      { accessorKey: 'identification', header: 'CNPJ' },
    ],
    []
  )

  const onSubmit = (values: FormValues) => {
    setPageIndex(0)
    setFilters({
      name: values.name || undefined,
      identification: values.identification || undefined,
    })
  }

  return (
    <div className="p-4">
      <ODataFilterForm form={form} onSubmit={onSubmit}>
        <FieldInput {...formConfig.name} />
        <FieldInput {...formConfig.identification} />
      </ODataFilterForm>

      <ODataTable<GetUserCompanyODataResponse>
        data={response?.data ?? []}
        columns={columns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={response?.totalCount}
        sort={sort}
        loading={isLoading}
        error={isError}
        onPageChange={setPageIndex}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPageIndex(0)
        }}
        onSortChange={setSort}
        rowId={(r) => r.identification} // ajuste se o seu id tiver outro nome
      />
    </div>
  )
}
