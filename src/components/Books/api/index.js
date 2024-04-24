import { $ajax } from '@/api'

export function books(data) {
    return $ajax({
        url: '/bbdaxia/book?name=' + data,
        method: 'get'
    })
}