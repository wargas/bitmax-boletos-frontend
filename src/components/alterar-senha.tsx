import { X } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useCloseModal } from './modals'

export default function AlterarSenha() {

    const close = useCloseModal()

    return <div className="p-0 flex flex-col">
        <div className="p-4 border-b flex justify-between">
            <h1 className="font-extrabold text-gray-700 text-xl">Alterar Senha</h1>

            <button onClick={() => close(null)}><X /></button>
        </div>
        <div className="p-4 flex flex-col gap-4">
            <input type="password" placeholder="Senha atual" className="rounded" />
            <input type="password" placeholder="Nova Senha" className="rounded" />
            <input type="password" placeholder="Confirmação" className="rounded" />

            <button onClick={() => toast.info("Este recurso não está funcionando ainda")} className="button primary">Salvar</button>
        </div>
    </div>
}