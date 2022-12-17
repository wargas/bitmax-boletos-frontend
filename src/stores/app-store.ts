import create from "zustand";

export interface User {
    email: string
    name: string
}

interface appState {
    user: User | null
    setUser: (v: User) => void
    removeUser: () => void
}

const useAppStore = create<appState>(set => ({
    user: null,
    setUser: v => set(state => ({...state, user: v})),
    removeUser: () => set(state => ({...state, user: null}))
}))

export default useAppStore;