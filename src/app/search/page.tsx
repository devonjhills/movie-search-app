'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchPage } from '@/components/search/search-page';

export default function Search() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  return <SearchPage initialQuery={initialQuery} />;
}