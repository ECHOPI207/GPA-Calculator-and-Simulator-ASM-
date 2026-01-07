# echo-π Academic Intelligence Platform

## 🎓 Overview

**echo-π** (منصة echo-π الذكية للمعدل الأكاديمي) is a professional, university-grade academic decision-support system designed to calculate, analyze, and predict GPA with complete accuracy based on official university grading rules.

This is not a basic calculator but a comprehensive academic intelligence platform suitable for students, advisors, and universities.

## ✨ Key Features

### 🧮 Core GPA Calculation
- **Accurate GPA Engine**: Implements exact university grading rules
- **Multi-Semester Support**: Track performance across all semesters
- **Cumulative & Semester GPA**: Calculate both current and overall GPA
- **Retake Handling**: Properly handles course retakes in calculations
- **Credit Hour Tracking**: Monitor total registered and passed hours

### 🎯 Scenario Simulator (What-If Analysis)
- **Future GPA Prediction**: Simulate grades for upcoming courses
- **Best/Worst/Realistic Cases**: See all possible outcomes
- **Multiple Scenarios**: Save and compare different academic paths
- **Impact Analysis**: Understand how each course affects your GPA

### 📊 Academic Timeline
- **Semester-by-Semester View**: Visualize performance over time
- **Trend Analysis**: Track improvement or decline
- **Performance Indicators**: Visual cues for academic progress

### 📈 Reports & Analysis
- **Course Impact Analysis**: Identify which courses help or hurt your GPA
- **Grade Distribution**: Visualize your grade patterns
- **Top Performers**: Highlight your best courses
- **Improvement Recommendations**: Get suggestions for GPA improvement

### 🌍 Bilingual Support (Arabic & English)
- **Full RTL/LTR Support**: Seamless Arabic and English interfaces
- **Automatic Direction Handling**: UI adapts to selected language
- **Persistent Language Preference**: Your choice is saved

### 🎨 Professional Design
- **Academic Color Scheme**: Professional blue with status colors
- **Light & Dark Modes**: Choose your preferred theme
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Built with shadcn/ui components

### 🔐 Security & Privacy
- **User Authentication**: Secure username/password login
- **Role-Based Access**: User and Admin roles
- **Data Privacy**: Your academic data is protected
- **RLS Policies**: Database-level security

### 👨‍💼 Admin Features
- **User Management**: View and manage all users
- **Role Assignment**: Promote users to admin
- **System Overview**: Monitor platform usage

## 🎓 Grading System

The platform implements the following grading rules:

| Grade | Points | Percentage Range | Description (EN) | Description (AR) |
|-------|--------|------------------|------------------|------------------|
| A     | 4.00   | 90-100%         | Excellent        | ممتاز            |
| A-    | 3.70   | 85-89%          | Excellent        | ممتاز            |
| B+    | 3.30   | 80-84%          | Very Good        | جيد جداً         |
| B     | 3.00   | 75-79%          | Very Good        | جيد جداً         |
| B-    | 2.70   | 70-74%          | Good             | جيد              |
| C+    | 2.30   | 65-69%          | Good             | جيد              |
| C     | 2.00   | 62-64%          | Pass             | مقبول            |
| D     | 1.70   | 60-61%          | Pass             | مقبول            |
| F     | 0.00   | <60%            | Fail             | راسب             |

### GPA Classification

| Classification | GPA Range    | English    | Arabic      |
|----------------|--------------|------------|-------------|
| Excellent      | ≥ 3.50       | Excellent  | ممتاز       |
| Very Good      | 2.75 - 3.49  | Very Good  | جيد جداً    |
| Good           | 2.30 - 2.74  | Good       | جيد         |
| Pass           | 2.00 - 2.29  | Pass       | مقبول       |
| Fail           | < 2.00       | Fail       | راسب        |

## 🚀 Getting Started

### First Time Setup

1. **Create an Account**
   - Click "Sign Up" on the login page
   - Enter a username (letters, numbers, and underscores only)
   - Create a password (minimum 6 characters)
   - The first user becomes an admin automatically

2. **Add Your Courses**
   - Go to "GPA Calculator" page
   - Click "Add Course"
   - Enter course details:
     - Course Code (e.g., CS101)
     - Course Name
     - Credit Hours (1-6)
     - Grade (A, A-, B+, etc.)
     - Semester (Fall, Spring, Summer)
     - Year
     - Mark as "Retake" if applicable

3. **View Your Dashboard**
   - See your cumulative GPA
   - View current semester GPA
   - Track total and passed hours
   - See your GPA classification

### Using the Simulator

1. Go to "Scenario Simulator"
2. Click "Add Course" to add future courses
3. Enter expected grades for each course
4. View predicted GPA in three scenarios:
   - **Best Case**: All A grades
   - **Realistic**: Based on your expected grades
   - **Worst Case**: All D grades

### Viewing Timeline

1. Go to "Academic Timeline"
2. See semester-by-semester performance
3. Track trends (improved, declined, stable)
4. Review all courses per semester

### Generating Reports

1. Go to "Reports & Analysis"
2. View detailed academic summary
3. See top performing courses
4. Identify courses impacting GPA negatively
5. View grade distribution
6. Export to PDF (coming soon)

## 🛠️ Technical Stack

- **Frontend**: React + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **State Management**: React Context
- **Routing**: React Router
- **Icons**: Lucide React

## 📱 Pages Overview

1. **Dashboard** (`/`): Overview of your academic status
2. **GPA Calculator** (`/calculator`): Manage courses and calculate GPA
3. **Scenario Simulator** (`/simulator`): Predict future GPA
4. **Academic Timeline** (`/timeline`): Semester-by-semester view
5. **Reports** (`/reports`): Detailed analysis and insights
6. **Settings** (`/settings`): Language, theme, and preferences
7. **Admin Panel** (`/admin`): User management (admin only)

## 🎯 Key Concepts

### GPA Calculation
- **Quality Points** = Grade Points × Credit Hours
- **Semester GPA** = Total Quality Points ÷ Total Credit Hours (for semester)
- **Cumulative GPA** = Total Quality Points ÷ Total Credit Hours (all semesters)

### Retake Handling
- When a course is retaken, only the latest attempt counts toward GPA
- Both attempts are visible in your records
- The system automatically uses the better grade

### Course Impact
- Shows how much each course contributes to your GPA
- Positive impact: courses that raise your GPA
- Negative impact: courses that lower your GPA
- Helps identify which courses to focus on

## 🌟 Best Practices

1. **Keep Records Updated**: Add courses as soon as grades are available
2. **Use Simulator**: Plan future semesters to reach target GPA
3. **Review Timeline**: Track your progress regularly
4. **Check Reports**: Identify areas for improvement
5. **Set Goals**: Use the simulator to see what grades you need

## 🔒 Privacy & Security

- All calculations are performed locally when possible
- Your data is stored securely in Supabase
- Row-Level Security (RLS) ensures data privacy
- Only you can see your courses and GPA
- Admins can manage users but not view their academic data

## 📝 Important Notes

- This platform is for academic planning and analysis
- Always verify GPA with official university records
- The system uses standard grading rules (customizable per university)
- First registered user automatically becomes admin
- Admin can promote other users to admin role

## 🎓 For Students

Use echo-π to:
- Track your academic progress
- Plan future semesters strategically
- Understand which courses impact your GPA most
- Set realistic academic goals
- Make informed decisions about course selection

## 👨‍🏫 For Advisors

Use echo-π to:
- Help students understand their GPA
- Provide data-driven academic advice
- Simulate different academic paths
- Identify at-risk students
- Support academic planning

## 🏫 For Universities

echo-π can be customized for:
- Institution-specific grading rules
- Multiple grading systems
- Custom GPA classifications
- Institutional branding
- Integration with existing systems

## 📞 Support

For questions or issues:
1. Check the in-app help text
2. Review this README
3. Contact your system administrator

## 🎉 Welcome!

Thank you for using echo-π Academic Intelligence Platform. We hope this tool helps you achieve your academic goals!

---

**echo-π تطوير** - Your Academic Success Partner
