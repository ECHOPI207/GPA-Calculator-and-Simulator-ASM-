import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        'flex items-center gap-3 transition-all hover:opacity-80',
        collapsed && 'justify-center',
        className
      )}
    >
      {/* أيقونة اللوجو */}
      <div className="relative shrink-0">
        <svg
          width={collapsed ? '32' : '40'}
          height={collapsed ? '32' : '40'}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all"
        >
          {/* الدائرة الخارجية */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="fill-primary/10 stroke-primary"
            strokeWidth="2"
          />
          
          {/* رمز π */}
          <text
            x="50"
            y="65"
            fontSize="48"
            fontWeight="bold"
            textAnchor="middle"
            className="fill-primary font-serif"
          >
            π
          </text>
          
          {/* خط الموجة (echo) */}
          <path
            d="M 20 30 Q 30 25, 40 30 T 60 30 T 80 30"
            className="stroke-primary"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* النص */}
      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground">echo</span>
            <span className="text-2xl font-bold text-primary">-π</span>
          </div>
          <span className="text-xs text-muted-foreground leading-tight">
            منصة التميز الأكاديمي
          </span>
        </div>
      )}
    </Link>
  );
}
