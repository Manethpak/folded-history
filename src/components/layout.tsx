import { FolderClockIcon } from "lucide-react"
import React from "react"

import ClearHistory from "./clear-history"
import DateFilter from "./date-filter"
import HistoryList from "./history-list"
import { ModeToggle } from "./mode-toggle"

const Layout = () => {
  return (
    <main className="w-[30rem] min-h-[35rem] p-4 space-y-2 bg-background text-foreground">
      <header className="flex justify-between items-center pb-2">
        <div className="flex gap-2 items-center">
          <FolderClockIcon />
          <h1 className="text-lg">Folded History</h1>
          <ModeToggle />
        </div>

        <div className="flex gap-2 items-center">
          <DateFilter />
          <ClearHistory />
        </div>
      </header>

      <HistoryList />
    </main>
  )
}

export default Layout
