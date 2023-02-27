import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { DownloadSimple, DotsThreeVertical, Play } from 'phosphor-react'
import Loading from 'react-loading'
import { toast } from 'react-toastify'
import { Retorno } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { PusherClient } from '../libs/PusherClient'
import { useSubscribe } from '../providers/pusher'

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

  function reprocessar(id: number) {
    try {
      const data = Api.post(`retornos/${id}/reprocessar`)
      toast.success('Arquivo enviado para reprocessamento')
    } catch (error) {
      toast.error('Falha ao enviar para reprocessamento')
    }
  }

  useSubscribe<string>(
    'retorno',
    'updated-status',
    (data) => {
      const newRetorno = JSON.parse(data) as Retorno
      replaceItem(newRetorno)
    },
    [queryRetornos.data],
  )

  useSubscribe('teste', 'teste', console.log, [])

  return (
    <PageComponent>
      <PageTitle title="Retornos">
        <div className="flex items-center">
          <button
            onClick={() => queryRetornos.refetch()}
            className="btn btn-ghost"
          >
            Atualizar
          </button>
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
              <th>Data Enviado</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queryRetornos.data?.map((retorno) => (
              <>
                <tr key={retorno.id} className="">
                  <td>{retorno.id}</td>
                  <td>{retorno.sequencial}</td>
                  <td>{retorno.nome}</td>
                  <td>
                    {DateTime.fromSQL(retorno.data_envio).toFormat(
                      'dd/MM/y HH:mm:ss',
                    )}
                  </td>
                  <td>
                    {retorno.status === 'PENDENTE' && (
                      <span className="badge">PENDENTE</span>
                    )}
                    {retorno.status === 'PROCESSANDO' && (
                      <span className="badge-warning badge">
                        ({(retorno.progress * 100).toFixed(0)}%)
                      </span>
                    )}
                    {retorno.status === 'CONCLUIDO' && (
                      <span className="badge-success text-white badge">
                        Concluído
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end">
                      {['PENDENTE', 'FALHA'].includes(retorno.status) && (
                        <button
                          onClick={() => reprocessar(retorno.id)}
                          title="reprocessar"
                          className="btn btn-xs btn-circle btn-ghost flex"
                        >
                          <Play />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {retorno.status === 'PROCESSANDO' && (
                  <tr>
                    <td style={{padding: 0}}  colSpan={6}>
                      <div className='flex'>
                        <div style={{width: retorno.progress * 100+'%', height: 1}} className='bg-green-500 transition-all'></div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  )
}
