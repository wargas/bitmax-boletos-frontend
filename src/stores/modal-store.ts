import create from "zustand";

type ModalData<T = any, P = any> = {
    id: string
    data: T
    component: () => JSX.Element
    resolve: (data: P) => void
}

type ModalStoreProps = {
    modals: ModalData[]
    openModal: (component: () => JSX.Element, data: any) => Promise<any>
    closeModal: (id: string) => void
}

const useModalStore = create<ModalStoreProps>(set => ({
    modals: [],
    openModal: (component, data) => {
        return new Promise(accept => {
            const modalData: ModalData = {
                id: Math.floor(Math.random() * Date.now()).toString(),
                data: data,
                component: component,
                resolve: accept
            }
            set(state => ({...state, modals: [...state.modals, modalData]}))
        })
    },
    closeModal: (id: string) => {
        set(state => ({...state, modals: state.modals.filter(m => m.id != id)}))
    }
}))

export default useModalStore;