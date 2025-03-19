
import { cn } from '@/lib/utils';
import ComparisonSlider from './ComparisonSlider';

interface FeatureSectionProps {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  reversed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FeatureSection = ({
  title,
  description,
  beforeImage,
  afterImage,
  reversed = false,
  className,
  children
}: FeatureSectionProps) => {
  return (
    <section className={cn(
      'py-20 w-full',
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={cn(
          'grid md:grid-cols-2 gap-12 md:gap-16 items-center',
          reversed && 'md:grid-flow-dense'
        )}>
          <div className={cn(
            'space-y-6',
            reversed ? 'md:col-start-2' : ''
          )}>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-lg">{description}</p>
            {children}
          </div>
          
          <div className={cn(
            'aspect-[4/3] w-full max-w-lg mx-auto',
            reversed ? 'md:col-start-1' : ''
          )}>
            <ComparisonSlider 
              beforeImage={beforeImage}
              afterImage={afterImage}
              className="w-full h-full rounded-xl overflow-hidden shadow-elevated"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
