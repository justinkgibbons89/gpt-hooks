import { useState } from 'react'
import { useOpenAIConfig } from './useAPIKey'

/**
 *
 * A hook that returns a function that sends a message to the OpenAI chat API.
 *
 * @returns {Object} An object with the following properties:
 * - `sendChat`: A function that sends a message to the OpenAI chat API.
 * - `responses`: The responses from the OpenAI chat API, sorted reverse-chronologically.
 * - `loading`: A boolean indicating whether the request is loading.
 * - `error`: An error object.
 */
export function useChatCompletion() {
    const [loading, setLoading] = useState(false)
    const [responses, setResponses] = useState<string[]>([])
    const [messages, setMessages] = useState<string[]>([])
    const [error, setError] = useState<Error | null>()
    // const [model] = useModel()
    // const [key] = useOpenAIKey()
    const { config } = useOpenAIConfig()

    /**
     * Sends a message to the OpenAI chat API.
     *
     * @param {string} message The message to send.
     * @param {string} role The role of the message. Either 'user' or 'assistant'.
     * @param {string} version The version of the API to use. Either 'v1' or 'v2'.
     * @param {number} temperature The temperature to use for the API request.
     * @param {boolean} stream Whether to stream the response from the API.
     * @param {number} max_tokens The maximum number of tokens to return.
     * @returns {Promise<void>} A promise that resolves when the request is complete.
     * @throws {Error} An error object.
     */
    async function sendChat(
        message: string,
        handleResponse?: (message: string) => void,
        role = config.role,
        version = 'v1',
        temperature = config.temp,
        stream = config.stream,
        max_tokens = config.maxTokens,
    ) {
        setLoading(true)
        setError(null)

        try {
            const result = await fetch(
                `https://api.openai.com/${version}/chat/completions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${config.key}`,
                    },
                    body: JSON.stringify({
                        model: config.model,
                        messages: [{ role, content: message }],
                        temperature,
                        stream,
                        max_tokens,
                    }),
                },
            )

            setMessages([...messages, message])

            const json = await result.json()
            console.log(json)
            if (json.error) {
                throw new Error(json.error.message || 'No response')
            }
            console.log(new Date().toDateString())
            if (json.choices[0] && json.choices[0].message.content) {
                setResponses([...responses, json.choices[0].message.content])
                handleResponse?.(json.choices[0].message.content)
            } else {
                console.log(json)
                throw new Error('No response')
            }
        } catch (e: any) {
            setError(e)
            console.log('Error: ', e)
        }

        setLoading(false)
    }

    return { responses, setResponses, loading, error, sendChat }
}
