import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

type MultiProgressProps = React.ComponentProps<
  typeof ProgressPrimitive.Root
> & {
  value1: number; // 0〜100
  value2: number; // 0〜100
};


function retColor({type, percentage}: {type: string, percentage: number}) {
  if (100-percentage >= 52.01) {
    if (type == "main") {
      return "bg-green-500"
    }else {
      return "bg-green-400"
    }
  }else if(100-percentage >= 21.00){
    if (type == "main") {
      return "bg-yellow-500"
    }else {
      return "bg-yellow-400"
    }
  }else {
    if (type == "main") {
      return "bg-red-500"
    }else {
      return "bg-red-400"
    }
  }
}

function MultiProgress({
  className,
  value1,
  value2,
  ...props
}: MultiProgressProps) {
  const clampedValue1 = Math.max(0, Math.min(100, value1));
  const clampedValue2 = Math.max(clampedValue1, Math.min(100, value2)); // value2 >= value1 前提

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        className
      )}
      {...props}
    >
      {/* First range: 0〜value1 */}
      <div
        className={`absolute left-0 top-0 h-full ${retColor({type: "main", percentage: clampedValue1})} transition-all`}
        style={{ width: `${clampedValue1}%` }}
      />

      {/* Second range: value1〜value2 */}
      <div
        className={`absolute top-0 h-full ${retColor({type: "sub", percentage: clampedValue1})} transition-all`}
        style={{
          left: `${clampedValue1}%`,
          width: `${clampedValue2 - clampedValue1}%`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export default MultiProgress;
