import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertTestimonialSchema, type InsertTestimonial, type Testimonial } from "@shared/schema";
import { Star, MessageSquare, Users } from "lucide-react";

type TestimonialFormData = InsertTestimonial;

export default function Testimonials() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      content: "",
      rating: "5",
      profilePictureUrl: "",
    },
  });

  const submitTestimonial = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      const response = await apiRequest('POST', '/api/testimonials', data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Thank You!",
        description: "Your testimonial has been submitted and will help other bikers understand the importance of BikerAid.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TestimonialFormData) => {
    submitTestimonial.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-black flex items-center justify-center gap-2">
                <MessageSquare className="text-red-500" />
                Thank You for Sharing!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl text-gray-600">
                Your testimonial has been submitted successfully. Your story will help other bikers understand the life-saving potential of BikerAid.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ul className="text-green-700 text-sm text-left space-y-1">
                  <li>• Your testimonial will be reviewed for authenticity</li>
                  <li>• It will appear on our website to inspire other bikers</li>
                  <li>• Your story helps build trust in emergency response systems</li>
                  <li>• Together, we're making motorcycle riding safer</li>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Share Your BikerAid Story</h1>
          <p className="text-xl text-gray-600">Help other bikers understand the life-saving potential of emergency preparedness</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Testimonial Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black flex items-center">
                  <MessageSquare className="text-red-500 mr-3" />
                  Submit Your Testimonial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">Your Role/Location *</Label>
                    <Input
                      id="role"
                      {...form.register("role")}
                      placeholder="e.g., Biker from Los Angeles, EMT, Doctor, etc."
                      className="mt-1"
                    />
                    {form.formState.errors.role && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.role.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating *</Label>
                    <Select onValueChange={(value) => form.setValue("rating", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ (5 stars)</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ (4 stars)</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ (3 stars)</SelectItem>
                        <SelectItem value="2">⭐⭐ (2 stars)</SelectItem>
                        <SelectItem value="1">⭐ (1 star)</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.rating && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.rating.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="content">Your Story *</Label>
                    <Textarea
                      id="content"
                      {...form.register("content")}
                      placeholder="Share your experience with BikerAid - how it helped you or could help others in emergency situations..."
                      rows={6}
                      className="mt-1"
                    />
                    {form.formState.errors.content && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.content.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="profilePictureUrl">Profile Picture URL (Optional)</Label>
                    <Input
                      id="profilePictureUrl"
                      {...form.register("profilePictureUrl")}
                      placeholder="https://example.com/your-photo.jpg"
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitTestimonial.isPending}
                    className="w-full bg-red-500 text-white py-4 px-8 text-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    {submitTestimonial.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Star className="mr-3 h-5 w-5" />
                        Submit My Testimonial
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Existing Testimonials */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black flex items-center">
                  <Users className="text-red-500 mr-3" />
                  Community Stories ({testimonials.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-3 bg-gray-200 rounded w-32" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded" />
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : testimonials.length > 0 ? (
                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center mb-3">
                          <img 
                            src={testimonial.profilePictureUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-black">{testimonial.name}</h4>
                            <p className="text-gray-600 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 italic">"{testimonial.content}"</p>
                        <div className="flex text-yellow-500">
                          {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">No Stories Yet</h3>
                    <p className="text-gray-600 text-sm">
                      Be the first to share your BikerAid experience and inspire others to prioritize emergency preparedness.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}