'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function InquiryPage() {
  const [loading, setLoading] = useState(false);
  const [inquiryType, setInquiryType] = useState('loan');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    const endpoint = inquiryType === 'loan' ? '/api/loan-queries' : '/api/support';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (result.success) {
        toast.success('Inquiry submitted successfully! We will contact you soon.');
        e.currentTarget.reset();
      } else {
        toast.error(result.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      toast.error('Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit an Inquiry</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Inquiry Form</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label>Inquiry Type</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    variant={inquiryType === 'loan' ? 'default' : 'outline'}
                    onClick={() => setInquiryType('loan')}
                  >
                    Loan Inquiry
                  </Button>
                  <Button
                    type="button"
                    variant={inquiryType === 'support' ? 'default' : 'outline'}
                    onClick={() => setInquiryType('support')}
                  >
                    General Support
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>

                {inquiryType === 'loan' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="loanType">Loan Type *</Label>
                        <Select name="loanType" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Loan</SelectItem>
                            <SelectItem value="home">Home Loan</SelectItem>
                            <SelectItem value="car">Car Loan</SelectItem>
                            <SelectItem value="business">Business Loan</SelectItem>
                            <SelectItem value="education">Education Loan</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="loanAmount">Loan Amount (₹) *</Label>
                        <Input id="loanAmount" name="loanAmount" type="number" min="10000" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tenure">Tenure (months)</Label>
                        <Input id="tenure" name="tenure" type="number" min="6" max="360" />
                      </div>
                      <div>
                        <Label htmlFor="income">Monthly Income (₹)</Label>
                        <Input id="income" name="income" type="number" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select name="employmentType">
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salaried">Salaried</SelectItem>
                          <SelectItem value="self-employed">Self Employed</SelectItem>
                          <SelectItem value="business">Business Owner</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" name="subject" required />
                    </div>

                    <div>
                      <Label htmlFor="type">Type *</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inquiry">General Inquiry</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} placeholder="Tell us more about your inquiry..." />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-gray-600">support@financebank.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-gray-600">1800-123-4567</p>
              </div>
              <div>
                <p className="font-semibold">Business Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-600">Sat: 9:00 AM - 2:00 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Provide accurate contact information</li>
                <li>• Be specific about your requirements</li>
                <li>• We typically respond within 24 hours</li>
                <li>• Check your email for updates</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
