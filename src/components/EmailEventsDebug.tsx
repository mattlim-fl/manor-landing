import React, { useState, useEffect } from 'react'
import { getEmailEvents } from '../services/email'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface EmailEvent {
  id: string
  booking_id: string
  recipient_email: string
  template: string
  status: 'queued' | 'sent' | 'failed'
  error?: string
  metadata?: any
  created_at: string
}

export default function EmailEventsDebug() {
  const [emailEvents, setEmailEvents] = useState<EmailEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState('')

  const fetchEmailEvents = async (bookingId: string) => {
    if (!bookingId.trim()) return
    
    setLoading(true)
    try {
      const events = await getEmailEvents(bookingId)
      setEmailEvents(events as unknown as EmailEvent[])
    } catch (error) {
      console.error('Failed to fetch email events:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'queued': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Email Events Debug</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter booking ID"
                value={selectedBookingId}
                onChange={(e) => setSelectedBookingId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <Button 
                onClick={() => fetchEmailEvents(selectedBookingId)}
                disabled={loading || !selectedBookingId.trim()}
              >
                {loading ? 'Loading...' : 'Fetch Events'}
              </Button>
            </div>

            {emailEvents.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  Email Events for Booking: {selectedBookingId}
                </h3>
                {emailEvents.map((event) => (
                  <Card key={event.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(event.status)}>
                            {event.status.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{event.template}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(event.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div><strong>Recipient:</strong> {event.recipient_email}</div>
                        {event.error && (
                          <div className="text-red-600">
                            <strong>Error:</strong> {event.error}
                          </div>
                        )}
                        {event.metadata && (
                          <div>
                            <strong>Metadata:</strong>
                            <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                              {JSON.stringify(event.metadata, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {emailEvents.length === 0 && !loading && selectedBookingId && (
              <div className="text-center text-gray-500 py-8">
                No email events found for this booking ID
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



