import "./index.css"
import "./polyfills"

// React
import * as React from "react"
import * as ReactDOM from "react-dom"

// Redux & Redux Thunks
import { createStore, applyMiddleware, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"

// React Router
import { BrowserRouter } from "react-router-dom"
// import { syncHistoryWithStore } from "react-router-redux"
// import getRoutes from "./routes"

// Redux Responsive
import { responsiveStoreEnhancer } from "redux-responsive"

// Google Analytics
// import { AnalyticsMiddleware, fireAnalyticsTracking } from "./shared/analytics/GoogleAnalytics"

// Sentry.io
// import * as Raven from "raven-js"
// import * as createRavenMiddleware from "raven-for-redux"

// Service Workers
// import registerServiceWorker from "./registerServiceWorker"

// import { getEnvironment, eAppEnv } from "./redux/modules/app"
import { IStore } from "./redux/modules/interfaces"
import reducers from "./redux/modules/reducer"

import AppContainer from "./AppContainer"

import { APIClient } from "./api/APIClient"
const ealapi = new APIClient()

let Middleware: Array<any> = []

// Sentry.io
// if (getEnvironment() === eAppEnv.PROD && "REACT_APP_RAVEN_URL" in process.env) {
//     Raven.config(process.env.REACT_APP_RAVEN_URL!).install()
//     Middleware.push(createRavenMiddleware(Raven))
// }

// Google Analytics
// if ("REACT_APP_GOOGLE_ANALYTICS_UA" in process.env) {
//     Middleware.push(AnalyticsMiddleware as any)
// }

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const store: Store<IStore> = createStore(
  reducers,
  composeEnhancers(responsiveStoreEnhancer, applyMiddleware(thunkMiddleware.withExtraArgument(ealapi), ...Middleware))
)

// const history = syncHistoryWithStore(browserHistory as any, store)

ReactDOM.render(
  <Provider store={store}>
    {/* For Google Analytics, add the onUpdate prop to <Router> */}
    {/* <Router history={history as any} onUpdate={"REACT_APP_GOOGLE_ANALYTICS_UA" in process.env ? fireAnalyticsTracking : undefined}> */}

    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

// Service Workers
// registerServiceWorker()
