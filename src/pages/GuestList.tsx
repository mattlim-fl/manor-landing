import { useSearchParams } from 'react-router-dom'
import GuestListEditor from '../components/GuestListEditor'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function GuestListPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''

  // Token format: bookingId.expiry.signature
  const [bookingId] = token.split('.')

  const valid = Boolean(bookingId && token.split('.').length >= 3)

  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header />
      <main className="flex-1 mx-auto flex max-w-3xl w-full flex-col px-4 pt-32 pb-12">
        <h1 
          className="font-blur font-bold text-2xl md:text-3xl tracking-wider uppercase"
          style={{ color: '#E59D50' }}
        >
          Curate your guest list
        </h1>
        <p 
          className="mt-2 text-sm font-acumin"
          style={{ color: '#E59D50' }}
        >
          Use this page to add or update the names of the guests who will be using your karaoke tickets.
        </p>

        {!valid && (
          <div className="mt-6 rounded-lg border border-red-500/60 bg-red-500/10 p-4 text-sm text-red-100">
            <p className="font-medium">This link is not valid.</p>
            <p className="mt-1 text-xs text-red-200">
              Please open the guest list link directly from your latest confirmation email, or contact the venue if you
              need help updating your guests.
            </p>
          </div>
        )}

        {valid && bookingId && (
          <GuestListEditor
            bookingId={bookingId}
            token={token}
            heading="Your guests"
            subheading="Add the names of your guests so they're on the door when they arrive. You can update this list any time before your booking."
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
