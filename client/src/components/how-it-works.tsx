import { UserPlus, QrCode, Phone } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Register Your Info",
      description: "Fill out your medical profile with blood type, allergies, medications, emergency contacts, and upload your photo.",
      icon: UserPlus,
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
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
                {step.number === 1 ? (
                  <div className="w-full h-48 bg-gradient-to-br from-red-50 to-gray-100 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center">
                    <svg className="w-24 h-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                ) : (
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                )}
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
