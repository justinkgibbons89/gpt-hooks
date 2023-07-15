import { useState } from 'react'

export function useModel() {
    const [model, setModel] = useState('gpt-3.5-turbo')
    return [model, setModel]
}
