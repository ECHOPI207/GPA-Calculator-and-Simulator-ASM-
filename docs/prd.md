# Academic GPA Intelligence Platform Requirements Document\n
## 1. Application Overview

### 1.1 Application Name
**English:** echo-π Academic Intelligence Platform  
**Arabic:** منصة echo-π الذكية للمعدل الأكاديمي\n
### 1.2 Application Description
A professional, university-grade academic decision-support system designed to calculate, analyze, and predict GPA with complete accuracy based on official university grading rules. This is a fully client-side application that operates entirely in the browser without requiring backend infrastructure, database, or user authentication.

### 1.3 Core Positioning
- Academic accuracy is mandatory
- University rules are the single source of truth
- Simple UX for students with deep intelligence under the hood
- Fully client-side architecture
- Portfolio-quality engineering

---

## 2. Core Features

### 2.1 GPA Calculation Engine
- Add, edit, and remove courses
- Multi-semester support
- Calculate semester GPA
- Calculate cumulative GPA
- Track total registered hours
- Track total passed hours\n- Handle failed courses (grade F)
- Handle retaken courses\n- Apply exact grading rules from university system

### 2.2 University Grading System Support
- Select university from list
- Load grading rules dynamically based on university selection
- Support grading table as shown in uploaded images:
  - Grade A: 4.00 points (90-100%)
  - Grade A-: 3.70 points (85-89%)\n  - Grade B+: 3.30 points (80-84%)
  - Grade B: 3.00 points (75-79%)
  - Grade B-: 2.70 points (70-74%)\n  - Grade C+: 2.30 points (65-69%)
  - Grade C: 2.00 points (62-64%)
  - Grade D: 1.70 points (60-61%)
  - Grade F: 0.00 points (below 60%)
- Support cumulative GPA grading:
  - Excellent: GPA ≥ 3.50
  - Very Good: 2.75 ≤ GPA < 3.50
  - Good: 2.30 ≤ GPA < 2.75
  - Pass: GPA > 2.000
\n### 2.3 GPA Scenario Simulator (What-If Analysis)
- Simulate future grades for upcoming courses
- Save multiple scenarios in browser local storage
- Show instant GPA impact for each scenario
- Compare scenarios side-by-side

### 2.4 GPA Explanation Engine
- Explain why current GPA is what it is
- Highlight courses that helped improve GPA
- Highlight courses that harmed GPA
- Use plain academic language in both Arabic and English

### 2.5 Smart Error Detection
- Detect duplicate courses
- Detect invalid grades\n- Detect inconsistent credit hours
- Detect courses outside academic plan
- Display clear warnings in Arabic and English

### 2.6 Academic Timeline\n- Display GPA per semester\n- Show performance trend over time\n- Visual indicators for improvement or decline

### 2.7 AI Academic Recommendations
- Suggest grade improvements for specific courses
- Predict GPA impact of grade changes
- Help students plan to reach target GPA

### 2.8 Final GPA Prediction
- Predict graduation GPA based on remaining courses
- Show best-case scenario
- Show worst-case scenario
- Show realistic scenario\n
### 2.9 OCR Result Import (Advanced)\n- Upload academic result image
- Auto-extract courses, grades, and credit hours
- Allow manual correction of extracted data

### 2.10 GPA Comparison
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

## 4. Language & Direction Support\n
### 4.1 Bilingual Support
- Full support for Arabic (RTL)\n- Full support for English (LTR)

### 4.2 Automatic Direction Handling
- Arabic content displays with dir=\"rtl\"
- English content displays with dir=\"ltr\"
- Direction affects layout, navigation, forms, tables, charts, icons, modals, and pagination\n
### 4.3 Logical CSS
- Use margin-inline-*, padding-inline-*
- Use text-align: start / end
- Avoid duplicating layouts for RTL/LTR

### 4.4 Language Preference Persistence
- Save user language preference in browser local storage
- Apply preference across all sessions

---

## 5. UI/UX Design Requirements

### 5.1 Design Principles
- Academic, clean, modern design
- Professional color palette
- Clear hierarchy and spacing\n- Fully responsive (mobile and desktop)
- Accessible contrast and focus states
- Simple interface for non-technical users

### 5.2 Branding
- Logo text: echo-π تطوير
- Logo must have academic and tech feeling
- Logo must be balanced in RTL and LTR
- Logo must be responsive and not break layout

### 5.3 Application Naming
- Apply bilingual name consistently in header, title, and meta tags

---

## 6. Data Storage & Privacy

### 6.1 Client-Side Storage
- All data stored in browser local storage
- No backend or database required
- No user authentication or login system
- Data persists across sessions on the same device

### 6.2 Privacy Messaging\n- Display clear privacy policy
- Inform users that all data is stored locally on their device
- Explain that no data is sent to any server

### 6.3 Academic Disclaimers
- Display context-aware disclaimers
- Clarify that platform is not a replacement for official records

---

## 7. Export & Reporting

### 7.1 PDF Export
- Generate professional PDF report client-side
- Format similar to official result documents
- Include GPA, explanation, date, and disclaimer

---
\n## 8. Architecture Requirements\n
### 8.1 Client-Side Architecture
- Fully client-side application
- No backend infrastructure required
- No database required
- No user authentication system
- All calculations performed in browser
- All data stored in browser local storage

### 8.2 Modular Code Structure
- Separate GPA calculation engine
- Config-based GPA rule engine
- Versioned GPA calculations\n- Historical recalculation support
- No hardcoded academic logic

---

## 9. Validation & Testing

### 9.1 Testing Requirements
- Test using real student data
- Results must match official university calculations 100%
- Document edge cases

---\n
## 10. Reference Files

1. Grading table image: image.png
2. Cumulative GPA grading image: image-2.png

---\n
## 11. Final Deliverable

- Fully working bilingual academic platform\n- Exact GPA logic matching university rules
- Professional UI/UX
- Clean, documented source code
- Deployment-ready version
- Clear documentation for future updates
- Fully client-side with no backend dependencies