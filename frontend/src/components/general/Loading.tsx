import { LoaderIcon } from "lucide-react"
import { cn } from "../../lib/utils";

const Loading : React.FC<{iconSize?: number; className?: string}> = (props) => {
  const {iconSize, className} = props;
  return (
    <LoaderIcon className={cn("animate-spin-slow", className)} size={iconSize ? iconSize : 16}/>
  )
}

export default Loading;
