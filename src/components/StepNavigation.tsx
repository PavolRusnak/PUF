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
      <div className="px-4 py-4 pt-6">
        <div className="grid grid-cols-5 items-center justify-items-center">
          {/* Step 1 - Column 1 */}
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              onStepClick ? 'hover:opacity-80' : ''
            }`}
            onClick={() => onStepClick?.(steps[0].id)}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${steps[0].completed 
                ? 'bg-hc-orange text-white' 
                : steps[0].current 
                ? 'bg-hc-dark-blue text-white border-2 border-hc-orange' 
                : 'bg-hc-beige text-hc-grey'
              }
            `}>
              {steps[0].completed ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                1
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-xs font-medium whitespace-nowrap ${
                steps[0].current ? 'text-hc-dark-blue' : 
                steps[0].completed ? 'text-hc-orange' : 'text-hc-grey'
              }`}>
                {steps[0].title}
              </div>
            </div>
          </div>

          {/* Line 1-2 - Column 2 */}
          <div className={`h-0.5 w-full ${
            steps[0].completed ? 'bg-hc-orange' : 'bg-hc-beige'
          }`} />

          {/* Step 2 - Column 3 */}
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              onStepClick ? 'hover:opacity-80' : ''
            }`}
            onClick={() => onStepClick?.(steps[1].id)}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${steps[1].completed 
                ? 'bg-hc-orange text-white' 
                : steps[1].current 
                ? 'bg-hc-dark-blue text-white border-2 border-hc-orange' 
                : 'bg-hc-beige text-hc-grey'
              }
            `}>
              {steps[1].completed ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                2
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-xs font-medium whitespace-nowrap ${
                steps[1].current ? 'text-hc-dark-blue' : 
                steps[1].completed ? 'text-hc-orange' : 'text-hc-grey'
              }`}>
                {steps[1].title}
              </div>
            </div>
          </div>

          {/* Line 2-3 - Column 4 */}
          <div className={`h-0.5 w-full ${
            steps[1].completed ? 'bg-hc-orange' : 'bg-hc-beige'
          }`} />

          {/* Step 3 - Column 5 */}
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              onStepClick ? 'hover:opacity-80' : ''
            }`}
            onClick={() => onStepClick?.(steps[2].id)}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${steps[2].completed 
                ? 'bg-hc-orange text-white' 
                : steps[2].current 
                ? 'bg-hc-dark-blue text-white border-2 border-hc-orange' 
                : 'bg-hc-beige text-hc-grey'
              }
            `}>
              {steps[2].completed ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                3
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-xs font-medium whitespace-nowrap ${
                steps[2].current ? 'text-hc-dark-blue' : 
                steps[2].completed ? 'text-hc-orange' : 'text-hc-grey'
              }`}>
                {steps[2].title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 