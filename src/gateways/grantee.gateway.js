import { get, post } from 'axios'

export function getGrantees() {
    return get('/grantees')
}

export function getGranteeById(id) {
    return get(`/grantees/${id}`)
}

export function create(data) {
    return post(`/grantees`)
}

export function update(id, data) {
    return post(`/grantees/${id}`, { data })
}