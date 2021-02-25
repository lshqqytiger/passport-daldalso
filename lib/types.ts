interface Profile {
    provider: 'daldalso'
    key: string
    id?: number | string
    displayName?: string
    name?: string
    account?: string
    libra?: JSON
    foveon?: number
    profile?: JSON
    _raw: string
    _json: JSON
}

export { Profile }