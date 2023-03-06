import Pusher from 'pusher-js'

export const PusherClient = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    // wsHost: import.meta.env.VITE_PUSHER_HOST,
    // wsPort: import.meta.env.VITE_PUSHER_PORT,
    // wssPort: import.meta.env.VITE_PUSHER_PORT,
    forceTLS: true,
    cluster: 'us2',
    // disableStats: true,
    // enabledTransports: ['ws', 'wss']
});