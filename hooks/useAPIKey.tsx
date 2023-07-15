import { createContext, useContext, useState } from 'react'
require('dotenv').config()

export function useOpenAIKey() {
    const [key, setKey] = useState(process.env.API_KEY)

    return [key, setKey]
}

export function useOpenAIConfig() {
    const { config, setConfig } = useContext(OpenAIConfigContext)

    return {
        config,
        setConfig,
    }
}

/**
 *
 * Checks if the given model is available to use.
 *
 * @param model The model to check.
 * @returns True if the model is available, false otherwise.
 */
export function modelIsAvailable(model: OpenAIModel) {
    return model !== OpenAIModel.gpt4
}

/* GPT Models */
export enum OpenAIModel {
    davinci = 'text-davinci-003',
    babbage = 'text-babbage-001',
    curie = 'text-curie-001',
    ada = 'text-ada-001',
    gpt3turbo = 'gpt-3.5-turbo',
    gpt4 = 'gpt-4',
}

/* Default config */
export const OPENAI_DEFAULT_CONFIG = {
    key: process.env.API_KEY,
    model: OpenAIModel.gpt3turbo,
    temp: 0.6,
    maxTokens: 150,
    stream: false,
    role: 'user',
}

/* Config context */
export interface OpenAIConfig {
    key: string
    model: string
    temp: number
    maxTokens: number
    stream: boolean
    role: string
}

export const OpenAIConfigContext = createContext({
    config: OPENAI_DEFAULT_CONFIG as OpenAIConfig,
    setConfig: (config: OpenAIConfig) => { },
})
