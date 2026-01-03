import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router"
import LoginPage from "./pages/loginPage.jsx"
import NotFoundPages from "./pages/NotFoundPage.jsx"
import ChoseLanguePage from "./pages/ChoseLanguePage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ShowAllVocabPage from "./pages/ShowAllVocabPage.jsx"
import YourLibPage from "./pages/YourLibPage.jsx"
import FlashCardPages from "./pages/FlashCardPage.jsx"
import ToeicPartFivePage from "./pages/ToeicPartFivePage.jsx"
import PageHist from "./pages/HistPage.jsx"
import PageVocabTopics from "./pages/PageVocabTopics.jsx"
import PageProgress from "./pages/PageProgress.jsx"

function App() {
  return (
    <>
    <Toaster richColors/>
    <BrowserRouter>
        <Routes>
          <Route
              path = "/"
              element = {<LoginPage />}
              />
          <Route
              path = "*"
              element = {<NotFoundPages />}
              />
          <Route
              path = "/choselanguepage"
              element = {<ChoseLanguePage />}
              />
          <Route
              path = "/Homepage"
              element = {<HomePage />}
              />
          <Route
              path = "/vocab/showallvocabPage"
              element = {<ShowAllVocabPage />}
              />
          <Route
              path = "/vocab/yourlibpage"
              element = {<YourLibPage/>}
              />
          <Route
              path = "/flashcardpage"
              element = {<FlashCardPages/>}
              />
          <Route
              path = "/toeic/toeicpartfivepage"
              element = {<ToeicPartFivePage/>}
              />
          <Route
              path = "/history"
              element = {<PageHist/>}
              />
          <Route
              path = "/vocab/topicspage"
              element = {<PageVocabTopics/>}
              />
           <Route
              path = "/vocab/progress"
              element = {<PageProgress/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
