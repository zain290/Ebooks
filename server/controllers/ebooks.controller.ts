import { Request, Response } from 'express'
import db from '../db'

export const getAllEbooks = (req: Request, res: Response) => {
  try {
    const ebooks = db.prepare('SELECT * FROM ebooks ORDER BY created_at DESC').all()
    res.json(ebooks)
  } catch (error) {
    console.error('Error fetching ebooks:', error)
    res.status(500).json({ error: 'Failed to fetch ebooks' })
  }
}

export const getEbookById = (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const ebook = db.prepare('SELECT * FROM ebooks WHERE id = ?').get(id)
    if (!ebook) {
      return res.status(404).json({ error: 'E-book not found' })
    }
    res.json(ebook)
  } catch (error) {
    console.error('Error fetching ebook:', error)
    res.status(500).json({ error: 'Failed to fetch ebook' })
  }
}

export const createEbook = (req: Request, res: Response) => {
  try {
    const { title, description, price, cover_image_url, author, category, is_limited_offer, book_file_url, discount_percentage, sale_name } = req.body
    if (!title || price === undefined) {
      return res.status(400).json({ error: 'Title and price are required' })
    }

    const stmt = db.prepare(`
      INSERT INTO ebooks (title, description, price, cover_image_url, author, category, is_limited_offer, book_file_url, discount_percentage, sale_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(title, description, price, cover_image_url, author, category || 'Uncategorized', is_limited_offer ? 1 : 0, book_file_url, discount_percentage || 0, sale_name || null)
    
    res.status(201).json({ id: result.lastInsertRowid, message: 'E-book created successfully' })
  } catch (error) {
    console.error('Error creating ebook:', error)
    res.status(500).json({ error: 'Failed to create ebook' })
  }
}

export const updateEbook = (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const { title, description, price, cover_image_url, author, category, is_limited_offer, book_file_url, discount_percentage, sale_name } = req.body
    if (!title || price === undefined) {
      return res.status(400).json({ error: 'Title and price are required' })
    }

    const stmt = db.prepare(`
      UPDATE ebooks 
      SET title = ?, description = ?, price = ?, cover_image_url = ?, author = ?, category = ?, is_limited_offer = ?, book_file_url = ?, discount_percentage = ?, sale_name = ?
      WHERE id = ?
    `)
    const result = stmt.run(title, description, price, cover_image_url, author, category || 'Uncategorized', is_limited_offer ? 1 : 0, book_file_url, discount_percentage || 0, sale_name || null, id)
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'E-book not found' })
    }
    res.json({ message: 'E-book updated successfully' })
  } catch (error) {
    console.error('Error updating ebook:', error)
    res.status(500).json({ error: 'Failed to update ebook' })
  }
}

export const deleteEbook = (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = db.prepare('DELETE FROM ebooks WHERE id = ?').run(id)
    if (result.changes === 0) {
      return res.status(404).json({ error: 'E-book not found' })
    }
    res.json({ message: 'E-book deleted successfully' })
  } catch (error) {
    console.error('Error deleting ebook:', error)
    res.status(500).json({ error: 'Failed to delete ebook' })
  }
}
