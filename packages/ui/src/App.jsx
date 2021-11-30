import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"

const qc = new QueryClient()

const App = () => {
    return (
        <div id="app-container">
            <QueryClientProvider client={qc}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    )
}

export default App
