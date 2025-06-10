import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { processPrompt } from '../utils/api';
import { useRouter } from 'next/navigation';

const UserCardForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'idle' | 'summary' | 'supabase' | 'webhook'>('idle');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);
    setStep('summary');
    try {
      await processPrompt(title, content);
      setSubmitted(true);
      setStep('idle');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setStep('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className={loading ? 'pointer-events-none blur-sm opacity-60 transition-all duration-300' : 'transition-all duration-300'}>
        <Card className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-100 mb-8 text-center font-outfit tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Enter Prompt
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Enter a title..."
            />
            <Input
              label="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              placeholder="Type your content here..."
            />
            <Button type="submit" disabled={loading || !title.trim() || !content.trim()}>
              Submit
            </Button>
          </form>
          {error && (
            <div className="mt-6 text-red-300 text-center font-medium bg-red-900/30 border border-red-500/30 rounded-2xl py-4 px-6 backdrop-blur-sm">
              {error}
            </div>
          )}
          {submitted && (
            <div className="mt-6 text-green-300 text-center font-medium bg-green-900/30 border border-green-500/30 rounded-2xl py-4 px-6 backdrop-blur-sm">
              Success, Google Doc created.
            </div>
          )}
        </Card>
      </div>
      {loading && (
        <Loader text="Processing..." />
      )}
    </div>
  );
};

export default UserCardForm;
