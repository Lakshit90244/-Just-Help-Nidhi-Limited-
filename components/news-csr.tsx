"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

// Fallback news items (shown if no database blogs)
const fallbackNews = [
  {
    id: 1,
    title: "Annual General Meeting 2024",
    content: "Join us for our 25th AGM where we discuss company performance and member benefits",
    category: "News",
    author: "Maben Team",
    createdAt: "2024-11-01",
  },
  {
    id: 2,
    title: "CSR Initiative: Education for Underprivileged", 
    content: "Maben commits 5 lakh towards educational scholarships for 100 students",
    category: "CSR",
    author: "Maben Team",
    createdAt: "2024-10-01",
  },
  {
    id: 3,
    title: "Q3 Financial Results Released",
    content: "Strong growth of 15% YoY with increased member participation",
    category: "IR",
    author: "Maben Team",
    createdAt: "2024-09-01",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};

export default function NewsCSR() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        // Show only published blogs, limit to 3 most recent
        const publishedBlogs = result.data
          .filter((blog: any) => blog.status === 'published')
          .slice(0, 3);
        setBlogs(publishedBlogs.length > 0 ? publishedBlogs : fallbackNews);
      } else {
        // Use fallback news if no database blogs
        setBlogs(fallbackNews);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Use fallback news on error
      setBlogs(fallbackNews);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">Loading latest news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Latest News & Updates</h2>
          <p className="text-lg text-foreground/70 text-balance">
            Stay informed about our latest announcements and initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog._id || blog.id} className="border-border/50 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 h-24 flex items-center justify-center">
                <span className="text-3xl">📰</span>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary uppercase">
                    {blog.category || 'News'}
                  </span>
                  <span className="text-xs text-foreground/60">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
                <CardTitle className="text-lg text-foreground">{blog.title}</CardTitle>
                <CardDescription className="text-foreground/70">
                  {blog.content?.substring(0, 100)}...
                </CardDescription>
                {blog.author && (
                  <div className="text-xs text-foreground/50 mt-2">
                    By {blog.author}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 p-0">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
