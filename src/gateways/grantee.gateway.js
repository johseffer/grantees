import { get, post } from 'axios'

export function getGrantees() {
    return get('/grantee')
}

export function getGranteeById(id) {
    return get(`/grantee/${id}`)
}

export function create(data) {
    return post(`/grantee/create`, data)
}

export function update(id, data) {
    return post(`/grantee/update/${id}`, data)
}

export function remove(ids) {
    return post('/grantee/delete', { ids: ids })
}