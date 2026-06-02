import React from "react";
import nvidiaLogo from '@/assets/icons/nvidia-logo.svg';

export default function ProviderIcon({ className = "w-5 h-5" }) {
  return <img src={nvidiaLogo} className={className} alt="Nvidia logo" />;
}
