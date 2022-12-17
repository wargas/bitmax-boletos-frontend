import { useMutation, useQuery } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { DownloadSimple, DotsThreeVertical } from 'phosphor-react'
import Loading from 'react-loading'
import { toast } from 'react-toastify'
import { Remessa } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'

export default function RemessasPage() {
  const mutation = useMutation(async () => {
    try {
      const { data } = await Api.post(`remessas`, {})
      toast.success('Remessa criada com sucesso!')
      refetch()
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar criar a remessa')
    }
  })

  const { data, refetch, isRefetching } = useQuery([`remessas`], async () => {
    const { data } = await Api.get<Remessa[]>(`remessas`)

    return data
  })

  async function handlerDownload(id: number) {
    const { data } = await Api.get(`remessas/download/${id}`, {
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([data]))

    const link = document.createElement('a')

    link.href = url

    link.setAttribute('download', `remessa-${id}.txt`)

    document.body.appendChild(link)

    link.click()

    link.remove()
  }

  return (
    <PageComponent>
      <PageTitle title="Remessas">
        <div className="flex items-center">
          {mutation.isLoading || isRefetching  && (
            <Loading type="spin" width={15} height={15} color="black" />
          )}
          <button
            onClick={() => mutation.mutate()}
            className="button border-none h-10 flex items-center justify-center"
          >
            <span>Gerar Remessa</span>
          </button>
        </div>
      </PageTitle>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Sequencial</th>
              <th>Criação</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((remessa) => (
              <tr key={remessa.id} className="">
                <td>
                  {remessa.sequencial}
                </td>
                <td>
                  {remessa.data_criacao}
                </td>
                <td>
                  {remessa.status}
                </td>
                <td>
                  <div className="flex  transition-all justify-end gap-2">
                    <button
                      onClick={() => handlerDownload(remessa.id)}
                      className="w-8 h-8 rounded-full  flex justify-center items-center"
                    >
                      <DownloadSimple />
                    </button>
                    <button className="w-8 h-8 rounded-full  flex justify-center items-center">
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
