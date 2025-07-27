import { UserPlus, QrCode, Phone } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Register Your Info",
      description: "Fill out your medical profile with blood type, allergies, medications, emergency contacts, and upload your photo.",
      icon: UserPlus,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      number: 2,
      title: "Get Your QR Code",
      description: "Instantly receive a unique QR code linked to your profile. Print it on waterproof material and attach it to your helmet.",
      icon: QrCode,
      image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      number: 3,
      title: "Emergency Access",
      description: "In case of an accident, first responders scan your QR code to instantly access your critical medical information.",
      icon: Phone,
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">How BikerAid Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to create your emergency safety profile and get your life-saving QR code
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center group">
              <div className="relative mb-8">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
