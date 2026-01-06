# Academic GPA Intelligence Platform Requirements Document

## 1. Application Overview

### 1.1 Application Name
**English:** AcademiQ - Academic Intelligence Platform  
**Arabic:** أكاديميك - منصة الذكاء الأكاديمي\n
### 1.2 Application Description
A professional, university-grade academic decision-support system designed to calculate, analyze, and predict GPA with complete accuracy based on official university grading rules. The platform now includes a scientifically sound Cognitive Learning Profile (CLP) module that analyzes study-related behaviors and integrates them with GPA improvement strategies. This is a fully client-side application that operates entirely in the browser without requiring backend infrastructure, database, or user authentication.

### 1.3 Core Positioning
- Academic accuracy is mandatory\n- University rules are the single source of truth
- Simple UX for students with deep intelligence under the hood
- Fully client-side architecture
- Portfolio-quality engineering
- Evidence-based learning science integration

---

## 2. Core Features

### 2.1 GPA Calculation Engine
- Add, edit, and remove courses
- Multi-semester support
- Calculate semester GPA for each semester
- Display semester GPA for all semesters
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
- Detect invalid grades
- Detect inconsistent credit hours
- Detect courses outside academic plan
- Display clear warnings in Arabic and English

### 2.7 Academic Timeline\n- Display GPA per semester
- Display semester GPA for each individual semester
- Show performance trend over time
- Visual indicators for improvement or decline

### 2.8 AI Academic Recommendations
- Suggest grade improvements for specific courses
- Predict GPA impact of grade changes
- Help students plan to reach target GPA
- Integrate with CLP for personalized study strategies

### 2.9 Final GPA Prediction
- Predict graduation GPA based on remaining courses
- Show best-case scenario\n- Show worst-case scenario\n- Show realistic scenario
\n### 2.10 OCR Result Import (Advanced)
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
- Support Arabic and English\n- Use academic, respectful tone
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
\n**Description:** A behavioral, non-diagnostic academic profiling module that analyzes study-related behaviors and links them directly to GPA improvement strategies.\n
**Important:** This is NOT a personality test. This is NOT psychological diagnosis. This is an academic, behavior-based learning intelligence module.

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
- Clear statement: This is NOT a diagnosis

#### 5.4.2 Interpretation Guidelines
- Explain what each score means in academic context
- Provide examples of behaviors associated with each level
- Emphasize that all behaviors are adjustable

### 5.5 CLP Integration with GPA Improvement

#### 5.5.1 Integration Requirements
- Analyze GPA + CLP together
- Identify:\n  - Academic weaknesses affecting GPA
  - Behavioral bottlenecks limiting performance
\n#### 5.5.2 Integrated Recommendations
For each GPA improvement recommendation, explain BOTH:
- **Academic impact:** Numeric GPA change
- **Learning behavior adjustment:** Study strategy matched to CLP
\n**Example:**
Improving Course X can raise your GPA by +0.28. Given your profile (low active recall), this improvement is most achievable using practice testing instead of rereading.

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
- Add button: Understand How You Learn

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
- Button: See My Action Plan

#### 5.7.5 Integrated GPA Action Plan
- GPA improvement steps
- Behavioral strategy per step
- Prioritized actions
- Clear explanation of why each strategy matches the student's profile

#### 5.7.6 Continuous Feedback\n- If you apply this strategy, expected GPA impact is X\n- Allow students to mark strategies as tried\n- Adjust recommendations based on feedback

### 5.8 Academic Transparency & Disclaimers

#### 5.8.1 CLP Intro Disclaimer
**Arabic:**
هذا التقييم يساعدك على فهم سلوكك الدراسي وليس اختبار شخصية أو تشخيصًا نفسيًا.\n
**English:**
This assessment helps understand your study behaviors. It is not a personality test or psychological diagnosis.

#### 5.8.2 CLP Result Disclaimer
**Arabic:**\nهذه النتائج قابلة للتحسين ولا تعكس قدراتك أو ذكاءك.

**English:**
These results are adjustable and do not reflect intelligence or ability.

#### 5.8.3 General Disclaimer
**Arabic:**
هذه التوصيات إرشادية ولا تُعد بديلاً عن السجلات الأكاديمية الرسمية.

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
- Semester GPA for each individual semester
- Total registered hours
- Total passed hours\n- Academic standing (Excellent, Very Good, Good, Pass)
- GPA trend indicator (improving, stable, declining)
- CLP completion status
\n### 6.3 Visual Analytics
- GPA trend chart (line chart showing GPA per semester)
- Semester GPA display for all semesters
- Grade distribution chart (pie or bar chart showing grade distribution)
- Credit hours breakdown (completed vs remaining)
- Performance heatmap (semester vs grade performance)
- CLP domain visualization (if completed)

### 6.4 Insights & Alerts
- Academic risk alerts (if GPA is below threshold)
- Improvement opportunities (courses with high impact potential)
- Milestone achievements (honor roll, dean's list, etc.)
- Behavioral insights (if CLP completed)
\n### 6.5 Comparison Analytics
- Compare current GPA against graduation requirements
- Compare against academic warning thresholds
- Compare against honor roll thresholds
\n---

## 7. Navigation & UI Structure

### 7.1 Desktop Navigation (Header-Based)
\n#### 7.1.1 Header Layout
- Fixed top header navigation bar
- Logo positioned on start side (RTL: right / LTR: left)
- Horizontal primary navigation items
- Language switcher on end side (RTL: left / LTR: right)
\n#### 7.1.2 Primary Navigation Items (Max 4–5)
1. **Dashboard** (لوحة التحكم)
2. **GPA Calculator** (حاسبة المعدل)
3. **Improvement** (تحسين المعدل)
4. **Reports** (التقارير)
5. **Settings** (الإعدادات)

#### 7.1.3 Header Navigation Rules
- Display only top-level sections
- Avoid overcrowding
- Each item maps to a real page or internal tab group
- Active page clearly highlighted with visual indicator
- Smooth hover states for all navigation items

#### 7.1.4 Nested Content Organization
- Use internal tabs within pages for sub-sections
- Example: GPA Calculator page contains tabs for Add Courses, View Courses, Edit Courses\n- Example: Reports page contains tabs for Performance Reports, Advanced Analytics, PDF Export

### 7.2 Mobile Navigation (Bottom Navigation Bar)

#### 7.2.1 Bottom Navigation Layout\n- Fixed bottom navigation bar
- Position: sticky at bottom for easy thumb access
- Icons + short labels\n- Maximum 4–5 primary actions
\n#### 7.2.2 Bottom Navigation Items\n1. **Dashboard** (🏠 لوحة التحكم)
2. **Calculator** (🧮 الحاسبة)
3. **Improve** (📈 تحسين)
4. **Reports** (📊 التقارير)
5. **Settings** (⚙️ الإعدادات)
\n#### 7.2.3 Bottom Navigation Rules
- Use universally recognizable icons
- Short, clear labels (1–2 words max)
- Active tab clearly highlighted with color and icon fill
- Smooth transitions between tabs
- Icons and labels must adapt to RTL/LTR direction

#### 7.2.4 Icon Selection Guidelines
- Dashboard: Home icon (🏠)
- Calculator: Calculator or grid icon (🧮)
- Improve: Trending up or growth icon (📈)
- Reports: Chart or analytics icon (📊)
- Settings: Gear or settings icon (⚙️)

### 7.3 Responsive Behavior

#### 7.3.1 Breakpoint Strategy
- Desktop: ≥ 768px → Header navigation
- Mobile: < 768px → Bottom navigation
- Automatic switching based on screen size
- No duplicated logic or hardcoded breakpoints where possible

#### 7.3.2 Navigation State Persistence
- Active page state persists when switching between desktop and mobile views
- Navigation selection synced across all screen sizes
- User's current page remains active after resize

### 7.4 Scroll Behavior

#### 7.4.1 Navigation Action Scroll
- On every navigation action (clicking any navigation item):
  - Automatically scroll to TOP of the page
  - Do NOT preserve previous scroll position
  - Smooth scroll animation (if supported)

#### 7.4.2 Page Load Scroll
- On initial page load: Start at top of page
- On navigation between pages: Reset scroll to top
\n### 7.5 RTL / LTR Support

#### 7.5.1 Header Navigation RTL/LTR
- Logo position flips: RTL (right) / LTR (left)
- Navigation items order respects text direction
- Language switcher position flips: RTL (left) / LTR (right)
- All spacing and alignment use logical CSS properties

#### 7.5.2 Bottom Navigation RTL/LTR
- Icon and label order respects text direction
- Navigation items order flips for RTL\n- Active indicator position adapts to direction
- All spacing uses logical CSS properties

#### 7.5.3 Logical CSS Properties
- Use `margin-inline-start` / `margin-inline-end`
- Use `padding-inline-start` / `padding-inline-end`
- Use `text-align: start` / `text-align: end`
- Avoid `left` / `right` in directional properties
\n### 7.6 Logo Interaction
- Logo is clickable on both desktop and mobile
- Clicking logo returns user to Dashboard (home page)
- Visual hover state indicates interactivity
- Consistent logo placement across all pages
- Logo size adapts to screen size (larger on desktop, compact on mobile)

### 7.7 UX Principles (Mandatory)

#### 7.7.1 Cognitive Load Minimization
- Limit top-level navigation to 4–5 items
- Use clear, descriptive labels
- Consistent icon usage
- Predictable navigation behavior
\n#### 7.7.2 Mobile Optimization
- Bottom navigation optimized for one-handed use
- Touch targets minimum 44x44px
- Clear visual feedback on tap
- No hidden critical features

#### 7.7.3 Visual Hierarchy
- Active page clearly distinguished\n- Consistent spacing and alignment\n- Clear separation between navigation and content
- Accessible color contrast (WCAG AA minimum)

#### 7.7.4 Predictability
- Navigation behavior consistent across all pages
- Same navigation structure on desktop and mobile
- Clear visual feedback for all interactions
- No unexpected navigation changes

### 7.8 Navigation Validation Checklist

#### 7.8.1 Desktop Navigation Validation
- [ ] All navigation items have valid destinations
- [ ] Active page is clearly highlighted
- [ ] Logo is clickable and returns to Dashboard\n- [ ] Language switcher is accessible
- [ ] Navigation items are not overcrowded
- [ ] RTL/LTR switching works correctly
\n#### 7.8.2 Mobile Navigation Validation
- [ ] Bottom navigation is fixed and accessible
- [ ] All icons are universally recognizable
- [ ] Active tab is clearly highlighted
- [ ] Touch targets are minimum 44x44px
- [ ] Navigation items match desktop sections
- [ ] RTL/LTR switching works correctly

#### 7.8.3 Responsive Validation
- [ ] Navigation switches automatically at breakpoint
- [ ] Active page state persists across screen sizes
- [ ] No duplicated or missing features
- [ ] Smooth transitions between navigation modes
\n#### 7.8.4 Scroll Behavior Validation
- [ ] Navigation action scrolls to top automatically
- [ ] Previous scroll position is not preserved
- [ ] Smooth scroll animation works (if supported)
\n---

## 8. Branding & Visual Identity

### 8.1 New Application Name
**English:** AcademiQ  
**Arabic:** أكاديميك

**Rationale:** Modern, professional, academic-focused name that works well in both languages and reflects intelligence and quality.

### 8.2 Logo Design Requirements
- Professional, modern design
- Reflects academic intelligence and technology
- Works well in both RTL (Arabic) and LTR (English) layouts
- Scalable and responsive
- Color scheme aligned with platform identity
- Includes both full logo (icon + text) and icon-only versions
- Icon-only version for mobile bottom navigation (if needed)

**Suggested Color Palette:**
- Primary: Deep Blue (#1E3A8A) - Trust, intelligence, professionalism
- Secondary: Bright Cyan (#06B6D4) - Innovation, clarity, energy
- Accent: Gold/Amber (#F59E0B) - Achievement, excellence\n- Neutral: Slate Gray (#64748B) - Balance, sophistication
- Background: Light Gray (#F8FAFC) / Dark Navy (#0F172A) for dark mode

### 8.3 Favicon\n- Create professional favicon based on logo icon
- Multiple sizes: 16x16, 32x32, 48x48, 64x64
- SVG version for modern browsers
- Optimized for visibility at small sizes
- Consistent with brand identity

---

## 9. Footer Design

### 9.1 Footer Structure
Professional, comprehensive footer with multiple sections:
\n**Section 1: About**
- Brief platform description
- Mission statement
\n**Section 2: Quick Links**
- الصفحة الرئيسية (Home)
- حاسبة المعدل (GPA Calculator)
- تحسين المعدل (GPA Improvement)
- التقارير (Reports)
\n**Section 3: Resources**
- كيفية استخدام الموقع (How to Use)
- الأسئلة الشائعة (FAQ)
- الدعم الفني (Support)

**Section 4: Legal & Policies**
- سياسة الخصوصية (Privacy Policy)
- شروط الاستخدام (Terms of Use)
- إخلاء المسؤولية الأكاديمية (Academic Disclaimer)

**Section 5: Contact & Social**
- Contact information (if applicable)
- Social media links (if applicable)
\n**Section 6: Credits**
- Developed by echo-π
- Copyright notice
- Version information

### 9.2 Footer Pages

#### 9.2.1 How to Use Page (كيفية استخدام الموقع)
- Step-by-step guide for new users
- Video tutorials or animated guides (optional)
- Feature explanations with screenshots
- Tips and best practices
- Bilingual content (Arabic/English)

#### 9.2.2 Privacy Policy Page (سياسة الخصوصية)
- Clear explanation of data storage (client-side only)
- No data transmission to servers
- Local storage usage explanation
- User data control and deletion
- Cookie policy (if applicable)
- Compliance with data protection standards

#### 9.2.3 Terms of Use Page (شروط الاستخدام)
- Platform usage terms
- User responsibilities
- Acceptable use policy
- Limitation of liability
- Intellectual property rights
\n#### 9.2.4 Academic Disclaimer Page (إخلاء المسؤولية الأكاديمية)
- Platform is advisory, not official
- Not a replacement for official university records
- CLP is not psychological diagnosis
- Recommendations are guidance only
- Users responsible for verifying with official sources

#### 9.2.5 FAQ Page (الأسئلة الشائعة)
- Common questions and answers
- Troubleshooting guide
- Feature explanations
- Technical support information

### 9.3 Footer Design Requirements
- Clean, organized layout
- Responsive design (mobile-friendly)
- Proper RTL/LTR support
- Consistent typography and spacing
- Accessible color contrast
- Links with hover states
- Professional appearance matching overall platform design

---

## 10. Language & Direction Support

### 10.1 Bilingual Support
- Full support for Arabic (RTL)\n- Full support for English (LTR)\n\n### 10.2 Automatic Direction Handling
- Arabic content displays with dir=rtl
- English content displays with dir=ltr
- Direction affects layout, navigation, forms, tables, charts, icons, modals, and pagination

### 10.3 Logical CSS\n- Use margin-inline-*, padding-inline-*
- Use text-align: start / end
- Avoid duplicating layouts for RTL/LTR
\n### 10.4 Language Preference Persistence
- Save user language preference in browser local storage
- Apply preference across all sessions
\n---

## 11. UI/UX Design Requirements

### 11.1 Design Principles
- Academic, clean, modern design
- Professional color palette (as defined in Branding section)
- Clear hierarchy and spacing
- Fully responsive (mobile and desktop)
- Accessible contrast and focus states
- Simple interface for non-technical users
- Smooth transitions and animations
- Intuitive navigation\n
### 11.2 Interaction Improvements
- Logo clickable to return to Dashboard
- Header navigation on desktop with clear active states
- Bottom navigation on mobile optimized for thumb access
- Automatic scroll to top on navigation actions
- Clear visual feedback for all interactions
- Loading states for calculations
- Success/error notifications
- Tooltips for complex features

---

## 12. Data Storage & Privacy

### 12.1 Client-Side Storage
- All data stored in browser local storage
- No backend or database required
- No user authentication or login system
- Data persists across sessions on the same device
- CLP results stored locally
- Navigation state stored locally

### 12.2 Privacy Messaging
- Display clear privacy policy\n- Inform users that all data is stored locally on their device
- Explain that no data is sent to any server
\n### 12.3 Academic Disclaimers
- Display context-aware disclaimers
- Clarify that platform is not a replacement for official records
- Clarify that CLP is not a psychological diagnosis
\n---

## 13. Export & Reporting

### 13.1 PDF Export
- Generate professional PDF report client-side
- Format similar to official result documents
- Include GPA, explanation, date, and disclaimer
- Optionally include CLP summary
- Include AcademiQ branding\n
---

## 14. Architecture Requirements

### 14.1 Client-Side Architecture
- Fully client-side application
- No backend infrastructure required
- No database required
- No user authentication system
- All calculations performed in browser
- All data stored in browser local storage
\n### 14.2 Modular Code Structure
- Separate GPA calculation engine
- Separate CLP assessment engine
- Separate recommendation engine
- Config-based GPA rule engine
- Versioned GPA calculations
- Historical recalculation support
- No hardcoded academic logic

### 14.3 Module Interfaces
- Clear interfaces between:\n  - GPA Engine
  - CLP Module
  - Recommendation Engine\n- Modular, testable, and maintainable code
\n---

## 15. Validation & Testing

### 15.1 Testing Requirements
- Test using real student data
- Results must match official university calculations 100%
- Document edge cases\n- Test CLP assessment flow
- Test integrated recommendations
- Test navigation and UI interactions on both desktop and mobile
- Test responsive design on multiple devices and screen sizes
- Test RTL/LTR switching
- Test header navigation on desktop
- Test bottom navigation on mobile
- Test scroll-to-top behavior on navigation actions
- Test logo clickability and return to Dashboard
- Test semester GPA display for all semesters

---

## 16. Sprint Plan

### Sprint 0 – Preparation (3–4 days)
**Objective:** Establish solid foundation\n
**Tasks:**
- Review current GPA calculation logic
- Isolate GPA Engine into independent module
- Define interfaces between GPA Engine, CLP Module, and Recommendation Engine
- Prepare Design Tokens (colors, fonts, RTL/LTR)\n- Design new logo and favicon
- Define new color palette
\n**Deliverables:**\n- Architecture Diagram
- Folder Structure
- Technical Decisions Document
- Logo and Favicon files
- Design System documentation

### Sprint 1 – Navigation & UI Improvements (1 week)
**Tasks:**
- Implement new branding (logo, colors, favicon)
- Build desktop header navigation
- Build mobile bottom navigation
- Implement responsive navigation switching
- Make logo clickable to Dashboard
- Implement scroll-to-top on navigation actions\n- Create footer with all required pages
- Improve overall design consistency

**Deliverables:**
- Updated UI with new branding
- Desktop header navigation
- Mobile bottom navigation
- Responsive navigation system
- Professional footer\n- Footer pages (How to Use, Privacy Policy, Terms, Disclaimer, FAQ)

### Sprint 2 – Cognitive Learning Profile (CLP) (1 week)
**Tasks:**\n- Build CLP assessment (10–15 questions)
- Scoring Engine for each domain
- CLP Results page
- Clear disclaimers\n- Save results locally
\n**Deliverables:**\n- CLP Assessment UI
- CLP Result Object
- Behavioral Scores
\n### Sprint 3 – GPA Improvement Engine (1 week)
**Tasks:**
- Analyze high-impact courses
- Simulate grade improvements
- Calculate GPA Delta for each scenario
- Rank opportunities by impact
\n**Deliverables:**\n- GPA Action Plan Engine
- What-if Simulator
- Ranked Recommendations

### Sprint 4 – Intelligent Integration (CLP + GPA) (1 week)
**Tasks:**
- Link each GPA recommendation with appropriate study strategy
- Explain why each strategy matches the student's profile
- Prevent unrealistic recommendations
\n**Deliverables:**\n- Integrated Action Cards
- Explanation Layer
\n### Sprint 5 – Polish & Testing (4–5 days)
**Tasks:**
- Improve user experience
- Write final copy
- Enhance interactions
- Test Arabic / English\n- Test all navigation flows (desktop and mobile)
- Test responsive design
- Test scroll behavior
- Test semester GPA display
- Final QA\n
**Deliverables:**
- Production-ready UI
- Final Copy
- QA Checklist
- Deployment-ready version

---
\n## 17. Wireframes\n
### Desktop Layout (Header Navigation)
```
[ Logo: AcademiQ | أكاديميك ]  [ Dashboard | Calculator | Improve | Reports | Settings ]  [ Language: EN/AR ]
\n[Main Content Area]\nCurrent GPA: 2.71
Target GPA: [ 3.00 ]

[ Improve My GPA ]
[ Understand How I Learn ]
\n--------------------------------
Top Improvement Opportunities\n- Biophysics (3 credits) +0.24\n- Anatomy (4 credits) +0.31
--------------------------------

Semester GPA:\n- Semester 1: 3.20
- Semester 2: 2.85
- Semester 3: 2.71
\n[Footer]
[About] [Quick Links] [Resources] [Legal] [Contact]
Developed by echo-π | © 2026 AcademiQ
```

### Mobile Layout (Bottom Navigation)
```
[ Logo: AcademiQ ]  [ Language: EN/AR ]

[Main Content Area]
Current GPA: 2.71
Target GPA: [ 3.00 ]

[ Improve My GPA ]
[ Understand How I Learn ]

--------------------------------
Top Improvement Opportunities
- Biophysics (3 credits) +0.24
- Anatomy (4 credits) +0.31
--------------------------------

Semester GPA:
- Semester 1: 3.20
- Semester 2: 2.85
- Semester 3: 2.71

[Bottom Navigation Bar - Fixed]
[ 🏠 Dashboard ] [ 🧮 Calculator ] [ 📈 Improve ] [ 📊 Reports ] [ ⚙️ Settings ]\n```

---

## 18. Copy for UI (AR / EN)

### Application Name
**Arabic:** أكاديميك - منصة الذكاء الأكاديمي  
**English:** AcademiQ - Academic Intelligence Platform

### Navigation Labels
**Dashboard:**
- Arabic: لوحة التحكم
- English: Dashboard

**GPA Calculator:**
- Arabic: حاسبة المعدل
- English: Calculator

**Improvement:**
- Arabic: تحسين المعدل
- English: Improve

**Reports:**\n- Arabic: التقارير
- English: Reports

**Settings:**
- Arabic: الإعدادات
- English: Settings

### Semester GPA Labels
**Arabic:** المعدل الفصلي  
**English:** Semester GPA

### Footer Credits
**Arabic:** تم التطوير بواسطة echo-π  
**English:** Developed by echo-π

### CLP Intro
**Arabic:**
هذا التقييم يساعدك على فهم سلوكك الدراسي وليس اختبار شخصية أو تشخيصًا نفسيًا.

**English:**
This assessment helps understand your study behaviors. It is not a personality test or psychological diagnosis.\n
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

## 19. Documentation

### 19.1 System Overview
- Academic Decision Support System
- Does not provide diagnosis\n- Based on adjustable behaviors
\n### 19.2 Scientific Basis
Based on proven research:
- Dunlosky et al., 2013\n- Roediger & Karpicke, 2006
- Cepeda et al., 2006
- Bjork & Bjork, 2011

With simplified, non-academic explanations for students.\n
### 19.3 Ethical Statement
- No personality classification
- No deterministic predictions
- No value judgments
\n### 19.4 Limitations
- Results are advisory\n- Depend on input data
- Do not represent official authority

### 19.5 Future Extensions
- Advisor Mode
- OCR Results
- University-wide analytics

---
\n## 20. Reference Files

1. Grading table image: image.png
\n---

## 21. Final Deliverable

- Fully working bilingual academic platform
- New professional branding (AcademiQ)\n- Professional logo and favicon
- Desktop header navigation
- Mobile bottom navigation\n- Responsive navigation switching
- Automatic scroll-to-top on navigation actions
- Clickable logo returning to Dashboard
- Comprehensive professional footer
- Footer pages (How to Use, Privacy Policy, Terms, Disclaimer, FAQ)
- Exact GPA logic matching university rules
- Semester GPA display for each individual semester
- Fully integrated CLP module
- GPA improvement tightly linked to learning behavior
- Clear student UI flow
- Scientifically grounded recommendations
- Ethical and legal safety\n- Professional UI/UX with improved design
- Clean, documented source code
- Deployment-ready version
- Clear documentation for future updates
- Fully client-side with no backend dependencies
- Native desktop and mobile navigation experience