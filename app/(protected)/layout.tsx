import Me from '@/components/Me';
import React from 'react';

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
    <header className='fixed inset-x-0 z-50 flex items-center justify-between p-4 border-b shadow-xl max-h-20 h-full bg-white/30 backdrop-blur-sm'>
      <nav>
        <div className='text-purple-500 font-semibold'>
          Mini Todo&apos;s App
        </div>
      </nav>
      <nav className='flex items-center gap-4'>
        <Me />
      </nav>
    </header>
    <main>{children}</main>
    </>
  );
}
