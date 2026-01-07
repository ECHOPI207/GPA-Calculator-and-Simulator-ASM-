import ExcelJS from 'exceljs';
import { Course } from '@/types/types';
import { GPAEngine } from './gpa-engine';
import { AcademicAnalyzer } from './academic-analyzer';

export async function generateExcelReport(courses: Course[], language: string) {
    const isAr = language === 'ar';
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Echo-π Academic Platform';
    workbook.created = new Date();

    const sheetName = isAr ? 'تقرير الأداء الشامل' : 'Comprehensive Performance Report';
    const worksheet = workbook.addWorksheet(sheetName, {
        views: [{ rightToLeft: isAr, showGridLines: false }]
    });

    // --- ANALYTICS ---
    const calculation = GPAEngine.calculateGPA(courses);
    const analysis = AcademicAnalyzer.analyze(courses, calculation);

    // --- STYLING CONSTANTS ---
    const colors = {
        primary: 'FF2563EB', // Blue-600
        secondary: 'FF475569', // Slate-600
        accent: 'FF0EA5E9', // Sky-500
        success: 'FF16A34A', // Green-600
        warning: 'FFCA8A04', // Yellow-600
        danger: 'FFDC2626', // Red-600
        lightBg: 'FFF8FAFC', // Slate-50
        headerBg: 'FFF1F5F9', // Slate-100
        border: 'FFCBD5E1', // Slate-300
        white: 'FFFFFFFF',
        text: 'FF0F172A' // Slate-900
    };

    // --- COLUMNS SETUP ---
    worksheet.columns = [
        { key: 'col1', width: 20 },
        { key: 'col2', width: 20 },
        { key: 'col3', width: 20 },
        { key: 'col4', width: 15 },
        { key: 'col5', width: 15 },
        { key: 'col6', width: 15 },
        { key: 'col7', width: 15 },
    ];

    let currentRow = 1;

    // --- HEADER SECTION ---
    const titleRow = worksheet.getRow(currentRow++);
    titleRow.getCell(1).value = 'Echo-π Academic Analytics';
    titleRow.getCell(1).font = { name: 'Arial', size: 18, bold: true, color: { argb: colors.primary } };
    titleRow.getCell(1).alignment = { horizontal: 'center' };
    worksheet.mergeCells(`A${currentRow-1}:G${currentRow-1}`);

    const subtitleRow = worksheet.getRow(currentRow++);
    subtitleRow.getCell(1).value = isAr ? 'وثيقة تحليل الأداء الأكاديمي المتقدم' : 'Advanced Academic Performance Analysis Document';
    subtitleRow.getCell(1).font = { name: 'Arial', size: 14, bold: true, color: { argb: colors.secondary } };
    subtitleRow.getCell(1).alignment = { horizontal: 'center' };
    worksheet.mergeCells(`A${currentRow-1}:G${currentRow-1}`);

    const dateRow = worksheet.getRow(currentRow++);
    const dateStr = new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { dateStyle: 'full' });
    dateRow.getCell(1).value = dateStr;
    dateRow.getCell(1).font = { name: 'Arial', size: 10, italic: true, color: { argb: colors.secondary } };
    dateRow.getCell(1).alignment = { horizontal: 'center' };
    worksheet.mergeCells(`A${currentRow-1}:G${currentRow-1}`);

    currentRow++; // Spacer

    // --- 1. ENHANCED ACADEMIC OVERVIEW ---
    addSectionHeader(worksheet, currentRow++, isAr ? '1. نظرة عامة شاملة' : '1. Enhanced Academic Overview', colors);
    
    const overviewLabels = isAr 
        ? ['المعدل التراكمي', 'التصنيف الأكاديمي', 'اتجاه الأداء', 'كفاءة الساعات', 'مؤشر التقلب']
        : ['Cumulative GPA', 'Academic Standing', 'Performance Trend', 'Credit Efficiency', 'Volatility Index'];
    
    const overviewValues = [
        calculation.cumulativeGPA.toFixed(2),
        analysis.overview.standing,
        analysis.overview.trend === 'improving' ? '↗ Increasing' : analysis.overview.trend === 'declining' ? '↘ Declining' : '→ Stable',
        `${analysis.overview.efficiency.toFixed(1)}%`,
        analysis.overview.volatility.toFixed(3)
    ];

    // Better Layout: Grid
    // Row 1: GPA (Large), Standing
    // Row 2: Trend, Efficiency, Volatility
    currentRow--; // Reset to rewrite
    
    // GPA Box
    worksheet.mergeCells(`A${currentRow}:B${currentRow+1}`);
    const gpaCell = worksheet.getCell(`A${currentRow}`);
    gpaCell.value = calculation.cumulativeGPA.toFixed(2);
    gpaCell.font = { size: 24, bold: true, color: { argb: colors.primary } };
    gpaCell.alignment = { horizontal: 'center', vertical: 'middle' };
    gpaCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
    gpaCell.border = { top: {style:'thin', color: {argb: colors.border}}, bottom: {style:'thin', color: {argb: colors.border}}, left: {style:'thin', color: {argb: colors.border}}, right: {style:'thin', color: {argb: colors.border}} };

    // Standing
    worksheet.mergeCells(`C${currentRow}:G${currentRow}`);
    const standingCell = worksheet.getCell(`C${currentRow}`);
    standingCell.value = analysis.overview.standing;
    standingCell.font = { size: 14, bold: true, color: { argb: colors.text } };
    standingCell.alignment = { horizontal: 'center', vertical: 'middle' };
    
    currentRow++;
    // Sub-metrics
    worksheet.getCell(`C${currentRow}`).value = overviewLabels[2]; // Trend
    worksheet.getCell(`D${currentRow}`).value = overviewValues[2];
    worksheet.getCell(`E${currentRow}`).value = overviewLabels[3]; // Efficiency
    worksheet.getCell(`F${currentRow}`).value = overviewValues[3];
    // Last one
    worksheet.getCell(`G${currentRow}`).value = overviewValues[4];
    
    // Style sub-metrics
    [`C${currentRow}`, `E${currentRow}`].forEach(ref => {
        worksheet.getCell(ref).font = { bold: true, color: { argb: colors.secondary } };
    });
    [`D${currentRow}`, `F${currentRow}`, `G${currentRow}`].forEach(ref => {
        worksheet.getCell(ref).font = { bold: true, color: { argb: colors.text } };
    });

    currentRow += 2;

    // --- 2. STATISTICAL INDICATORS & 3. RISK ---
    addSectionHeader(worksheet, currentRow++, isAr ? '2. المؤشرات الإحصائية وتقييم المخاطر' : '2. Statistical Indicators & Risk Assessment', colors);
    
    // Risk Level
    const riskRow = worksheet.getRow(currentRow++);
    riskRow.getCell(1).value = isAr ? 'مستوى الخطر الأكاديمي:' : 'Academic Risk Level:';
    riskRow.getCell(1).font = { bold: true };
    const riskCell = riskRow.getCell(2);
    riskCell.value = analysis.risk.level.toUpperCase();
    riskCell.font = { bold: true, color: { argb: analysis.risk.level === 'low' ? colors.success : analysis.risk.level === 'critical' ? colors.danger : colors.warning } };

    // Grade Distribution (Mini Table)
    const distRow = worksheet.getRow(currentRow++);
    distRow.getCell(1).value = isAr ? 'توزيع التقديرات:' : 'Grade Distribution:';
    distRow.getCell(1).font = { bold: true };
    
    let distCol = 2;
    Object.entries(analysis.statistics.gradeDistribution).forEach(([grade, count]) => {
        if(distCol > 7) return;
        worksheet.getCell(currentRow-1, distCol).value = `${grade}: ${count}`;
        worksheet.getCell(currentRow-1, distCol).alignment = { horizontal: 'center' };
        worksheet.getCell(currentRow-1, distCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
        distCol++;
    });

    currentRow++;

    // --- 4. STRATEGY & ROADMAP ---
    addSectionHeader(worksheet, currentRow++, isAr ? '3. الاستراتيجية وخارطة الطريق' : '3. Strategy & Roadmap', colors);
    
    const strategyRow = worksheet.getRow(currentRow++);
    strategyRow.getCell(1).value = isAr ? 'نمط التعلم:' : 'Learning Style:';
    strategyRow.getCell(1).font = { bold: true };
    strategyRow.getCell(2).value = analysis.strategy.learningStyle;
    worksheet.mergeCells(`B${currentRow-1}:D${currentRow-1}`);

    const focusRow = worksheet.getRow(currentRow++);
    focusRow.getCell(1).value = isAr ? 'مجالات التركيز:' : 'Focus Areas:';
    focusRow.getCell(1).font = { bold: true };
    focusRow.getCell(2).value = analysis.strategy.focusAreas.join(', ');
    worksheet.mergeCells(`B${currentRow-1}:G${currentRow-1}`);

    currentRow++;

    // --- 5. COURSE DISTRIBUTION BY SEMESTER ---
    addSectionHeader(worksheet, currentRow++, isAr ? '4. السجل الأكاديمي الفصلي' : '4. Semester-wise Academic Record', colors);

    const tableHeaders = isAr 
        ? ['رمز المقرر', 'اسم المقرر', 'الساعات', 'التقدير', 'النقاط', 'التأثير', 'ملاحظات']
        : ['Code', 'Course Name', 'Credits', 'Grade', 'Points', 'Impact', 'Notes'];

    // Iterate Semesters
    analysis.semesters.forEach(semester => {
        // Semester Header
        const semHeaderRow = worksheet.getRow(currentRow++);
        const semTitle = isAr 
            ? `${semester.year} - ${semester.semester === 'Fall' ? 'خريف' : semester.semester === 'Spring' ? 'ربيع' : 'صيف'}`
            : `${semester.semester} ${semester.year}`;
        
        semHeaderRow.getCell(1).value = semTitle;
        semHeaderRow.getCell(1).font = { bold: true, size: 12, color: { argb: colors.white } };
        semHeaderRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondary } };
        
        // Semester Summary in Header
        const semSummary = isAr 
            ? `المعدل الفصلي: ${semester.semesterGPA.toFixed(2)} | التراكمي: ${semester.cumulativeGPA.toFixed(2)}`
            : `Sem GPA: ${semester.semesterGPA.toFixed(2)} | Cum GPA: ${semester.cumulativeGPA.toFixed(2)}`;
        
        semHeaderRow.getCell(4).value = semSummary;
        semHeaderRow.getCell(4).font = { bold: true, color: { argb: colors.white } };
        semHeaderRow.getCell(4).alignment = { horizontal: 'right' };
        
        worksheet.mergeCells(`A${currentRow-1}:C${currentRow-1}`);
        worksheet.mergeCells(`D${currentRow-1}:G${currentRow-1}`);
        semHeaderRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondary } };

        // Table Headers
        const headerRow = worksheet.getRow(currentRow++);
        tableHeaders.forEach((text, idx) => {
            const cell = headerRow.getCell(idx + 1);
            cell.value = text;
            cell.font = { bold: true, size: 10, color: { argb: colors.secondary } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } }; // Slate-200
            cell.border = { bottom: { style: 'thin', color: { argb: colors.border } } };
            cell.alignment = { horizontal: 'center' };
        });

        // Courses
        semester.courses.forEach(course => {
            const row = worksheet.getRow(currentRow++);
            row.getCell(1).value = course.courseCode;
            row.getCell(2).value = course.courseName;
            row.getCell(3).value = course.creditHours;
            row.getCell(4).value = course.grade;
            row.getCell(5).value = course.gradePoints;
            
            // Impact/Notes logic
            let impact = '-';
            let notes = '';
            
            if (course.gradePoints >= 3.5) { impact = 'High'; notes = 'Excellent'; }
            else if (course.gradePoints < 2.0) { impact = 'Neg'; notes = 'Review'; }
            
            row.getCell(6).value = impact;
            row.getCell(7).value = notes;

            // Styling
            row.eachCell((cell, colNumber) => {
                cell.border = { bottom: { style: 'dotted', color: { argb: colors.border } } };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                if (colNumber === 2) cell.alignment = { vertical: 'middle', horizontal: isAr ? 'right' : 'left' };
            });

            // Color Grade
            const gradeCell = row.getCell(4);
            if (['A', 'A-'].includes(course.grade)) gradeCell.font = { color: { argb: colors.success }, bold: true };
            else if (['D', 'F'].includes(course.grade)) gradeCell.font = { color: { argb: colors.danger }, bold: true };
        });
        
        currentRow++; // Spacer between semesters
    });

    // --- FOOTER / ADVISORY ---
    currentRow++;
    const footerRow = worksheet.getRow(currentRow++);
    footerRow.getCell(1).value = isAr 
        ? 'ملاحظة: هذا التقرير تم إنشاؤه آلياً للمساعدة في التخطيط الأكاديمي ولا يعتبر وثيقة رسمية.'
        : 'Note: This report is auto-generated for academic planning purposes and is not an official transcript.';
    footerRow.getCell(1).font = { italic: true, size: 9, color: { argb: colors.secondary } };
    worksheet.mergeCells(`A${currentRow-1}:G${currentRow-1}`);

    // Generate Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

function addSectionHeader(worksheet: ExcelJS.Worksheet, rowIdx: number, title: string, colors: any) {
    const row = worksheet.getRow(rowIdx);
    row.getCell(1).value = title;
    row.getCell(1).font = { bold: true, size: 12, color: { argb: colors.primary } };
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } }; // Blue-100
    worksheet.mergeCells(`A${rowIdx}:G${rowIdx}`);
    row.getCell(1).border = { bottom: { style: 'medium', color: { argb: colors.primary } } };
}
