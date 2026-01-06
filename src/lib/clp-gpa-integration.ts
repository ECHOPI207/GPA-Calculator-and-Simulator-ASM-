/**
 * CLP-GPA Integration Engine
 * 
 * Connects Cognitive Learning Profile with GPA Improvement Recommendations
 * to provide personalized, behavior-aware academic strategies
 */

import type { CLPProfile, CLPDomain } from './clp-engine';
import type { ImprovementAction } from './gpa-improvement-engine';
import type { StudyStrategy } from './clp-strategies';
import { StrategyMatcher } from './clp-strategies';

export interface IntegratedRecommendation {
  // GPA Component
  improvementAction: ImprovementAction;
  
  // CLP Component
  recommendedStrategy: StudyStrategy;
  matchReason: string;
  matchReasonAr: string;
  
  // Integration
  feasibilityAdjustment: 'easier' | 'same' | 'harder';
  behavioralBottlenecks: CLPDomain[];
  personalizedTipsAr: string[];
  personalizedTipsEn: string[];
  
  // Expected Outcomes
  gpaImpact: number;
  behavioralBenefit: string;
  behavioralBenefitAr: string;
  
  // Priority
  integratedPriority: number; // 0-100, combines GPA impact + behavioral fit
}

export interface IntegratedActionPlan {
  profile: CLPProfile;
  recommendations: IntegratedRecommendation[];
  summary: {
    totalRecommendations: number;
    highPriority: number;
    expectedGPAGain: number;
    keyBehavioralFocus: CLPDomain[];
  };
}

export class CLPGPAIntegration {
  /**
   * Create integrated recommendations combining GPA improvement with CLP insights
   */
  static createIntegratedPlan(
    improvementActions: ImprovementAction[],
    profile: CLPProfile
  ): IntegratedActionPlan {
    const recommendations: IntegratedRecommendation[] = [];

    for (const action of improvementActions) {
      const integrated = this.integrateAction(action, profile);
      if (integrated) {
        recommendations.push(integrated);
      }
    }

    // Sort by integrated priority
    recommendations.sort((a, b) => b.integratedPriority - a.integratedPriority);

    // Calculate summary
    const highPriority = recommendations.filter(r => r.integratedPriority >= 70).length;
    const expectedGPAGain = recommendations
      .slice(0, 5)
      .reduce((sum, r) => sum + r.gpaImpact, 0);

    const keyBehavioralFocus = this.identifyKeyBehavioralFocus(profile);

    return {
      profile,
      recommendations: recommendations.slice(0, 10), // Top 10
      summary: {
        totalRecommendations: recommendations.length,
        highPriority,
        expectedGPAGain,
        keyBehavioralFocus,
      },
    };
  }

  /**
   * Integrate single improvement action with CLP profile
   */
  private static integrateAction(
    action: ImprovementAction,
    profile: CLPProfile
  ): IntegratedRecommendation | null {
    // Get recommended strategies for this profile
    const strategies = StrategyMatcher.getRecommendedStrategies(profile);
    if (strategies.length === 0) return null;

    // Select best strategy for this specific action
    const strategy = this.selectBestStrategy(action, strategies, profile);

    // Analyze behavioral bottlenecks
    const bottlenecks = this.identifyBottlenecks(action, profile);

    // Adjust feasibility based on profile
    const feasibilityAdjustment = this.assessFeasibility(action, profile);

    // Generate personalized tips
    const personalizedTips = this.generatePersonalizedTips(action, profile, strategy);

    // Calculate integrated priority
    const integratedPriority = this.calculateIntegratedPriority(action, profile, bottlenecks);

    // Generate match explanation
    const matchReason = StrategyMatcher.explainMatch(strategy, profile, 'en');
    const matchReasonAr = StrategyMatcher.explainMatch(strategy, profile, 'ar');

    // Generate behavioral benefit
    const behavioralBenefit = this.describeBehavioralBenefit(strategy, profile, 'en');
    const behavioralBenefitAr = this.describeBehavioralBenefit(strategy, profile, 'ar');

    return {
      improvementAction: action,
      recommendedStrategy: strategy,
      matchReason,
      matchReasonAr,
      feasibilityAdjustment,
      behavioralBottlenecks: bottlenecks,
      personalizedTipsAr: personalizedTips.ar,
      personalizedTipsEn: personalizedTips.en,
      gpaImpact: action.gpaImprovement,
      behavioralBenefit,
      behavioralBenefitAr,
      integratedPriority,
    };
  }

  /**
   * Select best strategy for specific action and profile
   */
  private static selectBestStrategy(
    action: ImprovementAction,
    strategies: StudyStrategy[],
    profile: CLPProfile
  ): StudyStrategy {
    // For courses requiring significant grade improvement, prioritize active recall
    if (action.currentGrade === 'F' || action.currentGrade === 'D') {
      const activeRecallStrategy = strategies.find(s => s.id === 'active_recall' || s.id === 'practice_testing');
      if (activeRecallStrategy) return activeRecallStrategy;
    }

    // For high credit hour courses, prioritize time management strategies
    if (action.creditHours >= 4) {
      const timeStrategy = strategies.find(s => s.id === 'time_boxing' || s.id === 'spaced_repetition');
      if (timeStrategy) return timeStrategy;
    }

    // Default to first recommended strategy
    return strategies[0];
  }

  /**
   * Identify behavioral bottlenecks that might hinder improvement
   */
  private static identifyBottlenecks(
    action: ImprovementAction,
    profile: CLPProfile
  ): CLPDomain[] {
    const bottlenecks: CLPDomain[] = [];

    // Check each domain
    for (const domain of profile.domains) {
      if (domain.level === 'low') {
        // Low active recall is a bottleneck for all improvements
        if (domain.domain === 'active_recall') {
          bottlenecks.push(domain.domain);
        }

        // Low time management is a bottleneck for high-credit courses
        if (domain.domain === 'time_management' && action.creditHours >= 3) {
          bottlenecks.push(domain.domain);
        }

        // High procrastination is a bottleneck for all
        if (domain.domain === 'procrastination') {
          bottlenecks.push(domain.domain);
        }

        // Low focus is a bottleneck for complex improvements
        if (domain.domain === 'focus_sustainability' && action.feasibility === 'challenging') {
          bottlenecks.push(domain.domain);
        }
      }
    }

    return bottlenecks;
  }

  /**
   * Assess feasibility adjustment based on profile
   */
  private static assessFeasibility(
    action: ImprovementAction,
    profile: CLPProfile
  ): 'easier' | 'same' | 'harder' {
    const relevantDomains = profile.domains.filter(d =>
      d.domain === 'active_recall' ||
      d.domain === 'time_management' ||
      d.domain === 'focus_sustainability'
    );

    const avgScore = relevantDomains.reduce((sum, d) => sum + d.score, 0) / relevantDomains.length;

    if (avgScore >= 70) return 'easier';
    if (avgScore <= 40) return 'harder';
    return 'same';
  }

  /**
   * Generate personalized tips based on profile
   */
  private static generatePersonalizedTips(
    action: ImprovementAction,
    profile: CLPProfile,
    strategy: StudyStrategy
  ): { ar: string[]; en: string[] } {
    const tipsAr: string[] = [];
    const tipsEn: string[] = [];

    // Add strategy-specific tips
    tipsAr.push(...strategy.applicationAr.slice(0, 2));
    tipsEn.push(...strategy.applicationEn.slice(0, 2));

    // Add profile-specific adjustments
    const lowDomains = profile.domains.filter(d => d.level === 'low');

    for (const domain of lowDomains) {
      if (domain.domain === 'focus_sustainability') {
        tipsAr.push('ابدأ بجلسات قصيرة (15-20 دقيقة) وزد المدة تدريجياً');
        tipsEn.push('Start with short sessions (15-20 min) and gradually increase');
      }

      if (domain.domain === 'time_management') {
        tipsAr.push(`خصص ${action.creditHours * 2} ساعات أسبوعياً لهذه المادة`);
        tipsEn.push(`Allocate ${action.creditHours * 2} hours weekly for this course`);
      }

      if (domain.domain === 'procrastination') {
        tipsAr.push('ابدأ بأصغر مهمة ممكنة (قاعدة الدقيقتين)');
        tipsEn.push('Start with smallest possible task (2-minute rule)');
      }
    }

    return { ar: tipsAr.slice(0, 4), en: tipsEn.slice(0, 4) };
  }

  /**
   * Calculate integrated priority combining GPA impact and behavioral fit
   */
  private static calculateIntegratedPriority(
    action: ImprovementAction,
    profile: CLPProfile,
    bottlenecks: CLPDomain[]
  ): number {
    // Start with GPA impact score (0-100)
    let priority = action.impactScore;

    // Adjust based on behavioral fit
    const behavioralFitScore = this.calculateBehavioralFit(profile);
    priority = (priority * 0.7) + (behavioralFitScore * 0.3);

    // Penalize if there are many bottlenecks
    const bottleneckPenalty = bottlenecks.length * 5;
    priority = Math.max(0, priority - bottleneckPenalty);

    // Boost if feasibility is easier
    const feasibility = this.assessFeasibility(action, profile);
    if (feasibility === 'easier') priority += 10;
    if (feasibility === 'harder') priority -= 10;

    return Math.min(100, Math.max(0, priority));
  }

  /**
   * Calculate overall behavioral fit score
   */
  private static calculateBehavioralFit(profile: CLPProfile): number {
    // Average of all domain scores
    return profile.overallScore;
  }

  /**
   * Describe behavioral benefit of applying strategy
   */
  private static describeBehavioralBenefit(
    strategy: StudyStrategy,
    profile: CLPProfile,
    language: 'ar' | 'en'
  ): string {
    const weakDomains = profile.domains.filter(d => 
      strategy.matchedDomains.includes(d.domain) && d.level !== 'high'
    );

    if (weakDomains.length === 0) {
      return language === 'ar'
        ? 'سيعزز هذا مهاراتك الدراسية الحالية'
        : 'This will reinforce your current study skills';
    }

    const domainName = language === 'ar' ? weakDomains[0].nameAr : weakDomains[0].nameEn;

    return language === 'ar'
      ? `سيحسن هذا ${domainName} بشكل ملحوظ`
      : `This will notably improve your ${domainName}`;
  }

  /**
   * Identify key behavioral areas to focus on
   */
  private static identifyKeyBehavioralFocus(profile: CLPProfile): CLPDomain[] {
    return profile.domains
      .filter(d => d.level === 'low')
      .map(d => d.domain)
      .slice(0, 3);
  }

  /**
   * Generate executive summary for student
   */
  static generateExecutiveSummary(plan: IntegratedActionPlan, language: 'ar' | 'en'): string {
    const { profile, recommendations, summary } = plan;

    if (language === 'ar') {
      const weakDomains = profile.domains
        .filter(d => d.level === 'low')
        .map(d => d.nameAr)
        .join('، ');

      return `لديك ${summary.totalRecommendations} فرصة لتحسين معدلك. من خلال التركيز على أفضل ${summary.highPriority} إجراءات، يمكنك رفع معدلك بمقدار +${summary.expectedGPAGain.toFixed(2)} نقطة. ${weakDomains ? `ملفك يظهر حاجة للتحسين في: ${weakDomains}. ` : ''}التوصيات أدناه مخصصة لسلوكك الدراسي الحالي.`;
    } else {
      const weakDomains = profile.domains
        .filter(d => d.level === 'low')
        .map(d => d.nameEn)
        .join(', ');

      return `You have ${summary.totalRecommendations} opportunities to improve your GPA. By focusing on the top ${summary.highPriority} actions, you can raise your GPA by +${summary.expectedGPAGain.toFixed(2)} points. ${weakDomains ? `Your profile shows need for improvement in: ${weakDomains}. ` : ''}The recommendations below are personalized to your current study behaviors.`;
    }
  }
}
