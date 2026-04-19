import { ScanLine, CheckCircle2, FlaskConical, ThermometerSnowflake, Calendar, Hash } from 'lucide-react';
import { useState } from 'react';

interface QuickDeductProps {
  onDeduct: () => void;
  disabled?: boolean;
}

export default function QuickDeduct({ onDeduct, disabled }: QuickDeductProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScan = () => {
    if (disabled || isScanning || isSuccess) return;

    setIsScanning(true);
    
    // Simulate QR scan delay
    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      onDeduct();

      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    }, 800);
  };

  return (
    <button
      onClick={handleScan}
      disabled={disabled || isScanning}
      className={`
        relative overflow-hidden group flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-base focus:ring-offset-2 focus:ring-offset-midnight-dark
        ${isSuccess 
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
          : disabled 
            ? 'bg-midnight-light/20 text-gray-500 border border-midnight-light/20 cursor-not-allowed'
            : 'bg-amber-base/10 text-amber-base border border-amber-base/30 hover:bg-amber-base/20 hover:border-amber-base hover:shadow-[0_0_15px_rgba(230,170,91,0.3)]'
        }
      `}
    >
      {/* Scanning beam animation */}
      {isScanning && (
        <span className="absolute inset-0 block bg-gradient-to-b from-transparent via-amber-base/30 to-transparent w-full h-[200%] animate-[scan_1s_ease-in-out_infinite] pointer-events-none" />
      )}

      {isSuccess ? (
        <>
          <CheckCircle2 size={18} className="animate-[bounce_0.5s_ease-out]" />
          <span>Deducted</span>
        </>
      ) : isScanning ? (
        <>
          <ScanLine size={18} className="animate-pulse" />
          <span>Scanning...</span>
        </>
      ) : (
        <>
          <ScanLine size={18} className="group-hover:scale-110 transition-transform" />
          <span>Quick Deduct</span>
        </>
      )}
    </button>
  );
}
