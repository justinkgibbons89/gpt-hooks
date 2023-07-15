# GPT-Hooks
React hooks for Chat-GPT. 

## Usage
The primary hook is `useChatCompletion`.
```typescript
function ChatComponent() {
  const { responses, setResponses, loading, error, sendChat } = useChatCompletion()

  return (
        <div>
            <button onClick={() => sendChat('Hello')}>Send</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                {responses.map((response) => (
                    <p>{response}</p>
                ))}
            </div>
        </div>
  )
}
```
