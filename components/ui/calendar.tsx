"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn, formatDate } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3", className)}
      classNames={{
        caption: "text-sm font-medium text-center",
        day: "h-9 w-9 text-sm flex items-center justify-center",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar, formatDate }
