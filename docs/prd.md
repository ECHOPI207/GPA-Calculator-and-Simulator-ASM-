# Academic GPA Intelligence Platform Requirements Document

## 1. Application Overview

### 1.1 Application Name
**English:** echo-π Academic Intelligence Platform  
**Arabic:** منصة echo-π الذكية للمعدل الأكاديمي\n
### 1.2 Application Description
A professional, university-grade academic decision-support system designed to calculate, analyze, and predict GPA with complete accuracy based on official university grading rules. This is not a basic calculator but a comprehensive academic intelligence platform suitable for students, advisors, and universities.

### 1.3 Core Positioning
- Academic accuracy is mandatory
- University rules are the single source of truth
- Simple UX for students with deep intelligence under the hood
- Scalable to SaaS level\n- Portfolio-quality engineering

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

### 2.2 University Grading System Support
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
- Support cumulative GPA grading:\n  - Excellent: GPA ≥ 3.50\n  - Very Good: 2.75 ≤ GPA < 3.50
  - Good: 2.30 ≤ GPA < 2.75
  - Pass: GPA > 2.000
\n### 2.3 GPA Scenario Simulator (What-If Analysis)
- Simulate future grades for upcoming courses
- Save multiple scenarios
- Show instant GPA impact for each scenario
- Compare scenarios side-by-side

### 2.4 GPA Explanation Engine
- Explain why current GPA is what it is
- Highlight courses that helped improve GPA
- Highlight courses that harmed GPA
- Use plain academic language in both Arabic and English

### 2.5 Smart Error Detection\n- Detect duplicate courses
- Detect invalid grades
- Detect inconsistent credit hours
- Detect courses outside academic plan
- Display clear warnings in Arabic and English

### 2.6 Academic Timeline
- Display GPA per semester
- Show performance trend over time
- Visual indicators for improvement or decline

### 2.7 AI Academic Recommendations
- Suggest grade improvements for specific courses
- Predict GPA impact of grade changes
- Help students plan to reach target GPA

### 2.8 Final GPA Prediction
- Predict graduation GPA based on remaining courses
- Show best-case scenario
- Show worst-case scenario
- Show realistic scenario

### 2.9 OCR Result Import (Advanced)
- Upload academic result image
- Auto-extract courses, grades, and credit hours
- Allow manual correction of extracted data
\n### 2.10 GPA Comparison
- Compare current GPA against graduation requirements
- Compare against academic warning thresholds
- Compare against honor roll thresholds

---\n
## 3. Academic Intelligence Features

### 3.1 Academic Decision Engine
- Analyze whether to drop or continue a course
- Analyze whether to retake a failed course
- Compare heavy vs light course load options
- Provide numeric impact and justification for each decision

### 3.2 Academic Risk Score\n- Calculate risk of academic warning or probation
- Display color-coded risk level
- Provide clear explanation and advice

### 3.3 GPA Stability Indicator
- Indicate if GPA is stable, volatile, or high risk
- Provide interpretation and advice

### 3.4 Credit-Weighted Visualization
- Show which courses have the most impact on GPA
- Visualize GPA dominance per course
\n### 3.5 Performance Heatmap
- Visualize performance across semesters and courses
- Use color coding for easy interpretation

### 3.6 Student Profile Modes\n- Freshman mode
- Struggling student mode
- High-performing student mode
- Graduation-track mode

### 3.7 Advisor Mode\n- Academic mentor dashboard
- Multi-semester overview for advisors
- Read-only access for advisors

### 3.8 Policy Change Simulator
- Simulate GPA under new university rules
- Compare old vs new results
\n---

## 4. Language & Direction Support

### 4.1 Bilingual Support
- Full support for Arabic (RTL)\n- Full support for English (LTR)
\n### 4.2 Automatic Direction Handling
- Arabic content displays with dir=\"rtl\"
- English content displays with dir=\"ltr\"
- Direction affects layout, navigation, forms, tables, charts, icons, modals, and pagination

### 4.3 Logical CSS\n- Use margin-inline-*, padding-inline-*\n- Use text-align: start / end\n- Avoid duplicating layouts for RTL/LTR
\n### 4.4 Language Preference Persistence
- Save user language preference
- Apply preference across all sessions
\n---

## 5. UI/UX Design Requirements

### 5.1 Design Principles
- Academic, clean, modern design
- Professional color palette
- Clear hierarchy and spacing
- Fully responsive (mobile and desktop)
- Accessible contrast and focus states
- Simple interface for non-technical users

### 5.2 Branding
- Logo text: echo-π تطوير
- Logo must have academic and tech feeling
- Logo must be balanced in RTL and LTR\n- Logo must be responsive and not break layout

### 5.3 Application Naming
- Apply bilingual name consistently in header, title, and meta tags
\n---

## 6. Privacy & Trust

### 6.1 Local-First Calculations\n- Perform calculations locally by default
- No data sent to server unless user opts in
\n### 6.2 Privacy Messaging
- Display clear privacy policy
- Inform users about data handling
\n### 6.3 Academic Disclaimers
- Display context-aware disclaimers
- Clarify that platform is not a replacement for official records\n
---

## 7. Export & Reporting

### 7.1 PDF Export
- Generate professional PDF report
- Format similar to official result documents
- Include GPA, explanation, date, and disclaimer

---

## 8. Architecture Requirements

### 8.1 Modular Code Structure
- Separate GPA calculation engine
- Config-based GPA rule engine
- Versioned GPA calculations\n- Historical recalculation support
- No hardcoded academic logic

### 8.2 Scalability
- Design system ready for SaaS expansion
- Support for multiple universities
- Easy onboarding for new universities
\n---

## 9. Validation & Testing

### 9.1 Testing Requirements
- Test using real student data
- Results must match official university calculations 100%
- Document edge cases\n
---

## 10. Reference Files

1. Grading table image: image.png
2. Cumulative GPA grading image: image-2.png
\n---

## 11. Final Deliverable

- Fully working bilingual academic platform\n- Exact GPA logic matching university rules
- Professional UI/UX
- Clean, documented source code
- Deployment-ready version
- Clear documentation for future updates