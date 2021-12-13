import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import Dashboard from "./Dashboard"

const qc = new QueryClient()

const App = () => {
    return (
        <MainContainer id="app-container">
            <ContentContainer>
                <QueryClientProvider client={qc}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </ContentContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    max-width: 1200px;
`

export default App
