import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UserPlus, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-black to-gray-900 text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center lg:text-left max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            One Scan Can <span className="text-red-500">Save a Life</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            BikerAid helps first responders access critical medical information instantly through QR codes on helmets. Be prepared. Stay safe. Save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/register">
              <Button size="lg" className="bg-red-500 text-white px-8 py-4 text-lg font-semibold hover:bg-red-600 transition-colors">
                <UserPlus className="mr-2 h-5 w-5" />
                Register Now - It's Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex items-center text-red-500">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
        <span className="text-sm font-medium">Emergency Ready</span>
      </div>
    </section>
  );
}
