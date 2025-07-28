import React, { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Biker, insertBikerSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ProfilePictureUpload } from "@/components/profile-picture-upload";
import { QRGenerator } from "@/components/qr-generator";
import { apiRequest } from "@/lib/queryClient";
import { Edit, Save, X } from "lucide-react";

type UpdateBikerForm = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  bloodType: string;
  medicalConditions?: string;
  allergies?: string;
  medications?: string;
  emergencyContact1Name: string;
  emergencyContact1Phone: string;
  emergencyContact2Name?: string;
  emergencyContact2Phone?: string;
  profilePictureUrl?: string;
};

export default function Dashboard() {
  const { id } = useParams();
  const [_, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: biker, isLoading } = useQuery({
    queryKey: ["/api/bikers", id],
    queryFn: async () => {
      const response = await fetch(`/api/bikers/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Biker profile not found");
        }
        throw new Error("Failed to load profile");
      }
      return response.json() as Promise<Biker>;
    },
    enabled: !!id,
  });

  const form = useForm<UpdateBikerForm>({
    resolver: zodResolver(insertBikerSchema.omit({ qrCode: true })),
    values: biker ? {
      fullName: biker.fullName,
      email: biker.email,
      phoneNumber: biker.phoneNumber,
      dateOfBirth: biker.dateOfBirth,
      bloodType: biker.bloodType,
      medicalConditions: biker.medicalConditions || "",
      allergies: biker.allergies || "",
      medications: biker.medications || "",
      emergencyContact1Name: biker.emergencyContact1Name,
      emergencyContact1Phone: biker.emergencyContact1Phone,
      emergencyContact2Name: biker.emergencyContact2Name || "",
      emergencyContact2Phone: biker.emergencyContact2Phone || "",
      profilePictureUrl: biker.profilePictureUrl || "",
    } : undefined,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateBikerForm) => {
      const response = await apiRequest("PUT", `/api/bikers/${id}`, data);
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bikers", id] });
      setIsEditing(false);
      toast({
        title: "Profile updated!",
        description: "Your information has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });



  const onSubmit = (data: UpdateBikerForm) => {
    updateMutation.mutate(data);
  };

  const handleProfilePictureChange = (url: string) => {
    form.setValue("profilePictureUrl", url);
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!biker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-red-600">Profile Not Found</CardTitle>
            <CardDescription>
              The profile you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setLocation("/login")}>
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {biker.fullName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your emergency information and QR code
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLocation("/login")}
          >
            Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing ? "Update your emergency information" : "Your registered emergency information"}
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={updateMutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <Form {...form}>
                  <form className="space-y-4">
                    <div className="space-y-4">
                      <ProfilePictureUpload
                        value={form.watch("profilePictureUrl") || ""}
                        onChange={handleProfilePictureChange}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select blood type" />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="medicalConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical Conditions</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List any medical conditions..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List any allergies..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="medications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Medications</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List current medications..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Emergency Contacts</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="emergencyContact1Name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Primary Contact Name *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyContact1Phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Primary Contact Phone *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="emergencyContact2Name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secondary Contact Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyContact2Phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secondary Contact Phone</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  {biker.profilePictureUrl && (
                    <div className="flex justify-center">
                      <img
                        src={biker.profilePictureUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="grid gap-3">
                    <div><strong>Name:</strong> {biker.fullName}</div>
                    <div><strong>Email:</strong> {biker.email}</div>
                    <div><strong>Phone:</strong> {biker.phoneNumber}</div>
                    <div><strong>Date of Birth:</strong> {biker.dateOfBirth}</div>
                    <div><strong>Blood Type:</strong> {biker.bloodType}</div>
                    {biker.medicalConditions && (
                      <div><strong>Medical Conditions:</strong> {biker.medicalConditions}</div>
                    )}
                    {biker.allergies && (
                      <div><strong>Allergies:</strong> {biker.allergies}</div>
                    )}
                    {biker.medications && (
                      <div><strong>Medications:</strong> {biker.medications}</div>
                    )}
                    <div><strong>Primary Contact:</strong> {biker.emergencyContact1Name} - {biker.emergencyContact1Phone}</div>
                    {biker.emergencyContact2Name && (
                      <div><strong>Secondary Contact:</strong> {biker.emergencyContact2Name} - {biker.emergencyContact2Phone}</div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* QR Code Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Emergency QR Code</CardTitle>
              <CardDescription>
                Print this QR code and attach it to your helmet
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {biker?.qrCode && (
                <QRGenerator 
                  value={biker.qrCode}
                  size={200}
                />
              )}
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This QR code links to: <br />
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {biker.qrCode}
                  </code>
                </p>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <p className="font-semibold mb-1">Important:</p>
                <p>Print this QR code on waterproof material and securely attach it to your helmet for emergency access.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}