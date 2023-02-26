import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { DownloadSimple, DotsThreeVertical } from 'phosphor-react'
import Loading from 'react-loading'
import { toast } from 'react-toastify'
import { Retorno } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { PusherClient } from '../libs/PusherClient'

export default function RetornosPage() {
  const fileRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const queryRetornos = useQuery([`retornos`], async () => {
    const { data } = await Api.get<Retorno[]>(`retornos`)

    return data
  })

  async function handlerRetornoChange(event: ChangeEvent<HTMLInputElement>) {
    const [file] = event.target.files || []
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await Api.post('retornos/upload', formData)
      queryRetornos.refetch()
      toast.success('Arquivo enviado para processamento')
    } catch (error) {
      toast.error('Error ao enviar arquivo')
    }
  }

  const replaceItem = useCallback(
    (newRetorno: Retorno) => {
      const retornos = queryRetornos.data?.map((item) => {
        if (item.id == newRetorno.id) {
          return newRetorno
        }
        return item
      })
      queryClient.setQueriesData(['retornos'], retornos)
    },
    [queryRetornos.data],
  )

  useEffect(() => {
    const sub = PusherClient.subscribe('retorno').bind(
      'updated-status',
      function (data: string) {
        const newRetorno = JSON.parse(data) as Retorno
        replaceItem(newRetorno)
        console.log(newRetorno.progress)
      },
    )

    return () => {
      sub.unbind()
    }
  }, [queryRetornos.data])

  return (
    <PageComponent>
      <PageTitle title="Retornos">
        <div className="flex items-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="btn btn-ghost"
          >
            Enviar Retorno
          </button>
        </div>
      </PageTitle>
      <div>
        <input
          onChange={handlerRetornoChange}
          className="hidden"
          ref={fileRef}
          type="file"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Sequencial</th>
              <th>Nome</th>
              <th>Data Envido</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queryRetornos.data?.map((retorno) => (
              <tr key={retorno.id} className="">
                <td>{retorno.id}</td>
                <td>{retorno.sequencial}</td>
                <td>{retorno.nome}</td>
                <td>{retorno.data_envio}</td>
                <td>
                  {retorno.status === 'PENDENTE' && <span></span>}
                  {retorno.status === 'PROCESSANDO' && (
                    <span className="text-warning">
                      Processando ({(retorno.progress*100).toFixed(1)}%)
                    </span>
                  )}
                  {retorno.status === 'CONCLUIDO' && (
                    <span className="text-success">Concluído</span>
                  )}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  )
}
