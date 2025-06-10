
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = '',
  className = '',
  children
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 font-medium hover:bg-[#20C65A] transition-colors rounded ${className}`}
    >
      <MessageCircle size={20} />
      {children || 'Chat on WhatsApp'}
    </button>
  );
};

export default WhatsAppButton;
