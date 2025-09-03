import React from 'react';
import { CheckCircle, ArrowRight, Loader2, Crown, Zap, Heart, Star } from 'lucide-react';
import { MembershipPlansProps } from '../../types/membership';
import { useUIStore } from '../../stores/uiStore';
import ErrorBoundary from '../ErrorBoundary';

// Skeleton loader for plans
const PlanSkeleton = () => (
  <div className="bg-gray-800 border border-gray-700 p-8 flex flex-col animate-pulse">
    <div className="text-center mb-8">
      <div className="h-16 w-16 bg-gray-700 border border-gray-600 rounded-xl mx-auto mb-6"></div>
      <div className="h-8 bg-gray-700 rounded mb-4"></div>
      <div className="h-12 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-700 rounded mb-4"></div>
    </div>
    <div className="space-y-3 mb-8 flex-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-4 h-4 bg-gray-700 rounded-full flex-shrink-0 mt-0.5"></div>
          <div className="h-4 bg-gray-700 rounded flex-1"></div>
        </div>
      ))}
    </div>
    <div className="h-14 bg-gray-700 rounded-lg"></div>
  </div>
);

// Error fallback for plans
const PlansErrorFallback = () => (
  <div className="bg-black border border-gray-700 rounded-lg p-8 text-center">
    <div className="text-red-400 mb-4">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">Unable to Load Plans</h3>
    <p className="text-gray-400 text-sm mb-4">We're having trouble loading the membership plans. Please try refreshing the page.</p>
    <button
      onClick={() => window.location.reload()}
      className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

const MembershipPlans: React.FC<MembershipPlansProps> = ({
  plans,
  currentPlan,
  selectedPlan,
  onSelectPlan,
  onUpgrade,
  isLoading = false
}) => {
  const { setLoading } = useUIStore();

  // Icon mapping for different plan types
  const getPlanIcon = (planName: string) => {
    switch (planName.toUpperCase()) {
      case 'BRONZE':
        return Crown;
      case 'SILVER':
        return Zap;
      case 'GOLD':
        return Star;
      case 'DIAMOND':
        return Heart;
      default:
        return Crown;
    }
  };

  // Handle plan selection with loading state
  const handlePlanSelect = async (plan: any) => {
    try {
      setLoading(true, 'Processing selection...');
      onSelectPlan(plan);
    } catch (error) {
      console.error('Failed to select plan:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle plan upgrade
  const handlePlanUpgrade = async (plan: any) => {
    try {
      setLoading(true, 'Processing upgrade...');
      onUpgrade(plan);
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <PlanSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<PlansErrorFallback />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => {
          const Icon = getPlanIcon(plan.name);
          const isPopular = plan.name === 'GOLD'; // Mark Gold as popular
          const isCurrentPlan = currentPlan?.id === plan.id;
          const isSelected = selectedPlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              className={`group relative bg-black border border-gray-700 shadow-none p-8 flex flex-col ${
                isPopular
                  ? 'border-gray-600'
                  : 'border-gray-700'
              } ${isSelected ? 'ring-2 ring-gray-500' : ''}`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-white text-black border border-gray-700 px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Current plan indicator */}
              {isCurrentPlan && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-white text-black border border-gray-700 px-2 py-1 text-xs font-semibold rounded-full">
                    CURRENT
                  </span>
                </div>
              )}

              {/* Plan content */}
              <div className="text-center mb-8">
                <div className="h-16 w-16 bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-6 rounded-xl">
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>

                <h3 className="text-2xl font-black mb-4 heading-font text-white">
                  {plan.name}
                </h3>

                <div className="text-3xl font-black text-white mb-3">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-gray-400">$</span>
                    <span>{plan.price}</span>
                    <span className="text-sm text-gray-400">/{plan.interval === 'annual' ? 'year' : 'month'}</span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {plan.name === 'BRONZE' && 'Entry level membership'}
                    {plan.name === 'SILVER' && 'Enhanced membership'}
                    {plan.name === 'GOLD' && 'Advanced membership'}
                    {plan.name === 'DIAMOND' && 'Elite membership'}
                  </p>
                </div>

                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {plan.description || 'Access premium features and content'}
                </p>

                {/* Key Benefits - Concise */}
                <div className="text-center mb-6">
                  <div className="text-green-400 font-semibold text-sm mb-2">
                    ✓ {plan.name === 'BRONZE' ? '1' : plan.name === 'SILVER' ? '2' : plan.name === 'GOLD' ? '5' : '7'} Commission Levels
                  </div>
                  <div className="text-blue-400 font-semibold text-sm">✓ Premium Training Access</div>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-3 mb-8 flex-1">
                {plan.features.slice(0, 5).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="flex-1 leading-relaxed">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 5 && (
                  <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-600/50">
                    +{plan.features.length - 5} more premium benefits
                  </div>
                )}
              </div>

              {/* Action button */}
              <div className="mt-auto">
                <button
                  className={`w-full px-8 py-5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg touch-manipulation ${
                    isPopular
                      ? 'bg-white text-black hover:bg-gray-200 active:bg-gray-300'
                      : 'bg-white text-black hover:bg-gray-200 active:bg-gray-300'
                  } ${isSelected ? 'ring-2 ring-gray-500' : ''}`}
                  onClick={() => isCurrentPlan ? handlePlanUpgrade(plan) : handlePlanSelect(plan)}
                  aria-label={`${isCurrentPlan ? 'Upgrade to' : 'Select'} ${plan.name} membership plan`}
                  role="button"
                >
                  {isCurrentPlan ? 'UPGRADE PLAN' : `JOIN ${plan.name}`}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};

export default MembershipPlans;
