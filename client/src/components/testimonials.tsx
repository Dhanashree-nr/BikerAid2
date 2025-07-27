import { useQuery } from "@tanstack/react-query";
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Testimonial } from "@shared/schema";

export function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const { data: stats } = useQuery<{
    registeredBikers: number;
    emergencyScans: number;
    livesSaved: number;
    avgResponseTime: string;
  }>({
    queryKey: ['/api/stats'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Lives Saved Through BikerAid</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from bikers and first responders who experienced the life-saving power of instant medical information access
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                      <div className="h-3 bg-gray-200 rounded w-32" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Lives Saved Through BikerAid</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from bikers and first responders who experienced the life-saving power of instant medical information access
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.profilePictureUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-black">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex text-yellow-500">
                    {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Be the First to Share Your Story</h3>
              <p className="text-gray-600 mb-6">
                As BikerAid grows, we'll feature real testimonials from bikers and first responders who have experienced the life-saving power of instant medical information access.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Register now and help us build a safer community for all bikers.
              </p>
              <Link href="/testimonials">
                <Button className="bg-red-500 text-white hover:bg-red-600 transition-colors">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Share Your Story
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {stats && (
          <div className="mt-16 bg-red-500 text-white rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">{stats.registeredBikers.toLocaleString()}</div>
                <p className="text-red-100">Registered Bikers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{stats.emergencyScans}</div>
                <p className="text-red-100">Emergency Scans</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{stats.livesSaved}</div>
                <p className="text-red-100">Lives Saved</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{stats.avgResponseTime}</div>
                <p className="text-red-100">Avg. Response Time</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
