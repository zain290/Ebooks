import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'books' | 'messages'>('books');
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  // Book Form State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', category: '', author: '', is_limited_offer: false, discount_percentage: 0, sale_name: '', existing_cover_url: '', existing_book_url: ''
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEbooks();
    fetchMessages();
  }, []);

  const fetchEbooks = async () => {
    const res = await fetch('/api/ebooks');
    if (res.ok) setEbooks(await res.json());
  };

  const fetchMessages = async () => {
    const res = await fetch('/api/contact');
    if (res.ok) setMessages(await res.json());
  };

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: data });
    if (res.ok) {
      const json = await res.json();
      return json.url;
    }
    throw new Error('Upload failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let cover_image_url = formData.existing_cover_url;
      let book_file_url = formData.existing_book_url;
      
      if (coverFile) cover_image_url = await uploadFile(coverFile);
      if (bookFile) book_file_url = await uploadFile(bookFile);

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discount_percentage: parseInt(formData.discount_percentage as any) || 0,
        cover_image_url,
        book_file_url
      };

      const url = editingId ? `/api/ebooks/${editingId}` : '/api/ebooks';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        fetchEbooks();
        setFormData({ title: '', description: '', price: '', category: '', author: '', is_limited_offer: false, discount_percentage: 0, sale_name: '', existing_cover_url: '', existing_book_url: '' });
        setCoverFile(null);
        setBookFile(null);
      } else {
        alert('Failed to save book');
      }
    } catch (err) {
      alert('Error occurred during save');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book: any) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      description: book.description || '',
      price: book.price.toString(),
      category: book.category || '',
      author: book.author || '',
      is_limited_offer: book.is_limited_offer === 1,
      discount_percentage: book.discount_percentage || 0,
      sale_name: book.sale_name || '',
      existing_cover_url: book.cover_image_url || '',
      existing_book_url: book.book_file_url || ''
    });
    setCoverFile(null);
    setBookFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this e-book?')) return;
    const res = await fetch(`/api/ebooks/${id}`, { method: 'DELETE' });
    if (res.ok) fetchEbooks();
  };

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex gap-4 bg-surface p-1 rounded-xl backdrop-blur-md border border-nav-border">
            <button 
              onClick={() => setActiveTab('books')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'books' ? 'bg-primary text-white shadow-lg' : 'text-text/60 hover:text-text'}`}
            >
              Manage Books
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'messages' ? 'bg-primary text-white shadow-lg' : 'text-text/60 hover:text-text'}`}
            >
              Contact Messages
            </button>
          </div>
        </header>

        {activeTab === 'books' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Library Collection</h2>
              <button onClick={() => { if (showForm) { setShowForm(false); setEditingId(null); setFormData({ title: '', description: '', price: '', category: '', author: '', is_limited_offer: false, discount_percentage: 0, sale_name: '', existing_cover_url: '', existing_book_url: '' }); } else setShowForm(true); }} className="px-5 py-2 bg-surface hover:bg-surface/80 border border-nav-border rounded-lg text-sm font-medium transition-all text-text">
                {showForm ? 'Cancel' : '+ Add New Book'}
              </button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmit}
                  className="mb-8 p-6 bg-surface border border-nav-border rounded-2xl backdrop-blur-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Author</label>
                      <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Price ($)</label>
                      <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Category</label>
                      <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase text-text/60 mb-2">Description</label>
                      <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Discount Percentage (%)</label>
                      <input type="number" min="0" max="100" value={formData.discount_percentage} onChange={e => setFormData({...formData, discount_percentage: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Sale Name / Voucher</label>
                      <input type="text" placeholder="e.g. Summer Sale" value={formData.sale_name} onChange={e => setFormData({...formData, sale_name: e.target.value})} className="w-full px-4 py-3 bg-background border border-nav-border rounded-xl outline-none focus:border-primary transition-all text-text" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">Cover Image {editingId && formData.existing_cover_url && '(Leave empty to keep)'}</label>
                      <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} className="w-full text-sm text-text/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-text/60 mb-2">E-Book File (PDF, EPUB) {editingId && formData.existing_book_url && '(Leave empty to keep)'}</label>
                      <input type="file" accept=".pdf,.epub" onChange={e => setBookFile(e.target.files?.[0] || null)} className="w-full text-sm text-text/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3">
                      <input type="checkbox" id="limited" checked={formData.is_limited_offer} onChange={e => setFormData({...formData, is_limited_offer: e.target.checked})} className="w-5 h-5 accent-primary" />
                      <label htmlFor="limited" className="text-sm font-medium">Limited-Time Offer</label>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50">
                      {loading ? 'Saving...' : (editingId ? 'Update Book' : 'Save Book')}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.map(book => (
                <div key={book.id} className="bg-surface border border-nav-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all">
                  <div className="h-48 bg-background relative">
                    {book.cover_image_url ? (
                      <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text/30 font-medium">No Cover</div>
                    )}
                    {book.is_limited_offer === 1 && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-red-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">OFFER</span>
                    )}
                    {book.discount_percentage > 0 && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">{book.discount_percentage}% OFF</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 truncate">{book.title}</h3>
                    {book.discount_percentage > 0 ? (
                      <div className="flex items-center gap-2 mb-4">
                        <p className="text-primary font-bold">${(book.price - (book.price * book.discount_percentage / 100)).toFixed(2)}</p>
                        <p className="text-text/40 font-medium line-through text-sm">${book.price.toFixed(2)}</p>
                      </div>
                    ) : (
                      <p className="text-primary font-medium mb-4">${book.price.toFixed(2)}</p>
                    )}
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(book)} className="flex-1 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-semibold transition-all">Edit</button>
                      <button onClick={() => handleDelete(book.id)} className="flex-1 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-semibold transition-all">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">User Inquiries</h2>
            {messages.length === 0 ? (
              <div className="p-10 text-center bg-surface rounded-2xl border border-nav-border text-text/50">No messages yet.</div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="p-6 bg-surface border border-nav-border rounded-2xl backdrop-blur-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                    </div>
                    <span className="text-xs text-text/40">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-text/80 leading-relaxed bg-background p-4 rounded-xl">{msg.message}</p>
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
