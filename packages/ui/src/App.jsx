import { QueryClient, QueryClientProvider } from "react-query"
import Dashboard from "./Dashboard"

const qc = new QueryClient()

const App = () => {
    return (
        <div id="app-container">
            <QueryClientProvider client={qc}>
                <Dashboard />
            </QueryClientProvider>
        </div>
    )
}

export default App
