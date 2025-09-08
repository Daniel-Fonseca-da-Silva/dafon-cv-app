import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const sizeMap = {
  sm: { width: 16, height: 16, src: '/logos/logo-16x16.png' },
  md: { width: 32, height: 32, src: '/logos/logo-32x32.png' },
  lg: { width: 64, height: 64, src: '/logos/logo-64x64.png' },
  xl: { width: 128, height: 128, src: '/logos/logo-128x128.png' },
};

export function Logo({ 
  size = 'md', 
  className, 
  showText = true, 
  textClassName 
}: LogoProps) {
  const { width, height, src } = sizeMap[size];

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Image
        src={src}
        alt="Dafon CV Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      {showText && (
        <div className={textClassName}>
          <h1 className="text-white font-bold text-lg">Dafon CV</h1>
          <p className="text-white/70 text-xs">Powered by Dafon</p>
        </div>
      )}
    </div>
  );
}
