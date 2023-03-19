import './02_Styles/index.scss'
import * as serviceWorker from "./serviceWorker"
import { createRoot } from "react-dom/client"
import { App } from "./App"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)
root.render(<App />)

serviceWorker.unregister()
