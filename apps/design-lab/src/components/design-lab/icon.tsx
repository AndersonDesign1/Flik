import { HugeiconsIcon } from "@hugeicons/react";

type FlikIconProps = React.ComponentProps<typeof HugeiconsIcon>;

export function FlikIcon(props: FlikIconProps) {
  return <HugeiconsIcon size={18} strokeWidth={1.7} {...props} />;
}
