import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const demoAccounts: Record<string, User & { password: string }> = {
    'teacher@gmail.com': {
      id: 'demo-t', email: 'teacher@gmail.com', password: 'teacher123',
      name: 'Jane Mwangi', role: 'teacher', school: 'Nairobi Primary',
      avatar: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_100,h_100,c_thumb/teachers/demo.jpg`
    },
    'student@gmail.com': {
      id: 'demo-s', email: 'student@gmail.com', password: 'student123',
      name: 'Brian Otieno', role: 'student', grade: '7',
      avatar: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_100,h_100,c_thumb/students/demo.jpg`
    },
    'parent@gmail.com': {
      id: 'demo-p', email: 'parent@gmail.com', password: 'parent123',
      name: 'Grace Akinyi', role: 'parent', childName: 'Brian Otieno',
      avatar: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_100,h_100,c_thumb/parents/demo.jpg`
    },
  }

  useEffect(() => {
    const saved = localStorage.getItem('bm_user')
    if (saved) setUser(JSON.parse(saved))
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const acc = Object.values(demoAccounts).find(a => a.email === email && a.password === password)
        if (acc) {
          const { password: _, ...u } = acc
          setUser(u)
          localStorage.setItem('bm_user', JSON.stringify(u))
          navigate(`/${u.role}-dashboard`)
          resolve({ success: true })
        } else {
          resolve({ success: false, error: 'Invalid credentials. Try: teacher@gmail.com / teacher123' })
        }
      }, 800)
    })
  }, [navigate])

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = { id: `u-${Date.now()}`, ...userData } as User
        setUser(newUser)
        localStorage.setItem('bm_user', JSON.stringify(newUser))
        navigate(`/${newUser.role}-dashboard`)
        resolve({ success: true })
      }, 1000)
    })
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('bm_user')
    navigate('/login')
  }, [navigate])

  const updateProfile = useCallback((updates: Partial<User>) => {
    if (user) {
      const u = { ...user, ...updates }
      setUser(u)
      localStorage.setItem('bm_user', JSON.stringify(u))
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}