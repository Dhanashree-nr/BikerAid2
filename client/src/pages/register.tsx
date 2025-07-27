import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBikerSchema, type InsertBiker } from "@shared/schema";
import { QRGenerator } from "@/components/qr-generator";
import { ProfilePictureUpload } from "@/components/profile-picture-upload";
import { User, Heart, Phone, Camera, QrCode } from "lucide-react";

const extendedBikerSchema = insertBikerSchema.extend({
  terms: insertBikerSchema.shape.fullName.optional(),
});

type BikerFormData = InsertBiker & { terms?: string };

export default function Register() {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BikerFormData>({
    resolver: zodResolver(extendedBikerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      bloodType: "",
      medicalConditions: "",
      allergies: "",
      medications: "",
      emergencyContact1Name: "",
      emergencyContact1Phone: "",
      emergencyContact2Name: "",
      emergencyContact2Phone: "",
      profilePictureUrl: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InsertBiker) => {
      const response = await apiRequest('POST', '/api/bikers', data);
      return response.json();
    },
    onSuccess: (data) => {
      setQrCode(data.qrCode);
      setRegistrationComplete(true);
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Registration Successful!",
        description: "Your emergency profile has been created and your QR code is ready.",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BikerFormData) => {
    const { terms, ...bikerData } = data;
    registerMutation.mutate(bikerData);
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-black flex items-center justify-center gap-2">
                <QrCode className="text-red-500" />
                Registration Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl text-gray-600">
                Your emergency profile has been created successfully. Here's your life-saving QR code:
              </p>
              <QRGenerator value={qrCode} size={300} />
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Instructions:</h3>
                <ul className="text-yellow-700 text-sm text-left space-y-1">
                  <li>• Print your QR code on waterproof material</li>
                  <li>• Attach it securely to your helmet</li>
                  <li>• Keep your profile information up to date</li>
                  <li>• Share this system with fellow bikers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Create Your Emergency Profile</h1>
          <p className="text-xl text-gray-600">Join thousands of bikers who are already prepared for emergencies</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6 flex items-center">
                  <User className="text-red-500 mr-3" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...form.register("dateOfBirth")}
                      className="mt-1"
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.dateOfBirth.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      {...form.register("phoneNumber")}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                    {form.formState.errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phoneNumber.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Profile Picture Upload */}
                <div className="mt-6">
                  <ProfilePictureUpload
                    value={form.watch("profilePictureUrl") || ""}
                    onChange={(url) => form.setValue("profilePictureUrl", url)}
                    error={form.formState.errors.profilePictureUrl?.message}
                  />
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6 flex items-center">
                  <Heart className="text-red-500 mr-3" />
                  Critical Medical Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bloodType">Blood Type *</Label>
                    <Select onValueChange={(value) => form.setValue("bloodType", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Blood Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.bloodType && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.bloodType.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Input
                      id="medicalConditions"
                      {...form.register("medicalConditions")}
                      placeholder="Diabetes, Hypertension, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      {...form.register("allergies")}
                      placeholder="List any known allergies (medications, foods, etc.)"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      {...form.register("medications")}
                      placeholder="List current medications and dosages"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6 flex items-center">
                  <Phone className="text-red-500 mr-3" />
                  Emergency Contacts
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyContact1Name">Primary Contact Name *</Label>
                    <Input
                      id="emergencyContact1Name"
                      {...form.register("emergencyContact1Name")}
                      placeholder="Contact person name"
                      className="mt-1"
                    />
                    {form.formState.errors.emergencyContact1Name && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.emergencyContact1Name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyContact1Phone">Primary Contact Phone *</Label>
                    <Input
                      id="emergencyContact1Phone"
                      type="tel"
                      {...form.register("emergencyContact1Phone")}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                    {form.formState.errors.emergencyContact1Phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.emergencyContact1Phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyContact2Name">Secondary Contact Name</Label>
                    <Input
                      id="emergencyContact2Name"
                      {...form.register("emergencyContact2Name")}
                      placeholder="Optional second contact"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyContact2Phone">Secondary Contact Phone</Label>
                    <Input
                      id="emergencyContact2Phone"
                      type="tel"
                      {...form.register("emergencyContact2Phone")}
                      placeholder="+1 (555) 987-6543"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <a href="#" className="text-red-500 hover:underline">Terms of Service</a> and{" "}
                  <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-red-500 text-white py-4 px-8 text-lg font-semibold hover:bg-red-600 transition-colors"
              >
                {registerMutation.isPending ? (
                  "Creating Profile..."
                ) : (
                  <>
                    <QrCode className="mr-3 h-5 w-5" />
                    Create My Emergency Profile & QR Code
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
