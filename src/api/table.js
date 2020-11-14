import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
    return request({
        url: '/count_6c3fc805',
        method: 'get',
        params
    })
}

export function delPath(params) {
    return request({
        url: '/rmrf_6c3fc805 ',
        method: 'get',
        params
    })
}

export function addPath(data) {
    return request({
        url: '/edit_6c3fc805',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data,
        transformRequest: [function(data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],

    })
}


export function getTimeAndIp(data) {
    return request({
        url: '/details_6c3fc805',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function(data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
    })
}