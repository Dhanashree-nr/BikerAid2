import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl font-bold text-black mb-6">About BikerAid</h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              BikerAid was born from a simple yet powerful realization: in emergency situations, every second counts, and having immediate access to critical medical information can be the difference between life and death.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to reduce preventable deaths in motorcycle accidents by ensuring first responders have instant access to vital medical information through innovative QR code technology. We believe that every biker deserves the best possible chance at survival during emergencies.
            </p>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Dhanashree - Founder & Creator" 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-black text-lg">Dhanashree</h4>
                    <p className="text-gray-600 mb-2">Founder & Creator</p>
                    <p className="text-gray-700 text-sm mb-3">
                      AI-DS Engineer + Artist passionate about using technology to save lives and make the world safer for motorcycle enthusiasts.
                    </p>
                    <div className="flex space-x-3">
                      <a 
                        href="https://www.instagram.com/_dhanashree_nr?igsh=MWl0djFzeHBrOXJsbg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/nrdhanashree/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a 
                        href="mailto:dhanashreeredekar2003@gmail.com"
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Vision */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="text-red-500 text-2xl mr-4" />
                  <h3 className="text-2xl font-bold text-black">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To create a world where no biker's life is lost due to lack of immediate medical information during emergencies.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="text-red-500 text-2xl mr-4" />
                  <h3 className="text-2xl font-bold text-black">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide an accessible, reliable, and efficient emergency response system that connects bikers with life-saving medical information instantly.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Heart className="text-red-500 text-2xl mr-4" />
                  <h3 className="text-2xl font-bold text-black">Our Values</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Life First:</strong> Every decision prioritizes saving lives</p>
                  <p><strong>Accessibility:</strong> Free and easy to use for everyone</p>
                  <p><strong>Privacy:</strong> Secure handling of medical information</p>
                  <p><strong>Innovation:</strong> Leveraging technology for social good</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
