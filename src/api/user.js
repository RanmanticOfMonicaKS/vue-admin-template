import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login_6c3fc805',
        method: 'get',
        params: data,
    })
}