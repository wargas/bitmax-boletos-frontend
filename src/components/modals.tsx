import { createContext, useContext } from 'react'
import useModalStore from '../stores/modal-store'

type ModalContextProps = {
  data: any
  id: string
  closeModal: (data: any) => void
}
const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

export default function Modals() {
  const close = useModalStore((s) => s.closeModal)
  const list = useModalStore((s) => s.modals)

  const modalsList = useModalStore((s) => s.modals)

  function closeModal(id: string) {
    return function (data: any) {
      list.find((m) => m.id === id)?.resolve(data)
      close(id)
    }
  }

  if (modalsList.length === 0) return null

  return (
    <div className="absolute inset-0">
      {modalsList.map(({ id, component: Component, data }) => (
        <ModalContext.Provider
          key={id}
          value={{ data, id, closeModal: closeModal(id) }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div onClick={() => closeModal(id)(null)} className='absolute cursor-pointer inset-0 bg-black/30'></div>
            <div className='bg-white w-full relative max-w-[500px] shadow rounded-lg'>
              <Component />
            </div>
          </div>
        </ModalContext.Provider>
      ))}
      <div className="absolute justify-end text-white divide-x items-center bottom-0 left-0 right-0 h-10 bg-primary flex">
        {modalsList.map((modal) => (
          <div className="px-4" key={modal.id}>
            {modal.id}{' '}
            <button onClick={() => closeModal(modal.id)({})}>x</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function useCloseModal() {
  const ctx = useContext(ModalContext)

  return ctx.closeModal
}

export function useDataModal() {
  const ctx = useContext(ModalContext)

  return ctx.data
}
