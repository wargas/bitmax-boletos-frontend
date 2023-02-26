import Pusher from 'pusher-js'

export const PusherClient = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    forceTLS: false,
    cluster: '',
    disableStats: true,
    enabledTransports: ['ws', 'wss']
});