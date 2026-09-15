import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev'

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const envUser = process.env.ADMIN_USERNAME || 'admin'
    const envPass = process.env.ADMIN_PASSWORD || 'admin123'

    if (username !== envUser || password !== envPass) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const admin = { id: 1, username: envUser }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' })
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.json({ message: 'Logged in successfully' })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
}

export const checkAuth = (req: Request, res: Response) => {
  res.json({ authenticated: true, user: (req as any).admin })
}
