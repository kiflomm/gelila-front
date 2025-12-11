import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        "bg-zinc-200/80 dark:bg-zinc-800/80",
        "bg-gradient-to-r from-zinc-200/80 via-zinc-200/60 to-zinc-200/80",
        "dark:from-zinc-800/80 dark:via-zinc-800/60 dark:to-zinc-800/80",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
