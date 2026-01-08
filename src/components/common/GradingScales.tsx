import { useLanguage } from '@/contexts/LanguageContext';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_UNIVERSITY, UNIVERSITIES } from '@/lib/university-rules';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, Scale } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export function GradingScales() {
    const { language } = useLanguage();
    const [selectedUniId, setSelectedUniId] = useState(DEFAULT_UNIVERSITY.id);

    const selectedUniversity = UNIVERSITIES.find(u => u.id === selectedUniId) || DEFAULT_UNIVERSITY;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Scale className="h-5 w-5 text-primary" />
                        {language === 'ar' ? 'نظام التقديرات' : 'Grading System'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {language === 'ar'
                            ? 'عرض القواعد المستخدمة لحساب المعدل والتقديرات'
                            : 'View the rules used for calculating GPA and classifications'}
                    </p>
                </div>

                {/* Select University System */}
                <div className="w-full sm:w-[280px]">
                    <Select value={selectedUniId} onValueChange={setSelectedUniId}>
                        <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'اختر النظام' : 'Select System'} />
                        </SelectTrigger>
                        <SelectContent>
                            {UNIVERSITIES.map(uni => (
                                <SelectItem key={uni.id} value={uni.id}>
                                    {language === 'ar' ? uni.nameAr : uni.nameEn}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Tabs defaultValue="grades" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grades" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        {language === 'ar' ? 'الدرجات والنقاط' : 'Grades & Points'}
                    </TabsTrigger>
                    <TabsTrigger value="classifications" className="gap-2">
                        <GraduationCap className="h-4 w-4" />
                        {language === 'ar' ? 'التقديرات العامة' : 'Classifications'}
                    </TabsTrigger>
                </TabsList>

                {/* Grade Rules Tab */}
                <TabsContent value="grades" className="mt-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                {language === 'ar' ? selectedUniversity.nameAr : selectedUniversity.nameEn}
                            </CardTitle>
                            <CardDescription>
                                {language === 'ar' ? 'جدول تحويل النسب المئوية إلى نقاط' : 'Percentage to Grade Point conversion table'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="text-center">{language === 'ar' ? 'الرمز' : 'Symbol'}</TableHead>
                                            <TableHead className="text-center">{language === 'ar' ? 'النقاط' : 'Points'}</TableHead>
                                            <TableHead className="text-center">{language === 'ar' ? 'النسبة المئوية' : 'Percentage'}</TableHead>
                                            <TableHead className="text-center">{language === 'ar' ? 'التقدير' : 'Description'}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedUniversity.gradeRules.map((rule, idx) => (
                                            <TableRow key={idx} className="hover:bg-muted/50">
                                                <TableCell className="font-bold text-center text-primary">{rule.symbol}</TableCell>
                                                <TableCell className="text-center font-mono">{rule.points.toFixed(1)}</TableCell>
                                                <TableCell className="text-center font-mono text-muted-foreground">
                                                    {rule.minPercentage}% - {rule.maxPercentage}%
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant={rule.points >= 2.0 ? 'default' : 'destructive'} className="font-normal min-w-[80px] justify-center">
                                                        {language === 'ar' ? rule.nameAr : rule.nameEn}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Classification Rules Tab */}
                <TabsContent value="classifications" className="mt-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                {language === 'ar' ? selectedUniversity.nameAr : selectedUniversity.nameEn}
                            </CardTitle>
                            <CardDescription>
                                {language === 'ar' ? 'قواعد التقدير العام للمعدل التراكمي' : 'Cumulative GPA Classification Rules'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="text-center">{language === 'ar' ? 'المعدل من' : 'GPA From'}</TableHead>
                                            <TableHead className="text-center">{language === 'ar' ? 'إلى' : 'To'}</TableHead>
                                            <TableHead className="text-center">{language === 'ar' ? 'التقدير' : 'Classification'}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedUniversity.classificationRules.map((rule, idx) => (
                                            <TableRow key={idx} className="hover:bg-muted/50">
                                                <TableCell className="text-center font-mono">{rule.minGPA.toFixed(2)}</TableCell>
                                                <TableCell className="text-center font-mono">
                                                    {rule.maxGPA ? rule.maxGPA.toFixed(2) : '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant={
                                                        rule.classification === 'excellent' || rule.classification === 'very_good' ? 'default' :
                                                            rule.classification === 'fail' ? 'destructive' : 'secondary'
                                                    } className="font-normal min-w-[100px] justify-center text-sm py-1">
                                                        {language === 'ar' ? rule.nameAr : rule.nameEn}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
