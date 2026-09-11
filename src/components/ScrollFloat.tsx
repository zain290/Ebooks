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
  scrollEnd?: string;
  stagger?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  text,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 2,
  ease = 'back.inOut(1.5)',
  scrollStart = 'top bottom+=20%',
  scrollEnd = 'bottom center',
  stagger = 0.05,
  tag = 'span',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const rawText = useMemo(() => {
    if (typeof text === 'string') return text;
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    return '';
  }, [children, text]);

  const splitText = useMemo(() => {
    return rawText.split('').map((char, index) => (
      <span className="scroll-float-char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [rawText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !rawText) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll('.scroll-float-char');
    if (!charElements.length) return;

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 1.5,
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [rawText, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  const Tag = (tag || 'span') as any;

  return (
    <Tag ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Tag>
  );
};

export default ScrollFloat;
