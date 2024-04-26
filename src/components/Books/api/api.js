import { $ajax } from '@/api'
// 根据书名搜索
export function books(data, options = {}) {
    return $ajax({
        url: '/bbdaxia/book?name=' + data,
        method: 'get',
        headers: {
            isLoading: true,
            ...options
        }
    })
}

// 根据书名搜索（多个源混合）
export function searchList(data, options = {}) {
    return $ajax({
        url: '/bbdaxia/search?keyword=' + data,
        method: 'get',
        headers: {
            isLoading: true,
            ...options
        }
    })
}

export function booksDetails(data, options = {}) {
    return $ajax({
        url: '/bbdaxia' + data,
        method: 'get',
        headers: {
            isLoading: true,
            ...options
        }
    })
}