import { get, post } from 'axios'

export function getGrantees() {
    return get('/grantee')
}

export function getGranteeById(id) {
    return get(`/grantee/${id}`)
}

export function create(data) {
    return post(`/grantee/create`)
}

export function update(id, data) {
    return post(`/grantee/update/${id}`, { data })
}