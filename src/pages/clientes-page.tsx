import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { DotsThreeVertical, Plus, ArrowsClockwise  } from 'phosphor-react'
import Loading from 'react-loading'
import { Cliente } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'
import { useState } from 'react'

export default function ClientesPage() {
  
  const [search, setSearch] = useState('')

  const client = useQueryClient()

  const { data, refetch, isRefetching } = useQuery(
    [`clientes`, search], 
    async () => {
    const { data } = await Api.get<Cliente[]>(`clientes?documento=${search}`)

    return data
  },
   { enabled: false }
  )

  return (
    <PageComponent>
      <PageTitle title="Clientes">
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="btn btn-square btn-ghost">
            {isRefetching ? <Loading color='black' type='spin' width={15} height={15} /> : <ArrowsClockwise /> }
          </button>
          <button className="btn btn-square btn-ghost">
            <Plus />
          </button>
          {/* <input type="text" className="input" placeholder="Pequisar" /> */}
          <input
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder="Documento"
            type="text"
            className="input"
          />
        
        <button onClick={() => refetch()} className="btn btn-primary">           
             <span className='ml-3'>Buscar</span>
          </button>
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
