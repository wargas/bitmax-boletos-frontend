import Pusher from 'pusher-js'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { PusherClient } from '../libs/PusherClient'

const PusherContext = createContext({} as { pusher: Pusher; state: string })

export const PusherProvider = ({ children }: any) => {
  const [state, setState] = useState('idle')
  const pusherRef = useRef<Pusher>(PusherClient)

  const connected = useMemo(() => (state == 'connected'), [state]);

  useEffect(() => {
    const bind = pusherRef.current.connection.bind(
      'state_change',
      (state: any) => {
        setState(state.current)
      },
    )

    return () => {
      bind.unbind('state_change')
    }
  }, [pusherRef.current.connection])

  return (
    <PusherContext.Provider value={{ pusher: pusherRef.current, state }}>
      <>
        {children}
        <div className={`${connected ? '-bottom-6 bg-green-500' : 'bottom-0 bg-red-500'} transition-all absolute left-0 right-0  h-6 `}>
          <div className="flex px-5 h-full items-center justify-end">
            <span className="text-white text-xs">{state}</span>
          </div>
        </div>
      </>
    </PusherContext.Provider>
  )
}

export function useSubscribe<T>(
  channel: string,
  event: string,
  cb: (data: T) => void = () => {},
  deps: any = [],
) {
  const { pusher } = useContext(PusherContext)

  useEffect(() => {
    const bind = pusher.subscribe(channel).bind(event, cb)
    return () => {
      bind.unbind()
    }
  }, deps)
}
