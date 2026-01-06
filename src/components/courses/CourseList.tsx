import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';
import type { Course } from '@/types/types';
import { courseStorage } from '@/lib/storage';
import { GPAEngine } from '@/lib/gpa-engine';
import { useToast } from '@/hooks/use-toast';
import { CourseForm } from './CourseForm';

interface CourseListProps {
  courses: Course[];
  onCoursesChange: () => void;
}

export function CourseList({ courses, onCoursesChange }: CourseListProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [deletingCourse, setDeletingCourse] = useState<Course | undefined>();
  const [formOpen, setFormOpen] = useState(false);

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormOpen(true);
  };

  const handleDelete = () => {
    if (!deletingCourse) return;

    try {
      courseStorage.delete(deletingCourse.id);
      toast({
        title: t('common.success'),
        description: t('message.courseDeleted'),
      });
      onCoursesChange();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'حدث خطأ',
        variant: 'destructive',
      });
    } finally {
      setDeletingCourse(undefined);
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A' || grade === 'A-') return 'bg-success text-success-foreground';
    if (grade === 'B+' || grade === 'B') return 'bg-info text-info-foreground';
    if (grade === 'B-' || grade === 'C+') return 'bg-warning text-warning-foreground';
    if (grade === 'C' || grade === 'D') return 'bg-secondary text-secondary-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>{t('course.noCourses')}</p>
      </div>
    );
  }

  // Group courses by semester
  const semesterMap = new Map<string, Course[]>();
  for (const course of courses) {
    const key = `${course.year}-${course.semester}`;
    if (!semesterMap.has(key)) {
      semesterMap.set(key, []);
    }
    semesterMap.get(key)!.push(course);
  }

  // Sort semesters chronologically
  const sortedSemesters = Array.from(semesterMap.entries()).sort((a, b) => {
    const [yearA, semesterA] = a[0].split('-');
    const [yearB, semesterB] = b[0].split('-');
    
    if (yearA !== yearB) return Number(yearA) - Number(yearB);
    
    const semesterOrder: Record<string, number> = { 'Fall': 1, 'Spring': 2, 'Summer': 3 };
    return (semesterOrder[semesterA] || 0) - (semesterOrder[semesterB] || 0);
  });

  return (
    <>
      <div className="space-y-6">
        {sortedSemesters.map(([key, semesterCourses]) => {
          const [year, semester] = key.split('-');
          const semesterSummary = GPAEngine.calculateSemesterGPA(semesterCourses);
          
          return (
            <Card key={key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {semester} {year}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'المعدل الفصلي' : 'Semester GPA'}:
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {semesterSummary.semesterGPA.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>
                    {language === 'ar' ? 'الساعات' : 'Credits'}: {semesterSummary.totalCredits}
                  </span>
                  <span>•</span>
                  <span>
                    {language === 'ar' ? 'المقررات' : 'Courses'}: {semesterCourses.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('course.code')}</TableHead>
                        <TableHead>{t('course.name')}</TableHead>
                        <TableHead className="text-center">{t('course.credits')}</TableHead>
                        <TableHead className="text-center">{t('course.grade')}</TableHead>
                        <TableHead className="text-end">
                          {language === 'ar' ? 'الإجراءات' : 'Actions'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semesterCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">
                            {course.courseCode}
                            {course.isRetake && (
                              <Badge variant="outline" className="ms-2 text-xs">
                                {t('course.isRetake')}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{course.courseName}</TableCell>
                          <TableCell className="text-center">{course.creditHours}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={getGradeColor(course.grade)}>
                              {course.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-end">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(course)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeletingCourse(course)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CourseForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingCourse(undefined);
        }}
        course={editingCourse}
        onSuccess={onCoursesChange}
      />

      <AlertDialog open={!!deletingCourse} onOpenChange={(open) => !open && setDeletingCourse(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('course.delete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar' 
                ? `هل أنت متأكد من حذف ${deletingCourse?.courseCode}؟ لا يمكن التراجع عن هذا الإجراء.`
                : `Are you sure you want to delete ${deletingCourse?.courseCode}? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
