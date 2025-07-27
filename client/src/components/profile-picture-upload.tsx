import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Camera, Upload, X } from "lucide-react";

interface ProfilePictureUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export function ProfilePictureUpload({ value, onChange, error }: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string>(value);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 for now (in a real app, you'd upload to cloud storage)
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setPreview(base64String);
        onChange(base64String);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <Label>Profile Picture</Label>
      <div className="flex items-start space-x-4">
        {/* Preview */}
        <div className="flex-shrink-0">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Camera className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2">
          <Card className="p-4 border-dashed">
            <div className="text-center">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Add a clear photo of yourself for emergency identification
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleButtonClick}
                disabled={isUploading}
                className="text-sm"
              >
                {isUploading ? "Uploading..." : "Choose Photo"}
              </Button>
            </div>
          </Card>
          <p className="text-xs text-gray-500">
            Recommended: Clear headshot, max 5MB, JPG/PNG format
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}