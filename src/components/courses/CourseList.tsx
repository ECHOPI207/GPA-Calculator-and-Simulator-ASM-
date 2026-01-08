import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { GPAEngine } from '@/lib/gpa-engine';
import { courseStorage } from '@/lib/storage';
import type { Course } from '@/types/types';
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
  const [deletingSemester, setDeletingSemester] = useState<string | undefined>();
  const [editingSemester, setEditingSemester] = useState<string | undefined>();
  const [editSemesterYear, setEditSemesterYear] = useState<string>('');
  const [editSemesterTerm, setEditSemesterTerm] = useState<string>('');
  const [formOpen, setFormOpen] = useState(false);

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormOpen(true);
  };

  const openEditSemesterDialog = (semesterKey: string) => {
    const [yearStr, term] = semesterKey.split('-');
    setEditingSemester(semesterKey);
    setEditSemesterYear(yearStr);
    setEditSemesterTerm(term);
  };

  const handleUpdateSemester = () => {
    if (!editingSemester) return;

    const [oldYearStr, oldTerm] = editingSemester.split('-');
    const oldYear = Number(oldYearStr);

    const semesterCourses = courses.filter(c => c.year === oldYear && c.semester === oldTerm);
    const idsToUpdate = semesterCourses.map(c => c.id);

    const newYear = Number(editSemesterYear);

    if (idsToUpdate.length > 0) {
      courseStorage.updateMany(idsToUpdate, {
        year: newYear,
        semester: editSemesterTerm
      });

      toast({
        title: t('common.success'),
        description: language === 'ar' ? 'تم تحديث الفصل الدراسي بنجاح' : 'Semester updated successfully',
      });
      onCoursesChange();
    }

    setEditingSemester(undefined);
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

  const handleDeleteSemester = () => {
    if (!deletingSemester) return;

    const [yearStr, semester] = deletingSemester.split('-');
    const year = Number(yearStr);

    const semesterCourses = courses.filter(c => c.year === year && c.semester === semester);
    const idsToDelete = semesterCourses.map(c => c.id);

    try {
      courseStorage.deleteMany(idsToDelete);
      toast({
        title: t('common.success'),
        description: language === 'ar' ? 'تم حذف الفصل الدراسي بنجاح' : 'Semester deleted successfully',
      });
      onCoursesChange();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'حدث خطأ',
        variant: 'destructive',
      });
    } finally {
      setDeletingSemester(undefined);
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
                    {semester} {year}/{Number(year) + 1}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'المعدل الفصلي' : 'Semester GPA'}:
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {semesterSummary.semesterGPA.toFixed(2)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditSemesterDialog(key)}
                      title={language === 'ar' ? 'تعديل الفصل الدراسي' : 'Edit Semester'}
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeletingSemester(key)}
                      title={language === 'ar' ? 'حذف الفصل الدراسي' : 'Delete Semester'}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
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
                        <TableHead className="text-center">{language === 'ar' ? 'النقاط' : 'Points'}</TableHead>
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
                            {course.isZeroCredit && (
                              <Badge variant="secondary" className="ms-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                                {language === 'ar' ? '0 س.م' : '0 CH'}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{course.courseName}</TableCell>
                          <TableCell className="text-center">{course.creditHours}</TableCell>
                          <TableCell className="text-center">
                            {(course.gradePoints * course.creditHours).toFixed(2)}
                          </TableCell>
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

      <Dialog open={!!editingSemester} onOpenChange={(open) => !open && setEditingSemester(undefined)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{language === 'ar' ? 'تعديل الفصل الدراسي' : 'Edit Semester'}</DialogTitle>
            <DialogDescription>
              {language === 'ar'
                ? 'قم بتعديل السنة الدراسية والفصل لجميع المواد في هذا الفصل.'
                : 'Update the academic year and term for all courses in this semester.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-end">
                {language === 'ar' ? 'السنة' : 'Year'}
              </Label>
              <Input
                id="year"
                type="number"
                value={editSemesterYear}
                onChange={(e) => setEditSemesterYear(e.target.value)}
                className="col-span-3"
                placeholder="YYYY"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="term" className="text-end">
                {language === 'ar' ? 'الفصل' : 'Term'}
              </Label>
              <Select value={editSemesterTerm} onValueChange={setEditSemesterTerm}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall">{language === 'ar' ? 'الخريف (Fall)' : 'Fall'}</SelectItem>
                  <SelectItem value="Spring">{language === 'ar' ? 'الربيع (Spring)' : 'Spring'}</SelectItem>
                  <SelectItem value="Summer">{language === 'ar' ? 'الصيف (Summer)' : 'Summer'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateSemester}>{language === 'ar' ? 'حفظ' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

      <AlertDialog open={!!deletingSemester} onOpenChange={(open) => !open && setDeletingSemester(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{language === 'ar' ? 'حذف الفصل الدراسي' : 'Delete Semester'}</AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar'
                ? 'هل أنت متأكد من حذف هذا الفصل الدراسي بالكامل؟ سيتم حذف جميع المواد المسجلة في هذا الفصل. لا يمكن التراجع عن هذا الإجراء.'
                : 'Are you sure you want to delete this entire semester? All courses in this semester will be deleted. This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSemester} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
