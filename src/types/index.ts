export type UserRole = 'teacher' | 'student' | 'parent'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  school?: string
  grade?: string
  childName?: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData extends Partial<User> {
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  token?: string
}

// ----------------------------------------------------------------------------
// 📚 CBC CURRICULUM TYPES
// ----------------------------------------------------------------------------

export type GradeLevel = 'early-years' | 'lower-primary' | 'upper-primary' | 'junior-secondary' | 'senior-school'

export interface CBCGrade {
  id: string
  name: string
  level: GradeLevel
  ageRange: string
  description: string
}

export interface CBCSubject {
  id: string
  name: string
  gradeLevel: GradeLevel
  description: string
  competencies: string[]
  resources?: string[]
}

export interface CBCTopic {
  id: string
  subjectId: string
  name: string
  description: string
  learningObjectives: string[]
  activities: string[]
  assessmentIdeas: string[]
  resources: string[]
}

export interface CBCCompetency {
  id: string
  name: string
  description: string
  indicators: string[]
}

export type AssessmentBand = 'EE' | 'ME' | 'AE' | 'BE'

export interface AssessmentBandDefinition {
  code: AssessmentBand
  label: string
  range: [number, number]
  color: string
  description: string
}

export interface StudentAssessment {
  studentId: string
  subjectId: string
  topicId: string
  score: number
  total: number
  percentage: number
  band: AssessmentBand
  feedback: string
  date: string
  teacherId: string
}

// ----------------------------------------------------------------------------
// 🤖 AI & GROQ TYPES
// ----------------------------------------------------------------------------

export type AIAction = 'notes' | 'questions' | 'grade' | 'tutor' | 'summarize' | 'translate'

export interface AIRequest {
  action: AIAction
  data: {
    grade?: string
    subject?: string
    topic?: string
    question?: string
    marks?: number
    total?: number
    gradeLevel?: string
    count?: number
    language?: 'en' | 'sw'
    [key: string]: any
  }
}

export interface AIQuestion {
  question: string
  type: 'mcq' | 'short' | 'practical' | 'essay'
  options?: string[]
  answer: string
  explanation: string
  competency: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface AIGeneratedNotes {
  title: string
  grade: string
  subject: string
  topic: string
  objectives: string[]
  keyConcepts: string[]
  activities: string[]
  assessment: string[]
  resources: string[]
  kenyanContext: string[]
  kiswahiliTerms?: Record<string, string>
}

export interface AITutorResponse {
  explanation: string
  kenyanExample: string
  practiceQuestion: {
    question: string
    answer: string
    hint: string
  }
  encouragement: string
  nextSteps: string[]
}

export interface AIGradeAnalysis {
  percentage: number
  band: AssessmentBand
  bandLabel: string
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  parentMessage: string
}

export interface AIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  metadata?: {
    model: string
    tokens: number
    duration: number
  }
}

// ----------------------------------------------------------------------------
// ☁️ CLOUDINARY TYPES
// ----------------------------------------------------------------------------

export interface CloudinaryConfig {
  cloudName: string
  apiKey: string
  apiSecret: string
}

export interface CloudinaryUploadOptions {
  folder: string
  publicId?: string
  transformation?: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'pad' | 'scale' | 'thumb'
    quality?: 'auto' | 'low' | 'good' | 'eco' | 'best'
    format?: 'webp' | 'jpg' | 'png' | 'auto'
    gravity?: 'auto' | 'face' | 'center'
  }
}

export interface CloudinaryUploadResult {
  public_id: string
  url: string
  secure_url: string
  thumbnail_url?: string
  width: number
  height: number
  format: string
  resource_type: 'image' | 'video' | 'raw'
  created_at: string
}

export interface CloudinaryImageProps {
  publicId: string
  alt: string
  width?: number
  height?: number
  crop?: string
  className?: string
  priority?: boolean
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

// ----------------------------------------------------------------------------
// 👥 STUDENT & PROGRESS TYPES
// ----------------------------------------------------------------------------

export interface StudentProfile extends User {
  grade: string
  school: string
  parentEmail: string
  avatar?: string
  enrollmentDate: string
  learningPath: LearningPathItem[]
  achievements: Achievement[]
  preferences: {
    language: 'en' | 'sw' | 'both'
    notifications: boolean
    darkMode: boolean
  }
}

export interface LearningPathItem {
  id: string
  subjectId: string
  topicId: string
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered'
  progress: number
  startedAt?: string
  completedAt?: string
  score?: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
  category: 'academic' | 'participation' | 'consistency' | 'milestone'
}

export interface StudentProgress {
  studentId: string
  subjectId: string
  currentLevel: number
  totalLevels: number
  topicsCompleted: number
  topicsTotal: number
  averageScore: number
  timeSpent: number // in minutes
  lastActive: string
  streak: number // days
}

export interface ProgressChart {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    fill: boolean
  }[]
}

// ----------------------------------------------------------------------------
// 👩‍🏫 TEACHER TYPES
// ----------------------------------------------------------------------------

export interface TeacherProfile extends User {
  school: string
  subjectSpecialties: string[]
  gradesTeaching: string[]
  tscNumber?: string
  avatar?: string
  bio?: string
  preferences: {
    autoGenerateNotes: boolean
    defaultGrade: string
    notificationPreferences: NotificationPrefs
  }
}

export interface LessonPlan {
  id: string
  teacherId: string
  grade: string
  subject: string
  topic: string
  title: string
  objectives: string[]
  materials: string[]
  activities: LessonActivity[]
  assessment: AssessmentPlan
  differentiation: string[]
  createdAt: string
  updatedAt: string
  isShared: boolean
  aiGenerated: boolean
}

export interface LessonActivity {
  id: string
  name: string
  type: 'introduction' | 'main' | 'practice' | 'assessment' | 'closure'
  duration: number // minutes
  description: string
  resources: string[]
  instructions: string[]
}

export interface AssessmentPlan {
  formative: string[]
  summative: string[]
  rubric?: RubricItem[]
}

export interface RubricItem {
  criterion: string
  levels: {
    excellent: string
    proficient: string
    developing: string
    beginning: string
  }
}

export interface ClassRoster {
  classId: string
  teacherId: string
  grade: string
  subject: string
  students: StudentSummary[]
  term: string
  year: number
}

export interface StudentSummary {
  id: string
  name: string
  email: string
  avatar?: string
  currentAverage: number
  attendance: number
  lastSubmission: string
  needsAttention: boolean
}

// ----------------------------------------------------------------------------
// 👨‍👩‍👧 PARENT TYPES
// ----------------------------------------------------------------------------

export interface ParentProfile extends User {
  children: ParentChild[]
  contactPreferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
  language: 'en' | 'sw'
}

export interface ParentChild {
  id: string
  name: string
  grade: string
  school: string
  avatar?: string
  progress: ChildProgressSummary
}

export interface ChildProgressSummary {
  overallAverage: number
  subjects: SubjectProgress[]
  attendance: number
  behavior: 'excellent' | 'good' | 'needs-improvement'
  teacherComments: string[]
  upcomingDeadlines: DeadlineItem[]
}

export interface SubjectProgress {
  subject: string
  average: number
  trend: 'improving' | 'stable' | 'declining'
  lastAssessment: string
}

export interface DeadlineItem {
  title: string
  subject: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
}

export interface ParentFeedback {
  id: string
  parentId: string
  childId: string
  teacherId: string
  message: string
  rating: number // 1-5
  category: 'academic' | 'behavior' | 'general' | 'concern'
  isRead: boolean
  createdAt: string
  response?: TeacherResponse
}

export interface TeacherResponse {
  message: string
  respondedAt: string
  teacherName: string
}

// ----------------------------------------------------------------------------
// ♟️ CHESS GAME TYPES
// ----------------------------------------------------------------------------

export type ChessColor = 'white' | 'black'
export type ChessPieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
export type ChessSquare = string

export interface ChessMove {
  from: ChessSquare
  to: ChessSquare
  promotion?: ChessPieceType
  captured?: ChessPieceType
  isCheck: boolean
  isCheckmate: boolean
  isStalemate: boolean
  notation: string
}

export interface ChessGameState {
  fen: string
  turn: ChessColor
  moves: ChessMove[]
  isGameOver: boolean
  result?: '1-0' | '0-1' | '1/2-1/2'
  history: ChessMove[]
}

export interface ChessPuzzle {
  id: string
  fen: string
  solution: ChessMove[]
  difficulty: 'easy' | 'medium' | 'hard'
  theme: string
  rating: number
}

export interface ChessStats {
  gamesPlayed: number
  wins: number
  losses: number
  draws: number
  averageMoveTime: number
  bestStreak: number
  puzzlesSolved: number
}

// ----------------------------------------------------------------------------
// 📊 ANALYTICS & REPORTS TYPES
// ----------------------------------------------------------------------------

export interface AnalyticsData {
  period: 'daily' | 'weekly' | 'monthly' | 'term'
  startDate: string
  endDate: string
  metrics: {
    totalUsers: number
    activeUsers: number
    lessonsCompleted: number
    quizzesTaken: number
    averageScore: number
    engagementTime: number
  }
  trends: {
    userGrowth: number[]
    engagementTrend: number[]
    performanceTrend: number[]
  }
  topPerformers: UserPerformance[]
  areasForImprovement: ImprovementArea[]
}

export interface UserPerformance {
  userId: string
  name: string
  role: UserRole
  averageScore: number
  completionRate: number
  engagementScore: number
}

export interface ImprovementArea {
  subject: string
  topic: string
  averageScore: number
  recommendation: string
  resources: string[]
}

export interface ReportConfig {
  type: 'student' | 'class' | 'school' | 'system'
  format: 'pdf' | 'csv' | 'json'
  includeCharts: boolean
  includeRecommendations: boolean
  dateRange: {
    start: string
    end: string
  }
}

// ----------------------------------------------------------------------------
// 🔔 NOTIFICATIONS & MESSAGING TYPES
// ----------------------------------------------------------------------------

export interface Notification {
  id: string
  userId: string
  type: 'system' | 'academic' | 'social' | 'reminder'
  title: string
  message: string
  icon: string
  priority: 'low' | 'medium' | 'high'
  isRead: boolean
  createdAt: string
  actionUrl?: string
  actionLabel?: string
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  subject: string
  content: string
  attachments?: MessageAttachment[]
  isRead: boolean
  createdAt: string
  threadId?: string
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  type: 'image' | 'document' | 'video'
  size: number
}

export interface NotificationPrefs {
  email: boolean
  push: boolean
  sms: boolean
  academic: boolean
  social: boolean
  system: boolean
  quietHours?: {
    start: string
    end: string
  }
}

// ----------------------------------------------------------------------------
// 🎮 GAMIFICATION TYPES
// ----------------------------------------------------------------------------

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  criteria: BadgeCriteria
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
}

export interface BadgeCriteria {
  type: 'lessons_completed' | 'quizzes_passed' | 'streak' | 'score' | 'participation'
  threshold: number
  subject?: string
  grade?: string
}

export interface UserBadge {
  badgeId: string
  userId: string
  earnedAt: string
  progress: number
  isClaimed: boolean
}

export interface Points {
  total: number
  academic: number
  participation: number
  consistency: number
  milestone: number
  lastUpdated: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  avatar?: string
  points: number
  badges: number
  grade: string
}

// ----------------------------------------------------------------------------
// 🌐 API & HTTP TYPES
// ----------------------------------------------------------------------------

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface SearchParams {
  query: string
  filters?: Record<string, any>
  fields?: string[]
}

// ----------------------------------------------------------------------------
// 🎨 UI & COMPONENT TYPES
// ----------------------------------------------------------------------------

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
  pagination?: PaginationState
}

export interface ColumnDef<T> {
  key: keyof T | string
  label: string
  render?: (value: any, item: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
}

export interface PaginationState {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

// ----------------------------------------------------------------------------
// ⚙️ UTILITY TYPES
// ----------------------------------------------------------------------------

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type PromiseValue<T> = T extends Promise<infer U> ? U : T

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type ValueOf<T> = T[keyof T]

export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

// ----------------------------------------------------------------------------
// 🔄 EVENT & CALLBACK TYPES
// ----------------------------------------------------------------------------

export type EventHandler<T = any> = (data: T) => void | Promise<void>

export interface EventPayload {
  type: string
  payload: any
  timestamp: string
  userId?: string
}

export interface WebSocketMessage {
  event: string
  data: any
  roomId?: string
}

// ----------------------------------------------------------------------------
// 🌍 LOCALIZATION TYPES
// ----------------------------------------------------------------------------

export type Language = 'en' | 'sw' | 'both'

export interface Translation {
  [key: string]: string | Translation
}

export interface Locale {
  code: Language
  name: string
  direction: 'ltr' | 'rtl'
  dateFormat: string
  timeFormat: string
  numberFormat: string
}

// ----------------------------------------------------------------------------
// 🔐 SECURITY & PERMISSIONS TYPES
// ----------------------------------------------------------------------------

export type Permission = 
  | 'read:own'
  | 'write:own'
  | 'delete:own'
  | 'read:class'
  | 'write:class'
  | 'read:school'
  | 'write:school'
  | 'admin:all'

export interface RolePermissions {
  [role: string]: Permission[]
}

export interface AccessControl {
  resource: string
  action: 'create' | 'read' | 'update' | 'delete'
  conditions?: Record<string, any>
}

// ----------------------------------------------------------------------------
// 📱 MOBILE & RESPONSIVE TYPES
// ----------------------------------------------------------------------------

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface ResponsiveValue<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  orientation: 'portrait' | 'landscape'
}