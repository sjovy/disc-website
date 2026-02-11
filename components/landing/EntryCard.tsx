import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EntryCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  accentColor: 'disc-d' | 'disc-i' | 'disc-s' | 'disc-c';
}

export function EntryCard({
  title,
  description,
  href,
  icon,
  accentColor,
}: EntryCardProps) {
  const borderColorMap = {
    'disc-d': 'border-disc-d',
    'disc-i': 'border-disc-i',
    'disc-s': 'border-disc-s',
    'disc-c': 'border-disc-c',
  };

  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative bg-white rounded-xl p-8 border-l-4 shadow-sm',
          'hover:shadow-lg transition-all duration-200',
          'focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none',
          'active:scale-[0.98]',
          borderColorMap[accentColor]
        )}
      >
        {/* Icon */}
        {icon && (
          <div className="mb-4 text-3xl">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 mb-4">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:gap-3 transition-all">
          <span>Get started</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
