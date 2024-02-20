import "global.css"

import Layout from "~components/layout"
import { HistoryProvider } from "~providers/history-provider"
import { ThemeProvider } from "~providers/theme-provider"

function IndexPopup() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="folded-history-theme">
      <HistoryProvider>
        <Layout />
      </HistoryProvider>
    </ThemeProvider>
  )
}

export default IndexPopup
