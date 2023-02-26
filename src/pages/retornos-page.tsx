import { useMutation, useQuery } from '@tanstack/react-query'
import PageTitle from '../components/page-title'
import Api from '../libs/Api'
import { DownloadSimple, DotsThreeVertical } from 'phosphor-react'
import Loading from 'react-loading'
import { toast } from 'react-toastify'
import { Retorno } from '../interfaces/api-interfaces'
import PageComponent from '../components/page'
import { ChangeEvent, useRef, useState } from 'react'

export default function RetornosPage() {

  const fileRef = useRef<HTMLInputElement>(null);
//   const [retorno, setRetorno] = useState<Retorno>();


  const { data, refetch, isRefetching } = useQuery([`retornos`], async () => {
    const { data } = await Api.get<Retorno[]>(`retornos`)

    return data
  })


  async function handlerRetornoChange(event: ChangeEvent<HTMLInputElement>) {
    const [file] = event.target.files || [];

    const formData = new FormData();

    formData.append('file', file);

    try {
      const {data} = await Api.post('retornos/upload', formData);

    //   setRetorno(data);

      toast.success("Arquivo de retorno importado!");
    } catch (error) {
      
    }

  } 

  return (
    <PageComponent>
      <PageTitle title="Retornos">
        <div className="flex items-center">
          
           <button onClick={() => fileRef.current?.click()} className='btn btn-ghost'>
            Enviar Retorno
          </button>
        </div>
      </PageTitle>
      <div>
        <input onChange={handlerRetornoChange} className='hidden' ref={fileRef} type="file"  />
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Sequencial</th>
              <th>Nome</th>
              <th>Data Envido</th>
              <th></th>
            </tr>
          </thead>
          <tbody>    
          {data?.map((retorno) => (
              <tr key={retorno.id} className="">
                <td>
                  {retorno.id}
                </td>
                <td>
                  {retorno.sequencial}
                </td>
                <td>
                  {retorno.nome}
                </td>
                <td>
                  {retorno.data_envio}
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  )
}
