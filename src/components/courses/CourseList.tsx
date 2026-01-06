import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/hooks/use-toast';
import { CourseForm } from './CourseForm';

interface CourseListProps {
  courses: Course[];
  onCoursesChange: () => void;
}

export function CourseList({ courses, onCoursesChange }: CourseListProps) {
  const { t } = useLanguage();
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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('course.code')}</TableHead>
              <TableHead>{t('course.name')}</TableHead>
              <TableHead className="text-center">{t('course.credits')}</TableHead>
              <TableHead className="text-center">{t('course.grade')}</TableHead>
              <TableHead className="text-center">{t('course.semester')}</TableHead>
              <TableHead className="text-center">{t('course.year')}</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
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
                <TableCell className="text-center">{course.semester}</TableCell>
                <TableCell className="text-center">{course.year}</TableCell>
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
              Are you sure you want to delete {deletingCourse?.courseCode}? This action cannot be undone.
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
