import {Toaster, toast} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router"
import LoginPage from "./pages/loginPage.jsx"
import NotFoundPages from "./pages/notFoundPages.jsx"
import ChoseLanguePage from "./pages/ChoseLanguePage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ShowAllVocabPage from "./pages/ShowAllVocabPage.jsx"
import YourLibPage from "./pages/YourLibPage.jsx"
import FlashCardPages from "./pages/FlashCardPages.jsx"
import ToeicPartFivePage from "./pages/ToeicPartFivePage.jsx"
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
              path = "/ShowAllVocabPage"
              element = {<ShowAllVocabPage />}
              />
          <Route
              path = "/yourlibpage"
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
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
