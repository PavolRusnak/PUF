interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface StepNavigationProps {
  steps: Step[];
  onStepClick?: (stepId: string) => void;
}

export default function StepNavigation({ steps, onStepClick }: StepNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex flex-col items-center cursor-pointer ${
                  onStepClick ? 'hover:opacity-80' : ''
                }`}
                onClick={() => onStepClick?.(step.id)}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step.completed 
                    ? 'bg-hc-orange text-white' 
                    : step.current 
                    ? 'bg-hc-dark-blue text-white border-2 border-hc-orange' 
                    : 'bg-hc-beige text-hc-grey'
                  }
                `}>
                  {step.completed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-medium ${
                    step.current ? 'text-hc-dark-blue' : 
                    step.completed ? 'text-hc-orange' : 'text-hc-grey'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  step.completed ? 'bg-hc-orange' : 'bg-hc-beige'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 