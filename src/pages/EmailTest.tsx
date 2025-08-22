import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { testVenueBookingEmail, testVenueBookingEmailHippie } from '../utils/emailTest'
import EmailEventsDebug from '../components/EmailEventsDebug'

export default function EmailTest() {
  const [testEmail, setTestEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const handleTestEmail = async (testFunction: (email?: string) => Promise<void>) => {
    if (!testEmail.trim()) {
      setResult('Please enter a test email address')
      return
    }

    setLoading(true)
    setResult('')

    try {
      await testFunction(testEmail)
      setResult('✅ Test email sent! Check your inbox and the email events below.')
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Email System Test</h1>
      
      <div className="grid gap-6">
        {/* Email Testing Section */}
        <Card>
          <CardHeader>
            <CardTitle>Test Email Functionality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="testEmail">Test Email Address</Label>
              <Input
                id="testEmail"
                type="email"
                placeholder="Enter your email to test"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => handleTestEmail(testVenueBookingEmail)}
                disabled={loading || !testEmail.trim()}
                variant="default"
              >
                {loading ? 'Sending...' : 'Test Manor Email'}
              </Button>
              
              <Button
                onClick={() => handleTestEmail(testVenueBookingEmailHippie)}
                disabled={loading || !testEmail.trim()}
                variant="outline"
              >
                {loading ? 'Sending...' : 'Test Hippie Email'}
              </Button>
            </div>

            {result && (
              <div className={`p-4 rounded-md ${
                result.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {result}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Events Debug Section */}
        <EmailEventsDebug />
      </div>
    </div>
  )
}
