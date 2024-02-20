import _ from "lodash"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

import { getDomain } from "~lib/utils"

// Create a context
const HistoryContext = createContext<{
  history: chrome.history.HistoryItem[]
  startDate: number
  endDate: number
  searchText: string
  grouped: _.Dictionary<chrome.history.HistoryItem[]>
  setStartDate: (arg: number | undefined) => void
  setEndDate: (arg: number | undefined) => void
  setSearchText: (arg: string) => void
  reload: () => void
}>(undefined)

// Create a provider component
const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([])
  const [searchText, setSearchText] = useState("")
  const [startDate, setStartDate] = useState<number | undefined>(undefined)
  const [endDate, setEndDate] = useState<number | undefined>(undefined)

  const grouped = useMemo(
    () => _.groupBy(history, (item) => getDomain(item.url)),
    [history, searchText]
  )

  const getHistory = () => {
    chrome.history.search(
      { text: searchText, startTime: startDate, endTime: endDate },
      function (results) {
        setHistory(results)
      }
    )
  }

  const reload = () => getHistory()

  // Run once to get inital data
  useEffect(getHistory, [startDate])

  return (
    <HistoryContext.Provider
      value={{
        history,
        startDate,
        endDate,
        searchText,
        setStartDate,
        setEndDate,
        grouped,
        reload,
        setSearchText
      }}>
      {children}
    </HistoryContext.Provider>
  )
}

const useHistory = () => useContext(HistoryContext)

export { HistoryProvider, useHistory, HistoryContext }
