import React from 'react';

interface OTPProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyOTP: (otp: string) => void;
}

const OTP: React.FC<OTPProps> = ({ isOpen, onClose, onVerifyOTP }) => {
  const [otp, setOtp] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerifyOTP(otp);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Verify OTP</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
