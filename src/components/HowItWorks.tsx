
import { Check } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Upload Your Photo',
    description: 'Upload a clear photo of yourself to serve as the base for your virtual try-on experience.',
  },
  {
    number: '2',
    title: 'Choose a Garment',
    description: 'Select the clothing item you want to try on virtually from our catalog or upload your own.',
  },
  {
    number: '3',
    title: 'AI Processing',
    description: 'Our advanced AI algorithm processes both images and generates a realistic composite.',
  },
  {
    number: '4',
    title: 'View & Download',
    description: 'See yourself in the new outfit and download the result to share with friends or save for later.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How to Try on Clothes Virtually</h2>
          <p className="text-muted-foreground text-lg">
            Our virtual try-on process is simple, fast, and delivers impressively realistic results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-subtle relative overflow-hidden group hover:shadow-elevated transition-shadow"
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full group-hover:scale-[1.8] transition-transform duration-500 ease-spring" />
              
              <div className="flex items-center mb-4 relative">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium text-lg">
                  {step.number}
                </div>
                <div className="ml-3 font-semibold text-lg">{step.title}</div>
              </div>
              
              <p className="text-muted-foreground">{step.description}</p>
              
              <div className="mt-4 flex items-center text-primary">
                <Check size={16} className="mr-1" />
                <span className="text-sm font-medium">Easy to use</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-primary/5 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to transform your shopping experience?</h3>
            <p className="text-muted-foreground">Try on clothes virtually and make confident purchase decisions.</p>
          </div>
          <a 
            href="/try-on" 
            className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Try It Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
