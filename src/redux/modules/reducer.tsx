import * as Redux from "redux"
import { reducer as formReducer } from "redux-form"
import { routerReducer } from "react-router-redux"

import { responsiveStateReducer } from "redux-responsive"
import { responsiveDrawer } from "material-ui-responsive-drawer"

import { default as app, IModule as IAppModule } from "./app"

// const formReducer: any = form // Silencing TypeScript errors due to older @types/redux-form package

export interface IStore {
  app: IAppModule
  form: any
  browser: any
  responsiveDrawer: any
}

const rootReducer: Redux.Reducer<IStore> = Redux.combineReducers<IStore>({
  app,
  routing: routerReducer,
  form: formReducer.plugin({}),
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
})

export default rootReducer
