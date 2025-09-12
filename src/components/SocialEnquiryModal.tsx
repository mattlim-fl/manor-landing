import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Instagram, Facebook } from 'lucide-react';
import { buildInstagramDmUrl, buildMessengerUrl, deriveFacebookPageUsernameFromUrl, buildInstagramProfileUrl } from '@/lib/social';

interface SocialEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  instagramHandle?: string;
  facebookPageUrl?: string;
}

const SocialEnquiryModal: React.FC<SocialEnquiryModalProps> = ({ isOpen, onClose, instagramHandle, facebookPageUrl }) => {
  const instagramDmUrl = buildInstagramDmUrl(instagramHandle || '');
  const instagramProfileUrl = buildInstagramProfileUrl(instagramHandle || '');
  const fbUsername = deriveFacebookPageUsernameFromUrl(facebookPageUrl);
  const messengerUrl = buildMessengerUrl(fbUsername);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-full max-w-[80vw] sm:max-w-md mx-auto p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-medium">Enquire with us</DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Message our team to plan your birthday or special occasion. Choose your preferred platform below.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center items-center">
            {instagramDmUrl && (
              <Button asChild style={{ backgroundColor: '#E1306C' }} className="rounded-full px-6 py-3 w-full sm:w-auto">
                <a href={instagramDmUrl} target="_blank" rel="noopener noreferrer" className="text-white inline-flex items-center justify-center">
                  <Instagram className="mr-2" /> Instagram
                </a>
              </Button>
            )}
            {!instagramDmUrl && instagramProfileUrl && (
              <Button asChild style={{ backgroundColor: '#E1306C' }} className="rounded-full px-6 py-3 w-full sm:w-auto">
                <a href={instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="text-white inline-flex items-center justify-center">
                  <Instagram className="mr-2" /> Instagram
                </a>
              </Button>
            )}

            {messengerUrl && (
              <Button asChild style={{ backgroundColor: '#0084FF' }} className="rounded-full px-6 py-3 w-full sm:w-auto">
                <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className="text-white inline-flex items-center justify-center">
                  <Facebook className="mr-2" /> Messenger
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialEnquiryModal;


