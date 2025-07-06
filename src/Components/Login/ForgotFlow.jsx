
// ForgotFlow.jsx
import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';

const ForgotFlow = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <ForgotPassword onNext={() => setStep(2)} />}
      {step === 2 && <OTPVerification onNext={() => setStep(3)} />}
      {step === 3 && <ResetPassword />}
    </>
  );
};

export default ForgotFlow;