import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFloatProps {
  children?: React.ReactNode;
  text?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  stagger?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * Modern High-Performance Cinematic Appearance Animation
 * Elegant blur-to-clear, smooth upward glide, and subtle scaling
 * without any distorting/warping letter artifacts.
 */
const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  text,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.85,
  ease = 'power4.out',
  scrollStart = 'top 92%',
  stagger = 0.025,
  tag = 'span',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const rawText = useMemo(() => {
    if (typeof text === 'string') return text;
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    return '';
  }, [children, text]);

  const charElementsContent = useMemo(() => {
    const words = rawText.split(' ');
    return words.map((word, wIndex) => (
      <span key={wIndex} className="scroll-float-word">
        {word.split('').map((char, cIndex) => (
          <span className="scroll-float-char" key={cIndex}>
            {char}
          </span>
        ))}
        {wIndex < words.length - 1 && (
          <span className="scroll-float-char">&nbsp;</span>
        )}
      </span>
    ));
  }, [rawText]);

  useEffect(() => {
    // Animation removed as per user request
  }, [rawText, scrollContainerRef, animationDuration, ease, scrollStart, stagger]);

  const Tag = (tag || 'span') as any;

  return (
    <Tag ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{charElementsContent}</span>
    </Tag>
  );
};

export default ScrollFloat;
