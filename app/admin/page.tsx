'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, Users, Package, MessageSquare, FileText, DollarSign, BarChart3, AlertCircle, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<any>({
    users: [],
    products: [],
    blogs: [],
    loanQueries: [],
    loanApplications: [],
    supportTickets: []
  });
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, productsRes, blogsRes, loanQueriesRes, loanAppsRes, supportRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/products'),
        fetch('/api/blogs'),
        fetch('/api/loan-queries'),
        fetch('/api/loan-applications'),
        fetch('/api/support')
      ]);
      
      const results = await Promise.all([
        usersRes.json(),
        productsRes.json(),
        blogsRes.json(),
        loanQueriesRes.json(),
        loanAppsRes.json(),
        supportRes.json()
      ]);
      
      setData({
        users: results[0].success ? results[0].data : [],
        products: results[1].success ? results[1].data : [],
        blogs: results[2].success ? results[2].data : [],
        loanQueries: results[3].success ? results[3].data : [],
        loanApplications: results[4].success ? results[4].data : [],
        supportTickets: results[5].success ? results[5].data : []
      });
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      const result = await res.json();
      
      if (result.success) {
        toast.success('Deleted successfully');
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getEndpoint = (tab: string) => {
    const endpoints: any = {
      users: '/api/users',
      products: '/api/products',
      blogs: '/api/blogs',
      'loan-queries': '/api/loan-queries',
      'loan-applications': '/api/loan-applications',
      support: '/api/support'
    };
    return endpoints[tab] || '/api/users';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formData);
    
    const endpoint = getEndpoint(activeTab);
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${endpoint}/${editingItem._id}` : endpoint;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj),
      });
      const result = await res.json();
      
      if (result.success) {
        toast.success(editingItem ? 'Updated successfully' : 'Created successfully');
        setDialogOpen(false);
        setEditingItem(null);
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const stats = [
    { label: 'Total Users', value: data.users.length, icon: Users, color: 'text-blue-600' },
    { label: 'Products', value: data.products.length, icon: Package, color: 'text-green-600' },
    { label: 'Loan Queries', value: data.loanQueries.length, icon: DollarSign, color: 'text-yellow-600' },
    { label: 'Support Tickets', value: data.supportTickets.length, icon: AlertCircle, color: 'text-red-600' },
    { label: 'Loan Applications', value: data.loanApplications.length, icon: FileText, color: 'text-purple-600' },
    { label: 'Blog Posts', value: data.blogs.length, icon: FileText, color: 'text-indigo-600' },
  ];

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                <User size={16} className="text-primary" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">({user.role})</span>
              </div>
            )}
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-red-500/50 hover:bg-red-500/10 text-red-600 hover:text-red-700"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="loan-queries">Loan Queries</TabsTrigger>
          <TabsTrigger value="loan-applications">Applications</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Loan Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.loanQueries.slice(0, 5).map((query: any) => (
                    <div key={query._id} className="flex justify-between items-center p-2 border-b">
                      <div>
                        <p className="font-medium">{query.name}</p>
                        <p className="text-sm text-gray-600">{query.loanType} - ₹{query.loanAmount}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        query.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {query.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.supportTickets.slice(0, 5).map((ticket: any) => (
                    <div key={ticket._id} className="flex justify-between items-center p-2 border-b">
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-gray-600">{ticket.subject}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Users Management</CardTitle>
                  <CardDescription>Manage all users</CardDescription>
                </div>
                <Dialog open={dialogOpen && activeTab === 'users'} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="mr-2 h-4 w-4" /> Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit User' : 'Add New User'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={editingItem?.name} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={editingItem?.email} required />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" defaultValue={editingItem?.password} required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" defaultValue={editingItem?.phone} />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue={editingItem?.role || 'user'}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full">
                        {editingItem ? 'Update' : 'Create'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.users.map((user: any) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Role: {user.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setEditingItem(user); setDialogOpen(true); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete('users', user._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Products Management</CardTitle>
                  <CardDescription>Manage financial products</CardDescription>
                </div>
                <Dialog open={dialogOpen && activeTab === 'products'} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={editingItem?.name} required />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                      </div>
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Input id="type" name="type" defaultValue={editingItem?.type} required />
                      </div>
                      <div>
                        <Label htmlFor="interestRate">Interest Rate (%)</Label>
                        <Input id="interestRate" name="interestRate" type="number" step="0.01" defaultValue={editingItem?.interestRate} />
                      </div>
                      <Button type="submit" className="w-full">
                        {editingItem ? 'Update' : 'Create'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.products.map((product: any) => (
                  <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <p className="text-xs text-gray-500">Type: {product.type} | Rate: {product.interestRate}%</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setEditingItem(product); setDialogOpen(true); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete('products', product._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Manage blog posts</CardDescription>
                </div>
                <Dialog open={dialogOpen && activeTab === 'blogs'} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="mr-2 h-4 w-4" /> Add Blog
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={editingItem?.title} required />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" name="content" rows={6} defaultValue={editingItem?.content} required />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" name="author" defaultValue={editingItem?.author} required />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" defaultValue={editingItem?.category} required />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={editingItem?.status || 'draft'}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full">
                        {editingItem ? 'Update' : 'Create'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.blogs.map((blog: any) => (
                  <div key={blog._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="text-sm text-gray-600">By {blog.author} | {blog.category}</p>
                      <p className="text-xs text-gray-500">Status: {blog.status} | Views: {blog.views}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setEditingItem(blog); setDialogOpen(true); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete('blogs', blog._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loan-queries">
          <Card>
            <CardHeader>
              <CardTitle>Loan Queries</CardTitle>
              <CardDescription>Manage loan inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.loanQueries.map((query: any) => (
                  <div key={query._id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{query.name}</h3>
                        <p className="text-sm text-gray-600">{query.email} | {query.phone}</p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Loan Type:</span> {query.loanType} | 
                          <span className="font-medium"> Amount:</span> ₹{query.loanAmount?.toLocaleString()}
                        </p>
                        {query.message && <p className="text-sm text-gray-600 mt-2">{query.message}</p>}
                        <div className="flex gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            query.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                            query.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {query.status}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            query.priority === 'high' ? 'bg-red-100 text-red-800' : 
                            query.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {query.priority}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setEditingItem(query); setDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete('loan-queries', query._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loan-applications">
          <Card>
            <CardHeader>
              <CardTitle>Loan Applications</CardTitle>
              <CardDescription>Manage loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.loanApplications.map((app: any) => (
                  <div key={app._id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{app.personalInfo?.fullName || 'N/A'}</h3>
                        <p className="text-sm text-gray-600">{app.personalInfo?.email} | {app.personalInfo?.phone}</p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Loan:</span> {app.loanDetails?.loanType} | 
                          <span className="font-medium"> Amount:</span> ₹{app.loanDetails?.loanAmount?.toLocaleString()}
                        </p>
                        <span className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setEditingItem(app); setDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete('loan-applications', app._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage support requests and complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.supportTickets.map((ticket: any) => (
                  <div key={ticket._id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{ticket.name}</h3>
                        <p className="text-sm text-gray-600">{ticket.email} {ticket.phone && `| ${ticket.phone}`}</p>
                        <p className="text-sm font-medium mt-2">{ticket.subject}</p>
                        <p className="text-sm text-gray-600 mt-1">{ticket.message}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            ticket.type === 'complaint' ? 'bg-red-100 text-red-800' : 
                            ticket.type === 'inquiry' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            ticket.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.status}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                            ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setEditingItem(ticket); setDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete('support', ticket._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </ProtectedRoute>
  );
}
