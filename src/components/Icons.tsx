import type { SVGProps } from 'react';

export { User as UserIcon, Briefcase as BriefcaseIcon, Sparkles as SparkleIcon, Mail as MailIcon, Lock as LockIcon, Sun as SunIcon, Moon as MoonIcon } from 'lucide-react';

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21H18.6v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21H10z" />
    </svg>
  );
}
