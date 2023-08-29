// https://lucide.dev/guide/packages/lucide-react

import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon {...props} />;
};

export default Icon;


/* import {icons} from 'lucide-react';

const Icon = ({ name, color, size }: { name: string; color?:string; size?: number }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon; */