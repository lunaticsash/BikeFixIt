import { useTheme } from '../../context/ThemeContext.jsx';

const WrenchIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#E8192C" />
    <path
      d="M19.5 8.5L14 14l-1.5-1.5 5.5-5.5a2.12 2.12 0 0 1 3 3zM13 15.5L8.5 20a2.12 2.12 0 1 0 3 3L16 18.5 13 15.5zM21 10l-8 8-1.5-1.5 8-8L21 10z"
      fill="white"
    />
    <circle cx="10" cy="22" r="2" fill="white" opacity="0.9" />
  </svg>
);

export default function Logo({ size = 'md', className = '', showIcon = true }) {
  const { isDark } = useTheme();

  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 28, text: 'text-xl' },
    lg: { icon: 36, text: 'text-2xl' },
    xl: { icon: 44, text: 'text-3xl' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showIcon && <WrenchIcon size={s.icon} />}
      <span className={`${s.text} font-extrabold tracking-tight leading-none`}>
        <span className={isDark ? 'text-white' : 'text-zinc-900'}>BikeFix</span>
        <span className="text-brand">It</span>
      </span>
    </div>
  );
}

export { WrenchIcon };
