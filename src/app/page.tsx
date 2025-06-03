"use client";
import React from 'react';
import UserCardForm from '../core/UserCardForm';
import Navigation from '../common/Navigation';

export default function UserCardFormPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-900 flex items-center justify-center pt-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
        <div className="relative z-10">
          <UserCardForm />
        </div>
      </main>
    </>
  );
}
