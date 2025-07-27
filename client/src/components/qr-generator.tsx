import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRGenerator({ value, size = 256, className = "" }: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [value, size]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'bikeraid-qr-code.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <canvas ref={canvasRef} className="border-2 border-gray-200 rounded-lg mx-auto" />
      <Button 
        onClick={downloadQR}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        Download QR Code
      </Button>
    </div>
  );
}
