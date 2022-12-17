import { useQuery } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { DotsThreeVertical, Plus, ArrowsClockwise  } from 'phosphor-react'
import Loading from 'react-loading'
import { Cliente } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'

export default function ClientesPage() {
  const { data, refetch, isRefetching } = useQuery([`clientes`], async () => {
    const { data } = await Api.get<Cliente[]>('clientes')

    return data
  })

  return (
    <PageComponent>
      <PageTitle title="Clientes">
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="button border-none">
            {isRefetching ? <Loading color='black' type='spin' width={15} height={15} /> : <ArrowsClockwise /> }
          </button>
          <button className="button border-none">
            <Plus />
          </button>
          <input type="text" className="rounded" placeholder="Pequisar" />
        </div>
      </PageTitle>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Documento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cliente) => (
              <tr key={cliente.id}>
                <td className="">{cliente.nome}</td>
                <td>{cliente.documento}</td>
                <td>
                  <div className="flex justify-end">
                    <button>
                      <DotsThreeVertical />
                    </button>
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
