import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    cover_image_url: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Adding e-book...' });

    try {
      const res = await fetch('/api/ebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'E-book added successfully!' });
        setFormData({ title: '', author: '', price: '', description: '', cover_image_url: '' });
      } else {
        const data = await res.json();
        setStatus({ type: 'error', message: data.error || 'Failed to add e-book.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error.' });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-background border border-text/10 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-medium mb-6 text-text/80">Add New E-Book</h2>
        
        {status.message && (
          <div className={`p-4 mb-6 rounded-lg ${status.type === 'error' ? 'bg-red-500/10 text-red-500' : status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-text/70 mb-1">Author</label>
              <input name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-text/70 mb-1">Price ($)</label>
              <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">Cover Image URL</label>
            <input name="cover_image_url" value={formData.cover_image_url} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text/70 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 rounded-lg bg-text/5 border border-text/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none"></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-text text-background rounded-lg font-bold hover:bg-text/90 transition-colors mt-4">
            Publish E-Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
