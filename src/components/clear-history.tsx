import { Trash2Icon } from "lucide-react"
import moment from "moment"
import React, { useState } from "react"

import { useHistory } from "~providers/history-provider"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"

const validRange = [
  "Last 1 hour",
  "Last 3 hour",
  "Last 24 hour",
  "Last 7 days",
  "Last 31 days",
  "All"
]

const ClearHistory = () => {
  const [range, setRange] = useState(validRange[0])
  const { reload } = useHistory()

  const handleClear = () => {
    const chromeRef = chrome.history
    switch (range) {
      case "Last 1 hour":
        chromeRef.deleteRange({
          endTime: +moment(),
          startTime: +moment().subtract(1, "hours")
        })
        break

      case "Last 3 hour":
        chromeRef.deleteRange({
          endTime: +moment(),
          startTime: +moment().subtract(3, "hours")
        })
        break

      case "Last 24 hour":
        chromeRef.deleteRange({
          endTime: +moment(),
          startTime: +moment().subtract(24, "hours")
        })
        break

      case "Last 7 days":
        chromeRef.deleteRange({
          endTime: +moment(),
          startTime: +moment().subtract(7, "days")
        })
        break

      case "Last 31 days":
        chromeRef.deleteRange({
          endTime: +moment(),
          startTime: +moment().subtract(31, "days")
        })
        break

      default:
        chromeRef.deleteAll()
    }
    reload()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="hover:text-red-500 transition-colors tooltip tooltip-open tooltip-bottom"
          data-tip="hello">
          <Trash2Icon />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear your history?</AlertDialogTitle>
          <AlertDialogContent></AlertDialogContent>
          <AlertDialogDescription>
            <p>
              This action cannot be undone. This will permanently delete your
              browsing history. Select the date range below:
            </p>
          </AlertDialogDescription>
          <div className="flex justify-center my-2">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-[180px] text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {validRange.map((str) => (
                  <SelectItem value={str} key={str}>
                    {str}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-foreground">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClear}>Clear</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ClearHistory
