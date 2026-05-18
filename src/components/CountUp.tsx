import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({ end, duration = 2, className = '', style = {} }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const objRef = useRef({ value: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numericPart = end.replace(/[^0-9]/g, '');
    const suffix = end.replace(/[0-9]/g, '');
    const target = parseInt(numericPart, 10);
    if (isNaN(target)) {
      el.textContent = end;
      return;
    }

    const tween = gsap.to(objRef.current, {
      value: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(objRef.current.value) + suffix;
      },
    });

    return () => {
      tween.kill();
    };
  }, [end, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', minWidth: '1em', ...style }}
    >
      0
    </span>
  );
}
