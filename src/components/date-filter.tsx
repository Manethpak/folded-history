import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"

import { useHistory } from "~providers/history-provider"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"

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
  const [range, setRange] = useState("Today")
  const { setStartDate, setEndDate } = useHistory()

  useEffect(() => {
    switch (range) {
      case "Today":
        setStartDate(+moment().startOf("day"))
        setEndDate(undefined)
        break

      case "Yesterday":
        let ytd = moment().subtract(1, "days")
        setStartDate(+ytd.startOf("day"))
        setEndDate(+ytd.endOf("day"))
        break

      case "This Week":
        setStartDate(+moment().subtract(1, "weeks").startOf("day"))
        setEndDate(undefined)
        break

      case "Last Week":
        setStartDate(+moment().subtract(2, "weeks").startOf("day"))
        setEndDate(+moment().subtract(1, "weeks").endOf("day"))
        break

      case "This Month":
        setStartDate(+moment().subtract(1, "months").startOf("day"))
        setEndDate(undefined)
        break

      case "Last Month":
        setStartDate(+moment().subtract(2, "months").startOf("day"))
        setEndDate(+moment().subtract(1, "months").startOf("day"))
        break

      default:
        setStartDate(undefined)
        setEndDate(undefined)
        break
    }
  }, [range])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{range}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
          {selectRange.map((each) => (
            <DropdownMenuRadioItem value={each}>{each}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DateFilter
