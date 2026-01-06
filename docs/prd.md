# Academic GPA Intelligence Platform Requirements Document\n
## 1. Application Overview

### 1.1 Application Name
**English:** echo-π Academic Intelligence Platform  
**Arabic:** منصة echo-π الذكية للمعدل الأكاديمي

### 1.2 Application Description
A professional, university-grade academic decision-support system designed to calculate, analyze, and predict GPA with complete accuracy based on official university grading rules. This is a fully client-side application that operates entirely in the browser without requiring backend infrastructure, database, or user authentication.

### 1.3 Core Positioning\n- Academic accuracy is mandatory
- University rules are the single source of truth
- Simple UX for students with deep intelligence under the hood\n- Fully client-side architecture
- Portfolio-quality engineering\n
---

## 2. Core Features

### 2.1 GPA Calculation Engine
- Add, edit, and remove courses\n- Multi-semester support
- Calculate semester GPA
- Calculate cumulative GPA
- Track total registered hours
- Track total passed hours
- Handle failed courses (grade F)
- Handle retaken courses
- Apply exact grading rules from university system

### 2.2 Course Editing Behavior
- When editing a course, display course data in the same view or modal
- Do not open a new tab when editing
- Pre-fill all course fields with existing data
- Allow inline editing without navigation disruption

### 2.3 University Grading System Support
- Select university from list
- Load grading rules dynamically based on university selection
- Support grading table as shown in uploaded images:
  - Grade A: 4.00 points (90-100%)\n  - Grade A-: 3.70 points (85-89%)
  - Grade B+: 3.30 points (80-84%)
  - Grade B: 3.00 points (75-79%)\n  - Grade B-: 2.70 points (70-74%)
  - Grade C+: 2.30 points (65-69%)
  - Grade C: 2.00 points (62-64%)\n  - Grade D: 1.70 points (60-61%)
  - Grade F: 0.00 points (below 60%)
- Support cumulative GPA grading:
  - Excellent: GPA ≥ 3.50
  - Very Good: 2.75 ≤ GPA < 3.50
  - Good: 2.30 ≤ GPA < 2.75
  - Pass: GPA > 2.000

### 2.4 GPA Scenario Simulator (What-If Analysis)
- Simulate future grades for upcoming courses\n- Save multiple scenarios in browser local storage
- Show instant GPA impact for each scenario
- Compare scenarios side-by-side

### 2.5 GPA Explanation Engine
- Explain why current GPA is what it is
- Highlight courses that helped improve GPA
- Highlight courses that harmed GPA
- Use plain academic language in both Arabic and English

### 2.6 Smart Error Detection
- Detect duplicate courses
- Detect invalid grades\n- Detect inconsistent credit hours
- Detect courses outside academic plan
- Display clear warnings in Arabic and English

### 2.7 Academic Timeline\n- Display GPA per semester\n- Show performance trend over time\n- Visual indicators for improvement or decline

### 2.8 AI Academic Recommendations
- Suggest grade improvements for specific courses
- Predict GPA impact of grade changes
- Help students plan to reach target GPA

### 2.9 Final GPA Prediction
- Predict graduation GPA based on remaining courses
- Show best-case scenario
- Show worst-case scenario
- Show realistic scenario\n
### 2.10 OCR Result Import (Advanced)\n- Upload academic result image
- Auto-extract courses, grades, and credit hours
- Allow manual correction of extracted data

### 2.11 GPA Comparison
- Compare current GPA against graduation requirements
- Compare against academic warning thresholds
- Compare against honor roll thresholds

---
\n## 3. Academic Intelligence Features

### 3.1 Academic Decision Engine
- Analyze whether to drop or continue a course
- Analyze whether to retake a failed course
- Compare heavy vs light course load options\n- Provide numeric impact and justification for each decision

### 3.2 Academic Risk Score
- Calculate risk of academic warning or probation
- Display color-coded risk level
- Provide clear explanation and advice

### 3.3 GPA Stability Indicator
- Indicate if GPA is stable, volatile, or high risk
- Provide interpretation and advice

### 3.4 Credit-Weighted Visualization
- Show which courses have the most impact on GPA
- Visualize GPA dominance per course\n
### 3.5 Performance Heatmap
- Visualize performance across semesters and courses
- Use color coding for easy interpretation

### 3.6 Student Profile Modes
- Freshman mode
- Struggling student mode\n- High-performing student mode\n- Graduation-track mode\n
### 3.7 Policy Change Simulator
- Simulate GPA under new university rules
- Compare old vs new results

---
\n## 4. Intelligent GPA Improvement Module
\n### 4.1 Module Objective
Provide clear, actionable, and prioritized steps that students can take to improve their GPA using numeric analysis and data-driven recommendations.

### 4.2 Input Data Analysis
- Student current GPA
- All completed courses
- Credit hours per course
- Grades per course\n- Failed courses
- Remaining courses (if available)
\n### 4.3 Analysis Logic
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

### 4.4 Output Structure
\n#### 4.4.1 Quick Wins
- Small effort, high GPA impact
- Display:\n  - Course name
  - Credit hours
  - Current grade
  - Suggested grade
  - GPA before\n  - GPA after
  - Exact numeric improvement

#### 4.4.2 Medium-Term Improvements\n- Moderate effort, good impact
- Display same data structure as Quick Wins

#### 4.4.3 Long-Term Strategy
- Graduation planning
- Display same data structure as Quick Wins

### 4.5 Visual Presentation
- Display recommendations in cards or tables
- Use color-coded impact indicators:\n  - High impact: Green
  - Medium impact: Yellow
  - Low impact: Gray
- Use icons for priority levels
- Show numeric GPA improvement prominently

### 4.6 Language & Tone
- Support Arabic and English\n- Use academic, respectful tone
- Avoid vague advice
- Avoid emotional language\n- Focus on numbers and clarity\n
### 4.7 Important Rules
- Do NOT give motivational or generic tips
- Do NOT suggest unrealistic grade jumps\n- Do NOT overwhelm the student
- Clarity and trust are mandatory
- All recommendations must be backed by numeric analysis

---
\n## 5. Dashboard Professional Data Analysis

### 5.1 Dashboard Overview
- Comprehensive academic performance dashboard
- Display key metrics and insights at a glance
\n### 5.2 Key Metrics Display
- Current cumulative GPA
- Current semester GPA
- Total registered hours
- Total passed hours\n- Academic standing (Excellent, Very Good, Good, Pass)
- GPA trend indicator (improving, stable, declining)

### 5.3 Visual Analytics
- GPA trend chart (line chart showing GPA per semester)
- Grade distribution chart (pie or bar chart showing grade distribution)
- Credit hours breakdown (completed vs remaining)
- Performance heatmap (semester vs grade performance)

### 5.4 Insights & Alerts
- Academic risk alerts (if GPA is below threshold)
- Improvement opportunities (courses with high impact potential)
- Milestone achievements (honor roll, dean's list, etc.)

### 5.5 Comparison Analytics
- Compare current GPA against graduation requirements
- Compare against academic warning thresholds
- Compare against honor roll thresholds

---

## 6. Language & Direction Support

### 6.1 Bilingual Support
- Full support for Arabic (RTL)\n- Full support for English (LTR)
\n### 6.2 Automatic Direction Handling
- Arabic content displays with dir=rtl
- English content displays with dir=ltr
- Direction affects layout, navigation, forms, tables, charts, icons, modals, and pagination

### 6.3 Logical CSS\n- Use margin-inline-*, padding-inline-*\n- Use text-align: start / end\n- Avoid duplicating layouts for RTL/LTR
\n### 6.4 Language Preference Persistence
- Save user language preference in browser local storage
- Apply preference across all sessions
\n---

## 7. UI/UX Design Requirements

### 7.1 Design Principles
- Academic, clean, modern design
- Professional color palette\n- Clear hierarchy and spacing
- Fully responsive (mobile and desktop)
- Accessible contrast and focus states
- Simple interface for non-technical users

### 7.2 Branding
- Logo text: echo-π تطوير\n- Logo must have academic and tech feeling
- Logo must be balanced in RTL and LTR
- Logo must be responsive and not break layout

### 7.3 Application Naming
- Apply bilingual name consistently in header, title, and meta tags
\n---

## 8. Data Storage & Privacy

### 8.1 Client-Side Storage
- All data stored in browser local storage
- No backend or database required
- No user authentication or login system
- Data persists across sessions on the same device

### 8.2 Privacy Messaging
- Display clear privacy policy\n- Inform users that all data is stored locally on their device
- Explain that no data is sent to any server
\n### 8.3 Academic Disclaimers
- Display context-aware disclaimers
- Clarify that platform is not a replacement for official records
\n---

## 9. Export & Reporting

### 9.1 PDF Export
- Generate professional PDF report client-side
- Format similar to official result documents
- Include GPA, explanation, date, and disclaimer

---

## 10. Architecture Requirements

### 10.1 Client-Side Architecture
- Fully client-side application\n- No backend infrastructure required
- No database required
- No user authentication system
- All calculations performed in browser
- All data stored in browser local storage

### 10.2 Modular Code Structure
- Separate GPA calculation engine
- Config-based GPA rule engine
- Versioned GPA calculations
- Historical recalculation support
- No hardcoded academic logic

---

## 11. Validation & Testing

### 11.1 Testing Requirements
- Test using real student data
- Results must match official university calculations 100%
- Document edge cases\n\n---

## 12. Reference Files

1. Grading table image: image.png
2. Cumulative GPA grading image: image-2.png
\n---

## 13. Final Deliverable

- Fully working bilingual academic platform
- Exact GPA logic matching university rules
- Professional UI/UX\n- Clean, documented source code
- Deployment-ready version
- Clear documentation for future updates
- Fully client-side with no backend dependencies