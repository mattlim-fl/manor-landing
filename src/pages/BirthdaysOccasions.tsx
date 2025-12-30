import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import SocialEnquiryModal from '../components/SocialEnquiryModal';
import GuestListEditor from '../components/GuestListEditor';
import { ENABLE_SOCIAL_ENQUIRY, INSTAGRAM_HANDLE, FACEBOOK_PAGE_URL } from '@/lib/config';

const guestListImages = [
  '/venue-dancefloor.png',
  '/venue-bar-crowd.png',
  '/venue-disco-balls.png',
];

const BirthdaysOccasions = () => {
  const [showSocialEnquiry, setShowSocialEnquiry] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Check if this is a booking guest list management link (has token parameter)
  const token = searchParams.get('token') || '';
  const [bookingId] = token.split('.');
  const hasValidToken = Boolean(bookingId && token.split('.').length >= 3);

  const handleEnquireClick = () => {
    if (ENABLE_SOCIAL_ENQUIRY) {
      setShowSocialEnquiry(true);
    } else {
      window.location.href = 'mailto:afterdark@manorleederville.com.au?subject=Birthdays%20%26%20Occasions%20Enquiry';
    }
  };

  // If there's a valid token, show the guest list editor view
  if (hasValidToken && bookingId) {
    return (
      <div className="min-h-screen flex flex-col leopard-bg text-white relative">
        {/* Background overlay to reduce visual noise */}
        <div className="absolute inset-0 bg-black/30" />
        
        <Header showLogo={true} />
        <main className="relative z-10 flex-1 mx-auto flex max-w-3xl w-full flex-col px-4 pt-32 pb-12">
          <h1 
            className="font-blur font-bold text-2xl md:text-3xl tracking-wider uppercase text-center"
            style={{ color: '#E59D50' }}
          >
            Curate your guest list
          </h1>
          <p 
            className="mt-2 text-sm font-acumin text-center"
            style={{ color: '#E59D50' }}
          >
            Use this page to add or update the names of the guests who will be using your karaoke tickets.
          </p>

          <GuestListEditor
            bookingId={bookingId}
            token={token}
            heading="Your Guests"
            subheading="Add the names of your guests so they're on the door when they arrive. You can update this list any time before your booking."
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Show invalid token error if token is present but invalid
  if (token && !hasValidToken) {
    return (
      <div className="min-h-screen flex flex-col leopard-bg text-white relative">
        {/* Background overlay to reduce visual noise */}
        <div className="absolute inset-0 bg-black/30" />
        
        <Header showLogo={true} />
        <main className="relative z-10 flex-1 mx-auto flex max-w-3xl w-full flex-col px-4 pt-32 pb-12">
          <h1 
            className="font-blur font-bold text-2xl md:text-3xl tracking-wider uppercase text-center"
            style={{ color: '#E59D50' }}
          >
            Curate your guest list
          </h1>

          <div className="mt-6 rounded-xl border border-red-300 bg-white p-4 text-sm">
            <p className="font-medium text-red-900">This link is not valid.</p>
            <p className="mt-1 text-xs text-red-700">
              Please open the guest list link directly from your latest confirmation email, or contact the venue if you
              need help updating your guests.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default: show the "Birthdays & Occasions" marketing page
  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white">
      <Header showLogo={true} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Page Title */}
          <h1 
            className="font-blur font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-8 uppercase tracking-wider"
            style={{ color: '#E59D50' }}
          >
            Guest List
          </h1>

          {/* Image Carousel */}
          <div className="mb-8">
            <ImageCarousel 
              images={guestListImages} 
              alt="Venue"
            />
          </div>

          {/* Subheading */}
          <h2 
            className="font-blur font-bold text-2xl md:text-3xl text-center mb-4 uppercase tracking-wider"
            style={{ color: '#D04E2B' }}
          >
            Birthdays & Occasions
          </h2>

          {/* Description */}
          <div className="text-center mb-8">
            <p 
              className="text-base md:text-lg font-acumin mb-2"
              style={{ color: '#E59D50' }}
            >
              Message our team to organise a birthday or special occasion.
            </p>
            <p 
              className="text-base md:text-lg font-acumin"
              style={{ color: '#E59D50' }}
            >
              Guest List entry and reserved areas available.
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center mb-12">
            <button 
              onClick={handleEnquireClick}
              className="nav-btn inline-block font-blur font-bold px-10 py-3 rounded-full uppercase tracking-wider text-lg transition-all duration-300"
            >
              ENQUIRE
            </button>
          </div>

        </div>
      </div>

      <Footer />

      {/* Social Enquiry Modal */}
      <SocialEnquiryModal
        isOpen={showSocialEnquiry}
        onClose={() => setShowSocialEnquiry(false)}
        instagramHandle={INSTAGRAM_HANDLE}
        facebookPageUrl={FACEBOOK_PAGE_URL}
      />
    </div>
  );
};

export default BirthdaysOccasions;
