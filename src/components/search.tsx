import { SearchIcon } from "lucide-react"
import React, { useEffect } from "react"

import { useHistory } from "~providers/history-provider"

import { Input } from "./ui/input"

const Search = () => {
  const { setSearchText, searchText } = useHistory()

  return (
    <div className="flex gap-4 items-center">
      <Input
        placeholder="Search..."
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.currentTarget.value)}
      />
      <SearchIcon />
    </div>
  )
}

export default Search
