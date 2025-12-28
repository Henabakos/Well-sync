
export enum UserRole {
  FREE = 'free',
  PREMIUM = 'premium',
  ADMIN = 'admin'
}

export enum GoalType {
  WEIGHT_LOSS = 'weight_loss',
  FITNESS = 'fitness',
  MENTAL_WELLNESS = 'mental_wellness',
  NUTRITION = 'nutrition'
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active'
}

export interface DailyCheckin {
  id: string;
  date: string;
  mood: number; // 1-5
  energy: number; // 1-5
  waterLiters: number;
  completed: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  sleepHours: number;
  stressLevel: number;
  wellnessPriorities: string[];
  dietaryRestrictions: string[];
  bmi: number;
  tdee: number;
}

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export interface ProgressEntry {
  id: string;
  userId: string;
  goalId?: string;
  date: string;
  metricType: string;
  valueNumeric: number;
  source: 'manual' | 'wearable';
  createdAt: string;
}

export interface Recommendation {
  id: string;
  type: 'nutrition' | 'fitness' | 'mental_wellness';
  content: string;
  confidenceScore: number;
  explanation: string;
  actionItems: string[];
  rating?: number;
  feedback?: string;
}

export interface Meal {
  id: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

export interface CommunityReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  type: 'tip' | 'milestone' | 'question';
  likes: number;
  dislikes: number;
  replies: CommunityReply[];
  timestamp: string;
}
