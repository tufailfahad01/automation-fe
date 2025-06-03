import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { processPrompt } from '../utils/api';
import { useRouter } from 'next/navigation';

const UserCardForm: React.FC = () => {
  const [prompt, setPrompt] = useState('');
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
      // If your processPrompt can return step info, you can update step here accordingly.
      await processPrompt(prompt);
      setSubmitted(true);
      setStep('idle');
      router.push('/responses');
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
              label="Prompt" 
              value={prompt} 
              onChange={e => setPrompt(e.target.value)} 
              required 
              placeholder="Type your prompt here..." 
            />
            <Button type="submit" disabled={loading || !prompt.trim()}>
              {loading ? 'Processing...' : 'Submit'}
            </Button>
          </form>
          {error && (
            <div className="mt-8 text-red-300 text-center font-medium bg-red-900/30 border border-red-500/30 rounded-2xl py-4 px-6 backdrop-blur-sm">
              {error}
            </div>
          )}
          {submitted && (
            <div className="mt-8 text-green-300 text-center font-semibold bg-green-900/30 border border-green-500/30 rounded-2xl py-4 px-6 backdrop-blur-sm">
              Submitted successfully!
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
