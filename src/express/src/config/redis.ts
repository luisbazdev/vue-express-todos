import { createClient } from 'redis'

export function initializeRedis(){
    let client = createClient()

    client.on('error', (err) => console.log(err))
    
    client.connect()

    return client
}
