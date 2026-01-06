import { supabase } from './supabase';
import type { Profile, University, Course, Scenario } from '@/types/types';

// Profile API
export const profileApi = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }
};

// University API
export const universityApi = {
  async getUniversities(): Promise<University[]> {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .order('name_en');
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getUniversity(id: string): Promise<University | null> {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

// Course API
export const courseApi = {
  async getCourses(userId: string): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('user_id', userId)
      .order('year', { ascending: true })
      .order('semester', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getCourse(id: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        user_id: course.userId,
        university_id: course.universityId,
        course_code: course.courseCode,
        course_name: course.courseName,
        credit_hours: course.creditHours,
        grade: course.grade,
        grade_points: course.gradePoints,
        semester: course.semester,
        year: course.year,
        is_retake: course.isRetake,
        original_course_id: course.originalCourseId || null
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    const updateData: Record<string, unknown> = {};
    
    if (updates.courseCode !== undefined) updateData.course_code = updates.courseCode;
    if (updates.courseName !== undefined) updateData.course_name = updates.courseName;
    if (updates.creditHours !== undefined) updateData.credit_hours = updates.creditHours;
    if (updates.grade !== undefined) updateData.grade = updates.grade;
    if (updates.gradePoints !== undefined) updateData.grade_points = updates.gradePoints;
    if (updates.semester !== undefined) updateData.semester = updates.semester;
    if (updates.year !== undefined) updateData.year = updates.year;
    if (updates.isRetake !== undefined) updateData.is_retake = updates.isRetake;
    if (updates.originalCourseId !== undefined) updateData.original_course_id = updates.originalCourseId;
    
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteCourse(id: string): Promise<void> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Scenario API
export const scenarioApi = {
  async getScenarios(userId: string): Promise<Scenario[]> {
    const { data, error } = await supabase
      .from('scenarios')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getScenario(id: string): Promise<Scenario | null> {
    const { data, error } = await supabase
      .from('scenarios')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async createScenario(scenario: Omit<Scenario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Scenario> {
    const { data, error } = await supabase
      .from('scenarios')
      .insert({
        user_id: scenario.userId,
        name: scenario.name,
        description: scenario.description || null,
        courses: scenario.courses,
        predicted_gpa: scenario.predictedGPA
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateScenario(id: string, updates: Partial<Scenario>): Promise<Scenario> {
    const updateData: Record<string, unknown> = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.courses !== undefined) updateData.courses = updates.courses;
    if (updates.predictedGPA !== undefined) updateData.predicted_gpa = updates.predictedGPA;
    
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('scenarios')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteScenario(id: string): Promise<void> {
    const { error } = await supabase
      .from('scenarios')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
