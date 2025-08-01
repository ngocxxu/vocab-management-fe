export class SSEConnection {
  private eventSource: EventSource | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private url: string = ''
  private onMessageCallback: ((event: MessageEvent) => void) | undefined = undefined
  private onErrorCallback: ((error: Event) => void) | undefined = undefined

  connect(url: string, onMessage?: (event: MessageEvent) => void, onError?: (error: Event) => void): EventSource {
    this.url = url
    this.onMessageCallback = onMessage || undefined
    this.onErrorCallback = onError || undefined

    try {
      this.eventSource = new EventSource(url, {
        withCredentials: true
      })
      
      this.eventSource.onopen = () => {
        console.log('SSE connection established')
        this.reconnectAttempts = 0
      }

      this.eventSource.onmessage = (event) => {
        if (this.onMessageCallback) {
          this.onMessageCallback(event)
        }
      }

      this.eventSource.onerror = (error) => {
        console.error('SSE connection error:', error)
        if (this.onErrorCallback) {
          this.onErrorCallback(error)
        }
        this.handleReconnect()
      }

      return this.eventSource
    } catch (error) {
      console.error('Failed to create SSE connection:', error)
      throw error
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      this.connect(this.url, this.onMessageCallback, this.onErrorCallback)
    }, delay)
  }

  isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN
  }
}

let sseConnection: SSEConnection | null = null

export const initSSE = (url: string, onMessage?: (event: MessageEvent) => void, onError?: (error: Event) => void): SSEConnection => {
  if (sseConnection) {
    return sseConnection
  }

  sseConnection = new SSEConnection()
  return sseConnection.connect(url, onMessage, onError) as unknown as SSEConnection
}

export const getSSE = (): SSEConnection | null => sseConnection

export const disconnectSSE = (): void => {
  if (sseConnection) {
    sseConnection.disconnect()
    sseConnection = null
  }
} 