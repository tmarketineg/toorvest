'use client';

import { HeroSplit } from '@/components/home/HeroSplit';
import { WhyToorvest } from '@/components/home/WhyToorvest';
import { SectionCards } from '@/components/home/SectionCards';
import { FastScrollButton } from '@/components/home/FastScrollButton';
import { CountriesGrid } from '@/components/home/CountriesGrid';

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <WhyToorvest />
      <SectionCards />
      <FastScrollButton />
      <section id="pavilions">
        <CountriesGrid />
      </section>
    </>
  );
}
