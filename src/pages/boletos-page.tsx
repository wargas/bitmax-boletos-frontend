import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { MagnifyingGlass, FilePdf } from 'phosphor-react'
import Loading from 'react-loading'
import { Boleto } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'
import { useState, ChangeEvent, useMemo } from 'react'

type IBoleto = Boleto & { selected?: boolean }

export default function BoletosPage() {
  const [search, setSearch] = useState('')

  const client = useQueryClient()

  const { data, refetch, isFetching } = useQuery(
    [`boletos`, search],
    async () => {
      const { data } = await Api.get<IBoleto[]>(`boletos?documento=${search}`)

      return data
    },
    { enabled: false },
  )

  const selecionados = useMemo(() => data?.filter((i) => i.selected) || [], [
    data,
  ])

  function handlerSelect(ev: ChangeEvent<HTMLInputElement>) {
    client.setQueryData<IBoleto[]>(
      [`boletos`, search],
      data?.map((i) => {
        if (ev.target.id.length === 0) {
          return { ...i, selected: ev.target.checked }
        } else {
          if (ev.target.id === String(i.id)) {
            return { ...i, selected: ev.target.checked }
          }
        }
        return i
      }),
    )
  }

  function handlerCarne() {
    const ids = selecionados.map((s) => s.id).join(',')

    window.open(
      `${import.meta.env.VITE_API_URL}carne?ids=${ids}`,
      'nova-janela',
    )
  }

  return (
    <PageComponent>
      <PageTitle title="Boletos">
        <div className="flex gap-4 items-center">
          <input
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder="Documento"
            type="text"
            className="input"
          />
          <button onClick={() => refetch()} className="btn btn-primary">
            {isFetching ? (
              <Loading type="spin" width={15} height={15} color="white" />
            ) : (
              <MagnifyingGlass />
            )}
             <span className='ml-3'>Buscar</span>
          </button>
          {selecionados?.length > 0 && (
            <button onClick={handlerCarne} className="btn btn-primary">
              Gerar Carnê ({selecionados.length})
            </button>
          )}
        </div>
      </PageTitle>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <input onChange={handlerSelect} type="checkbox" name="" id="" />
              </th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>PIX</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((boleto) => (
              <tr>
                <td>
                  <input
                    id={boleto.id + ''}
                    onChange={handlerSelect}
                    checked={boleto.selected}
                    type="checkbox"
                    name=""
                  />
                </td>
                <td>
                  {boleto.cliente.nome} <br />
                  <span className="text-sm font-light">
                    {boleto.cliente.documento}
                  </span>
                </td>
                <td>{boleto.valor}</td>
                <td>{boleto.vencimento}</td>
                <td>{boleto.status}</td>
                <td>{(boleto?.url_pix) ? 'SIM' : 'NÃO'}</td>
                <td>
                  <div className="flex justify-end">
                    <a target="_blank" href={`${import.meta.env.VITE_API_URL}boletos/print/${boleto.id}`}>
                      <FilePdf />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  )
}
