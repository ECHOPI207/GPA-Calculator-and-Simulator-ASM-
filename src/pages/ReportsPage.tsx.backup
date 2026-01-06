import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courseStorage, scenarioStorage } from "@/lib/storage";
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, CourseImpact } from '@/types/types';
import { FileDown, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportsPage() {
  
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [impacts, setImpacts] = useState<CourseImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [cumulativeGPA, setCumulativeGPA] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    
    
    setLoading(true);
    try {
      const coursesData = courseStorage.getAll();
      setCourses(coursesData);
      
      if (coursesData.length > 0) {
        const calculation = GPAEngine.calculateGPA(coursesData);
        setCumulativeGPA(calculation.cumulativeGPA);
        
        const courseImpacts = GPAEngine.calculateCourseImpact(coursesData);
        setImpacts(courseImpacts);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    // PDF export functionality would go here
    alert('PDF export feature coming soon!');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 bg-muted" />
        <Skeleton className="h-96 bg-muted" />
      </div>
    );
  }

  const topPerformers = impacts.filter(i => i.impactType === 'positive').slice(0, 5);
  const needsImprovement = impacts.filter(i => i.impactType === 'negative').slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('reports.title')}</h1>
          <p className="text-muted-foreground mt-2">
            Detailed analysis of your academic performance
          </p>
        </div>
        <Button onClick={handleExportPDF}>
          <FileDown className="h-4 w-4 me-2" />
          {t('reports.export')}
        </Button>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Cumulative GPA</div>
              <div className="text-3xl font-bold text-primary">{cumulativeGPA.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Courses</div>
              <div className="text-3xl font-bold">{courses.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Credits</div>
              <div className="text-3xl font-bold">
                {courses.reduce((sum, c) => sum + c.creditHours, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Average Grade</div>
              <div className="text-3xl font-bold">
                {(courses.reduce((sum, c) => sum + c.gradePoints, 0) / courses.length).toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      {topPerformers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-success" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((impact) => (
                <div
                  key={impact.course.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium">{impact.course.courseCode}</div>
                    <div className="text-sm text-muted-foreground">{impact.course.courseName}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-success text-success-foreground">
                      {impact.course.grade}
                    </Badge>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">+{impact.impact.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Needs Improvement */}
      {needsImprovement.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-warning" />
              Courses Impacting GPA Negatively
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsImprovement.map((impact) => (
                <div
                  key={impact.course.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium">{impact.course.courseCode}</div>
                    <div className="text-sm text-muted-foreground">{impact.course.courseName}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-warning text-warning-foreground">
                      {impact.course.grade}
                    </Badge>
                    <div className="flex items-center gap-1 text-destructive">
                      <TrendingDown className="h-4 w-4" />
                      <span className="font-medium">{impact.impact.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Consider retaking these courses to improve your GPA
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'].map((grade) => {
              const count = courses.filter(c => c.grade === grade).length;
              const percentage = courses.length > 0 ? (count / courses.length) * 100 : 0;
              
              if (count === 0) return null;
              
              return (
                <div key={grade} className="flex items-center gap-4">
                  <div className="w-12 font-medium">{grade}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-end">
                    <span className="font-bold">{count}</span>
                    <span className="text-sm text-muted-foreground ms-1">
                      ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
