# Academic GPA Intelligence Platform Requirements Document

## 1. Application Overview

### 1.1 Application Name
**English:** echo-π Academic Intelligence Platform  
**Arabic:** منصة echo-π الذكية للمعدل الأكاديمي\n
### 1.2 Application Description
A professional, university-grade academic decision-support system designed to calculate, analyze, and predict GPA with complete accuracy based on official university grading rules. The platform now includes a scientifically sound Cognitive Learning Profile (CLP) module that analyzes study-related behaviors and integrates them with GPA improvement strategies. This is a fully client-side application that operates entirely in the browser without requiring backend infrastructure, database, or user authentication.

### 1.3 Core Positioning
- Academic accuracy is mandatory
- University rules are the single source of truth
- Simple UX for students with deep intelligence under the hood
- Fully client-side architecture
- Portfolio-quality engineering
- Evidence-based learning science integration

---

## 2. Core Features

### 2.1 GPA Calculation Engine
- Add, edit, and remove courses
- Multi-semester support
- Calculate semester GPA
- Calculate cumulative GPA
- Track total registered hours
- Track total passed hours
- Handle failed courses (grade F)
- Handle retaken courses\n- Apply exact grading rules from university system

### 2.2 Course Editing Behavior
- When editing a course, display course data in the same view or modal
- Do not open a new tab when editing
- Pre-fill all course fields with existing data
- Allow inline editing without navigation disruption
\n### 2.3 University Grading System Support
- Select university from list
- Load grading rules dynamically based on university selection
- Support grading table as shown in uploaded images:\n  - Grade A: 4.00 points (90-100%)
  - Grade A-: 3.70 points (85-89%)
  - Grade B+: 3.30 points (80-84%)
  - Grade B: 3.00 points (75-79%)
  - Grade B-: 2.70 points (70-74%)
  - Grade C+: 2.30 points (65-69%)
  - Grade C: 2.00 points (62-64%)
  - Grade D: 1.70 points (60-61%)
  - Grade F: 0.00 points (below 60%)
- Support cumulative GPA grading:\n  - Excellent: GPA ≥ 3.50
  - Very Good: 2.75 ≤ GPA < 3.50
  - Good: 2.30 ≤ GPA < 2.75
  - Pass: GPA > 2.000
\n### 2.4 GPA Scenario Simulator (What-If Analysis)
- Simulate future grades for upcoming courses
- Save multiple scenarios in browser local storage
- Show instant GPA impact for each scenario
- Compare scenarios side-by-side
\n### 2.5 GPA Explanation Engine
- Explain why current GPA is what it is
- Highlight courses that helped improve GPA
- Highlight courses that harmed GPA
- Use plain academic language in both Arabic and English
\n### 2.6 Smart Error Detection
- Detect duplicate courses
- Detect invalid grades\n- Detect inconsistent credit hours
- Detect courses outside academic plan
- Display clear warnings in Arabic and English

### 2.7 Academic Timeline\n- Display GPA per semester
- Show performance trend over time
- Visual indicators for improvement or decline
\n### 2.8 AI Academic Recommendations
- Suggest grade improvements for specific courses
- Predict GPA impact of grade changes
- Help students plan to reach target GPA
- Integrate with CLP for personalized study strategies

### 2.9 Final GPA Prediction
- Predict graduation GPA based on remaining courses
- Show best-case scenario\n- Show worst-case scenario
- Show realistic scenario

### 2.10 OCR Result Import (Advanced)
- Upload academic result image
- Auto-extract courses, grades, and credit hours
- Allow manual correction of extracted data
\n### 2.11 GPA Comparison\n- Compare current GPA against graduation requirements
- Compare against academic warning thresholds
- Compare against honor roll thresholds
\n---

## 3. Academic Intelligence Features

### 3.1 Academic Decision Engine
- Analyze whether to drop or continue a course
- Analyze whether to retake a failed course
- Compare heavy vs light course load options
- Provide numeric impact and justification for each decision

### 3.2 Academic Risk Score
- Calculate risk of academic warning or probation
- Display color-coded risk level
- Provide clear explanation and advice
\n### 3.3 GPA Stability Indicator
- Indicate if GPA is stable, volatile, or high risk
- Provide interpretation and advice
\n### 3.4 Credit-Weighted Visualization
- Show which courses have the most impact on GPA
- Visualize GPA dominance per course
\n### 3.5 Performance Heatmap
- Visualize performance across semesters and courses
- Use color coding for easy interpretation

### 3.6 Student Profile Modes
- Freshman mode\n- Struggling student mode
- High-performing student mode
- Graduation-track mode

### 3.7 Policy Change Simulator
- Simulate GPA under new university rules
- Compare old vs new results
\n---

## 4. Intelligent GPA Improvement Module

### 4.1 Module Objective
Provide clear, actionable, and prioritized steps that students can take to improve their GPA using numeric analysis and data-driven recommendations, now enhanced with behavioral learning strategies from CLP.

### 4.2 Input Data Analysis
- Student current GPA
- All completed courses
- Credit hours per course
- Grades per course
- Failed courses
- Remaining courses (if available)
- Cognitive Learning Profile (CLP) scores\n
### 4.3 Analysis Logic
\n#### 4.3.1 High-Impact Course Identification
- Identify courses with high credit hours and low grades
- Calculate potential GPA improvement for each course
\n#### 4.3.2 Grade Improvement Simulation
- Simulate grade improvement scenarios (current grade → next higher grade)
- Calculate GPA delta for each scenario
- Rank scenarios by GPA impact

#### 4.3.3 Retake Scenario Evaluation
- Identify failed courses
- Identify courses with very low grades
- Calculate GPA impact of retaking and improving grades

#### 4.3.4 Action Prioritization
- Rank all improvement actions by:\n  - GPA impact (numeric delta)
  - Feasibility (grade jump difficulty)
  - Behavioral compatibility (based on CLP)\n
### 4.4 Output Structure
\n#### 4.4.1 Quick Wins
- Small effort, high GPA impact
- Display:\n  - Course name
  - Credit hours
  - Current grade
  - Suggested grade
  - GPA before\n  - GPA after
  - Exact numeric improvement
  - Recommended study strategy (based on CLP)
  - Why this strategy matches student's learning behavior

#### 4.4.2 Medium-Term Improvements
- Moderate effort, good impact
- Display same data structure as Quick Wins
\n#### 4.4.3 Long-Term Strategy
- Graduation planning
- Display same data structure as Quick Wins

### 4.5 Visual Presentation
- Display recommendations in cards or tables
- Use color-coded impact indicators:\n  - High impact: Green
  - Medium impact: Yellow
  - Low impact: Gray
- Use icons for priority levels
- Show numeric GPA improvement prominently
- Display matched learning strategy with clear explanation

### 4.6 Language & Tone
- Support Arabic and English
- Use academic, respectful tone
- Avoid vague advice
- Avoid emotional language
- Focus on numbers and clarity

### 4.7 Important Rules
- Do NOT give motivational or generic tips
- Do NOT suggest unrealistic grade jumps
- Do NOT overwhelm the student\n- Clarity and trust are mandatory
- All recommendations must be backed by numeric analysis
- All study strategies must be evidence-based

---\n
## 5. Cognitive Learning Profile (CLP) Module

### 5.1 Module Identity
**Module Name:** Cognitive Learning Profile (CLP)
\n**Description:** A behavioral, non-diagnostic academic profiling module that analyzes study-related behaviors and links them directly to GPA improvement strategies.
\n**Important:** This is NOT a personality test. This is NOT psychological diagnosis. This is an academic, behavior-based learning intelligence module.

### 5.2 Scientific & Ethical Constraints
- Do NOT classify students into personality types
- Do NOT use learning styles (visual/auditory/kinesthetic)
- Do NOT make deterministic predictions
- All outputs must be advisory, adjustable, and non-judgmental
- Include clear academic disclaimers

### 5.3 CLP Assessment Engine
\n#### 5.3.1 Assessment Design
- 10–15 scenario-based questions
- Academic contexts only
- Measures behaviors, not traits
- Short and non-intimidating
\n#### 5.3.2 Measured Domains
1. **Focus Sustainability**
   - Ability to maintain concentration during study sessions
   - Scored: Low / Medium / High
\n2. **Time Management & Planning**
   - Study scheduling and deadline management behaviors
   - Scored: Low / Medium / High

3. **Active Recall Usage**
   - Frequency of retrieval practice and self-testing
   - Scored: Low / Medium / High

4. **Procrastination Tendency**
   - Task initiation and completion patterns
   - Scored: Low / Medium / High

5. **Cognitive Load Tolerance**
   - Ability to handle complex or multiple study tasks
   - Scored: Low / Medium / High
\n6. **Exam Stress Response**
   - Behavioral patterns under exam pressure
   - Scored: Low / Medium / High

#### 5.3.3 Scoring System
- Each domain scored independently
- Output is a profile, not a label
- All behaviors described as improvable
- No overall score or classification

### 5.4 CLP Output & Interpretation

#### 5.4.1 Profile Display
- Domain scores displayed as bars or visual indicators
- Plain-language explanations for each domain
- Clear statement: \"This is NOT a diagnosis\"

#### 5.4.2 Interpretation Guidelines
- Explain what each score means in academic context
- Provide examples of behaviors associated with each level
- Emphasize that all behaviors are adjustable
\n### 5.5 CLP Integration with GPA Improvement

#### 5.5.1 Integration Requirements
- Analyze GPA + CLP together
- Identify:\n  - Academic weaknesses affecting GPA
  - Behavioral bottlenecks limiting performance
\n#### 5.5.2 Integrated Recommendations
For each GPA improvement recommendation, explain BOTH:
- **Academic impact:** Numeric GPA change
- **Learning behavior adjustment:** Study strategy matched to CLP
\n**Example:**
\"Improving Course X can raise your GPA by +0.28. Given your profile (low active recall), this improvement is most achievable using practice testing instead of rereading.\"

### 5.6 Evidence-Based Study Strategy Engine

#### 5.6.1 Allowed Strategies
- **Active Recall:** Retrieving information from memory
- **Practice Testing:** Self-testing and quizzing
- **Spaced Repetition:** Distributing study sessions over time
- **Retrieval Practice:** Actively recalling learned material
- **Interleaving:** Mixing different topics or subjects
- **Time-boxed Study Sessions:** Fixed-duration focused study periods

#### 5.6.2 Strategy Recommendation Format
For each recommendation:
- Strategy name
- Why it matches the student's CLP\n- Simple real-world application
- Expected academic benefit
\n#### 5.6.3 Prohibited Content
- Motivation talk
- Productivity hacks
- Learning styles
- Personality-based advice
\n### 5.7 Student UI Flow

#### 5.7.1 Entry Point: GPA Dashboard
- Display current GPA
- Show GPA improvement opportunities
- Add button: \"Understand How You Learn\"

#### 5.7.2 CLP Introduction Page
- Short explanation of CLP
- Clear disclaimer\n- Optional assessment start
- Skip option available

#### 5.7.3 CLP Assessment Interface
- Simple, non-intimidating UI
- Progress indicator
- One question per screen
- Clear navigation

#### 5.7.4 CLP Results Page
- Domain bars with scores
- Clear explanations for each domain
- Academic tone
- Disclaimer visible
- Button: \"See My Action Plan\"

#### 5.7.5 Integrated GPA Action Plan
- GPA improvement steps
- Behavioral strategy per step
- Prioritized actions
- Clear explanation of why each strategy matches the student's profile

#### 5.7.6 Continuous Feedback
- \"If you apply this strategy, expected GPA impact is X\"
- Allow students to mark strategies as tried\n- Adjust recommendations based on feedback

### 5.8 Academic Transparency & Disclaimers

#### 5.8.1 CLP Intro Disclaimer
**Arabic:**
هذا التقييم يساعدك على فهم سلوكك الدراسي وليس اختبار شخصية أو تشخيصًا نفسيًا.\n
**English:**
This assessment helps understand your study behaviors. It is not a personality test or psychological diagnosis.

#### 5.8.2 CLP Result Disclaimer
**Arabic:**\nهذه النتائج قابلة للتحسين ولا تعكس قدراتك أو ذكاءك.\n
**English:**
These results are adjustable and do not reflect intelligence or ability.

#### 5.8.3 General Disclaimer
**Arabic:**\nهذه التوصيات إرشادية ولا تُعد بديلاً عن السجلات الأكاديمية الرسمية.

**English:**
These recommendations are advisory and not a replacement for official academic records.

### 5.9 Scientific References

All learning strategies are based on peer-reviewed research:\n\n1. **Dunlosky et al., 2013** – Improving Students' Learning With Effective Learning Techniques
2. **Roediger & Karpicke, 2006** – Test-Enhanced Learning\n3. **Cepeda et al., 2006** – Distributed Practice\n4. **Kornell & Bjork, 2008** – Interleaving Practice
5. **Bjork & Bjork, 2011** – Desirable Difficulties
\n**Note:** References are mentioned in documentation and summarized in simple language. Raw academic papers are not shown to students.

---

## 6. Dashboard Professional Data Analysis

### 6.1 Dashboard Overview
- Comprehensive academic performance dashboard
- Display key metrics and insights at a glance
- Integrate CLP insights\n\n### 6.2 Key Metrics Display
- Current cumulative GPA
- Current semester GPA
- Total registered hours
- Total passed hours\n- Academic standing (Excellent, Very Good, Good, Pass)
- GPA trend indicator (improving, stable, declining)
- CLP completion status
\n### 6.3 Visual Analytics
- GPA trend chart (line chart showing GPA per semester)
- Grade distribution chart (pie or bar chart showing grade distribution)
- Credit hours breakdown (completed vs remaining)
- Performance heatmap (semester vs grade performance)
- CLP domain visualization (if completed)

### 6.4 Insights & Alerts
- Academic risk alerts (if GPA is below threshold)
- Improvement opportunities (courses with high impact potential)
- Milestone achievements (honor roll, dean's list, etc.)
- Behavioral insights (if CLP completed)

### 6.5 Comparison Analytics
- Compare current GPA against graduation requirements
- Compare against academic warning thresholds
- Compare against honor roll thresholds
\n---

## 7. Language & Direction Support

### 7.1 Bilingual Support
- Full support for Arabic (RTL)\n- Full support for English (LTR)
\n### 7.2 Automatic Direction Handling
- Arabic content displays with dir=rtl
- English content displays with dir=ltr
- Direction affects layout, navigation, forms, tables, charts, icons, modals, and pagination

### 7.3 Logical CSS\n- Use margin-inline-*, padding-inline-*\n- Use text-align: start / end\n- Avoid duplicating layouts for RTL/LTR
\n### 7.4 Language Preference Persistence
- Save user language preference in browser local storage
- Apply preference across all sessions
\n---

## 8. UI/UX Design Requirements

### 8.1 Design Principles
- Academic, clean, modern design
- Professional color palette
- Clear hierarchy and spacing
- Fully responsive (mobile and desktop)
- Accessible contrast and focus states
- Simple interface for non-technical users

### 8.2 Branding\n- Logo text: echo-π تطوير\n- Logo must have academic and tech feeling
- Logo must be balanced in RTL and LTR
- Logo must be responsive and not break layout

### 8.3 Application Naming
- Apply bilingual name consistently in header, title, and meta tags
\n---

## 9. Data Storage & Privacy

### 9.1 Client-Side Storage
- All data stored in browser local storage
- No backend or database required
- No user authentication or login system
- Data persists across sessions on the same device
- CLP results stored locally

### 9.2 Privacy Messaging
- Display clear privacy policy
- Inform users that all data is stored locally on their device
- Explain that no data is sent to any server
\n### 9.3 Academic Disclaimers
- Display context-aware disclaimers
- Clarify that platform is not a replacement for official records
- Clarify that CLP is not a psychological diagnosis

---

## 10. Export & Reporting

### 10.1 PDF Export
- Generate professional PDF report client-side
- Format similar to official result documents
- Include GPA, explanation, date, and disclaimer
- Optionally include CLP summary

---

## 11. Architecture Requirements

### 11.1 Client-Side Architecture
- Fully client-side application
- No backend infrastructure required
- No database required
- No user authentication system
- All calculations performed in browser
- All data stored in browser local storage

### 11.2 Modular Code Structure
- Separate GPA calculation engine
- Separate CLP assessment engine
- Separate recommendation engine
- Config-based GPA rule engine
- Versioned GPA calculations
- Historical recalculation support
- No hardcoded academic logic

### 11.3 Module Interfaces
- Clear interfaces between:\n  - GPA Engine
  - CLP Module
  - Recommendation Engine\n- Modular, testable, and maintainable code
\n---

## 12. Validation & Testing

### 12.1 Testing Requirements
- Test using real student data
- Results must match official university calculations 100%
- Document edge cases\n- Test CLP assessment flow
- Test integrated recommendations

---

## 13. Sprint Plan

### Sprint 0 – Preparation (3–4 days)
**Objective:** Establish solid foundation\n\n**Tasks:**
- Review current GPA calculation logic
- Isolate GPA Engine into independent module
- Define interfaces between GPA Engine, CLP Module, and Recommendation Engine
- Prepare Design Tokens (colors, fonts, RTL/LTR)
\n**Deliverables:**\n- Architecture Diagram
- Folder Structure
- Technical Decisions Document
\n### Sprint 1 – Cognitive Learning Profile (CLP) (1 week)
**Tasks:**
- Build CLP assessment (10–15 questions)
- Scoring Engine for each domain
- CLP Results page
- Clear disclaimers
- Save results locally

**Deliverables:**
- CLP Assessment UI
- CLP Result Object
- Behavioral Scores
\n### Sprint 2 – GPA Improvement Engine (1 week)
**Tasks:**\n- Analyze high-impact courses
- Simulate grade improvements
- Calculate GPA Delta for each scenario
- Rank opportunities by impact

**Deliverables:**
- GPA Action Plan Engine
- What-if Simulator
- Ranked Recommendations

### Sprint 3 – Intelligent Integration (CLP + GPA) (1 week)
**Tasks:**
- Link each GPA recommendation with appropriate study strategy
- Explain why each strategy matches the student's profile
- Prevent unrealistic recommendations

**Deliverables:**
- Integrated Action Cards
- Explanation Layer
\n### Sprint 4 – UX + Copy + Polish (4–5 days)
**Tasks:**
- Improve user experience
- Write final copy
- Enhance interactions
- Test Arabic / English\n
**Deliverables:**
- Production-ready UI
- Final Copy
- QA Checklist

---\n
## 14. Wireframes\n
### Dashboard (Main Page)
```
[ Header: echo-π Academic Intelligence Platform | Language Switch ]
\nCurrent GPA: 2.71
Target GPA: [ 3.00 ]

[ Improve My GPA ]
[ Understand How I Learn ]
\n--------------------------------
Top Improvement Opportunities\n- Biophysics (3 credits) +0.24
- Anatomy (4 credits) +0.31
--------------------------------
```

### CLP Introduction\n```
Understand How You Learn

This short assessment helps identify\nstudy behaviors that affect your academic performance.

[ Start Assessment ]
[ Skip for now ]
```

### CLP Results
```
Your Cognitive Learning Profile

Focus Sustainability        ▓▓▓▓░\nTime Management             ▓▓░░░\nActive Recall Usage         ▓░░░░
Exam Stress Response        ▓▓▓░░

These behaviors are adjustable and improvable.

[ See My Action Plan ]
```

### Integrated GPA Action Plan
```
Action Plan to Improve Your GPA
\n1. Improve Biophysics (3 credits)\n   GPA Impact: +0.24
   Recommended Strategy:\n   Practice Testing (matches your low active recall)
\n[ See How To Apply ]
```

---

## 15. Copy for UI (AR / EN)

### CLP Intro\n**Arabic:**
هذا التقييم يساعدك على فهم سلوكك الدراسي وليس اختبار شخصية أو تشخيصًا نفسيًا.

**English:**\nThis assessment helps understand your study behaviors. It is not a personality test or psychological diagnosis.

### CLP Result Explanation
**Arabic:**
هذه النتائج قابلة للتحسين ولا تعكس قدراتك أو ذكاءك.

**English:**
These results are adjustable and do not reflect intelligence or ability.

### GPA Recommendation
**Arabic:**
تحسين هذه المادة هو أسرع طريق لرفع معدلك حاليًا.

**English:**
Improving this course is currently the most effective way to raise your GPA.

### Disclaimer
**Arabic:**
هذه التوصيات إرشادية ولا تُعد بديلاً عن السجلات الأكاديمية الرسمية.

**English:**
These recommendations are advisory and not a replacement for official academic records.

---
\n## 16. Documentation\n
### 16.1 System Overview
- Academic Decision Support System
- Does not provide diagnosis
- Based on adjustable behaviors
\n### 16.2 Scientific Basis
Based on proven research:
- Dunlosky et al., 2013\n- Roediger & Karpicke, 2006
- Cepeda et al., 2006
- Bjork & Bjork, 2011

With simplified, non-academic explanations for students.

### 16.3 Ethical Statement
- No personality classification
- No deterministic predictions
- No value judgments
\n### 16.4 Limitations
- Results are advisory\n- Depend on input data
- Do not represent official authority

### 16.5 Future Extensions
- Advisor Mode
- OCR Results
- University-wide analytics

---
\n## 17. Reference Files

1. Grading table image: image.png
2. Cumulative GPA grading image: image-2.png
\n---

## 18. Final Deliverable

- Fully working bilingual academic platform
- Exact GPA logic matching university rules
- Fully integrated CLP module
- GPA improvement tightly linked to learning behavior
- Clear student UI flow
- Scientifically grounded recommendations
- Ethical and legal safety\n- Professional UI/UX\n- Clean, documented source code
- Deployment-ready version
- Clear documentation for future updates
- Fully client-side with no backend dependencies