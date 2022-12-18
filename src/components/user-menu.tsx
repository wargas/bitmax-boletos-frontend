import { Menu } from "@headlessui/react";
import { Password, SignOut } from "phosphor-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useModalStore from "../stores/modal-store";
import AlterarSenha from "./alterar-senha";
type Props = {

} & React.ComponentProps<"div">
export default function UserMenu({children}: Props) {

    const open = useModalStore(s => s.openModal);
    const navigate = useNavigate()

    async function handleOpenAlterarSenha() {
        await open(AlterarSenha, {})          
    }

    return (
        <Menu>
            <Menu.Button as={React.Fragment}>{children}</Menu.Button>
            <Menu.Items className="bg-white flex flex-col z-50 overflow-hidden shadow rounded mt-1 absolute right-0 min-w-[15rem]">
                
                <Menu.Item>
                    <button onClick={handleOpenAlterarSenha} className="flex disabled:opacity-70 items-center gap-4 py-2 px-4 hover:bg-primary-500 hover:text-white transition-all text-base text-gray-700 m-1 rounded">
                    <Password  />Alterar Senha</button>
                </Menu.Item>
                <Menu.Item>
                    <button onClick={() => navigate('/login')} className="flex items-center gap-4 py-2 px-4 hover:bg-primary-500 hover:text-white transition-all text-base text-gray-700 m-1 rounded">
                    <SignOut />  Sair</button>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}