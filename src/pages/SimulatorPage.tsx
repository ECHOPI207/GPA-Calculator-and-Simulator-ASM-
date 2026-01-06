import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { courseApi } from '@/db/api';
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, ScenarioCourse, GradeSymbol } from '@/types/types';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const GRADE_OPTIONS: GradeSymbol[] = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];

export default function SimulatorPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [scenarioCourses, setScenarioCourses] = useState<ScenarioCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentGPA, setCurrentGPA] = useState(0);

  useEffect(() => {
    loadCourses();
  }, [user]);

  const loadCourses = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const coursesData = await courseApi.getCourses(user.id);
      setCourses(coursesData);
      
      if (coursesData.length > 0) {
        const calculation = GPAEngine.calculateGPA(coursesData);
        setCurrentGPA(calculation.cumulativeGPA);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addScenarioCourse = () => {
    setScenarioCourses([
      ...scenarioCourses,
      {
        courseCode: '',
        courseName: '',
        creditHours: 3,
        expectedGrade: 'A'
      }
    ]);
  };

  const updateScenarioCourse = (index: number, updates: Partial<ScenarioCourse>) => {
    const updated = [...scenarioCourses];
    updated[index] = { ...updated[index], ...updates };
    setScenarioCourses(updated);
  };

  const removeScenarioCourse = (index: number) => {
    setScenarioCourses(scenarioCourses.filter((_, i) => i !== index));
  };

  const prediction = scenarioCourses.length > 0
    ? GPAEngine.predictGPA(courses, scenarioCourses)
    : null;

  const gpaChange = prediction ? prediction.realisticCase - currentGPA : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 bg-muted" />
        <Skeleton className="h-96 bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('simulator.title')}</h1>
        <p className="text-muted-foreground mt-2">
          Predict your future GPA based on expected grades
        </p>
      </div>

      {/* Current GPA */}
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current GPA</div>
              <div className="text-3xl font-bold text-primary">{currentGPA.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Completed Hours</div>
              <div className="text-3xl font-bold">
                {courses.reduce((sum, c) => sum + c.creditHours, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Courses</div>
              <div className="text-3xl font-bold">{courses.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Builder */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Future Courses</CardTitle>
            <Button onClick={addScenarioCourse} size="sm">
              <Plus className="h-4 w-4 me-2" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {scenarioCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Add courses to simulate your future GPA</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scenarioCourses.map((course, index) => (
                <div key={index} className="flex gap-4 items-end p-4 border border-border rounded-lg">
                  <div className="flex-1 grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Course Code</Label>
                      <Input
                        value={course.courseCode}
                        onChange={(e) => updateScenarioCourse(index, { courseCode: e.target.value })}
                        placeholder="CS201"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Course Name</Label>
                      <Input
                        value={course.courseName}
                        onChange={(e) => updateScenarioCourse(index, { courseName: e.target.value })}
                        placeholder="Data Structures"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Credit Hours</Label>
                      <Input
                        type="number"
                        min="1"
                        max="6"
                        value={course.creditHours}
                        onChange={(e) => updateScenarioCourse(index, { creditHours: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Grade</Label>
                      <Select
                        value={course.expectedGrade}
                        onValueChange={(value) => updateScenarioCourse(index, { expectedGrade: value as GradeSymbol })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeScenarioCourse(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle>Predicted Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Best Case (All A)</div>
                <div className="text-3xl font-bold text-success">{prediction.bestCase.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  +{(prediction.bestCase - currentGPA).toFixed(2)} from current
                </div>
              </div>
              <div className="p-4 border-2 border-primary rounded-lg bg-accent/50">
                <div className="text-sm text-muted-foreground mb-2">Realistic Case</div>
                <div className="text-3xl font-bold text-primary">{prediction.realisticCase.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-1">
                  {gpaChange > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">+{gpaChange.toFixed(2)}</span>
                    </>
                  ) : gpaChange < 0 ? (
                    <>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-destructive">{gpaChange.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">No change</span>
                  )}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Worst Case (All D)</div>
                <div className="text-3xl font-bold text-warning">{prediction.worstCase.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {(prediction.worstCase - currentGPA).toFixed(2)} from current
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">Additional Credits</div>
              <div className="text-2xl font-bold">{prediction.remainingCredits} hours</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
