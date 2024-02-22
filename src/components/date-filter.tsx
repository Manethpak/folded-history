import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"

import { useHistory } from "~providers/history-provider"

import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "~lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"

const selectRange = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "All Time"
]

const DateFilter = () => {
  const [date, setDate] = useState<Date>(new Date())
  const { setStartDate, setEndDate } = useHistory()

  useEffect(() => {
    setStartDate(+moment(date).startOf("day"))
    setEndDate(+moment(date).endOf("day"))
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[140px] pl-3 text-left font-normal")}>
          <span>{moment(date).format("DD-MM-YYYY")}</span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("2000-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DateFilter
