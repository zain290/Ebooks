import { Request, Response } from 'express'
import db from '../db'

export const submitContact = (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const stmt = db.prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)')
    const result = stmt.run(name, email, message)

    res.status(201).json({ id: result.lastInsertRowid, message: 'Message submitted successfully' })
  } catch (error) {
    console.error('Submit contact error:', error)
    res.status(500).json({ error: 'Failed to submit message' })
  }
}

export const getContacts = (req: Request, res: Response) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all()
    res.json(messages)
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}
