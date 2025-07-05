import { FC } from "react"

import { AppRouter } from "./routes/AppRouter"
import { AppProvider } from "./providers/AppProvider"

const App: FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
