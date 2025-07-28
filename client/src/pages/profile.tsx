import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Phone, AlertTriangle, Pill } from "lucide-react";
import type { Biker } from "@shared/schema";

export default function Profile() {
  const [match, params] = useRoute("/profile/:id");
  const bikerId = params?.id;

  const { data: biker, isLoading, error } = useQuery<Biker>({
    queryKey: ['/api/profile', bikerId],
    enabled: !!bikerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading Emergency Profile...</p>
        </div>
      </div>
    );
  }

  if (error || !biker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-500 mb-2">Profile Not Found</h2>
            <p className="text-gray-600">This emergency profile could not be located.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Emergency Profile</h1>
          <p className="text-gray-300">BikerAid Emergency Information System</p>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
          {/* Emergency Header */}
          <div className="bg-red-500 text-white p-4 text-center">
            <Ambulance className="w-8 h-8 mx-auto mb-2" />
            <h2 className="text-xl font-bold">EMERGENCY PROFILE</h2>
            <p className="text-sm opacity-90">BikerAid Emergency Information</p>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Profile Picture and Basic Info */}
            <div className="text-center mb-6">
              <img 
                src={biker.profilePictureUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                alt={biker.fullName}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-red-500 object-cover"
              />
              <h3 className="text-2xl font-bold text-black">{biker.fullName}</h3>
              <p className="text-gray-600">Age: {calculateAge(biker.dateOfBirth)}</p>
            </div>

            {/* Critical Medical Info */}
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-semibold">Blood Type</span>
                </div>
                <p className="text-2xl font-bold text-red-500">{biker.bloodType}</p>
              </div>

              {biker.allergies && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="font-semibold">Allergies</span>
                  </div>
                  <p>{biker.allergies}</p>
                </div>
              )}

              {biker.medicalConditions && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <Pill className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="font-semibold">Medical Conditions</span>
                  </div>
                  <p>{biker.medicalConditions}</p>
                </div>
              )}

              {biker.medications && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <Pill className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="font-semibold">Current Medications</span>
                  </div>
                  <p>{biker.medications}</p>
                </div>
              )}
            </div>

            {/* Emergency Contacts */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-lg text-black mb-4">Emergency Contacts</h4>
              
              <a 
                href={`tel:${biker.emergencyContact1Phone}`}
                className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Phone className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="font-semibold text-black">{biker.emergencyContact1Name}</p>
                  <p className="text-green-600 font-medium">{biker.emergencyContact1Phone}</p>
                  <p className="text-sm text-gray-500">Tap to Call</p>
                </div>
              </a>

              {biker.emergencyContact2Name && biker.emergencyContact2Phone && (
                <a 
                  href={`tel:${biker.emergencyContact2Phone}`}
                  className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Phone className="w-6 h-6 text-green-600 mr-4" />
                  <div>
                    <p className="font-semibold text-black">{biker.emergencyContact2Name}</p>
                    <p className="text-green-600 font-medium">{biker.emergencyContact2Phone}</p>
                    <p className="text-sm text-gray-500">Tap to Call</p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">
            <p>Last Updated: {new Date(biker.updatedAt!).toLocaleDateString()}</p>
            <p className="mt-1">Powered by BikerAid Emergency System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
