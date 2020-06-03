import { get } from 'axios'

export function getGrantees() {
    return get('/grantees')
}