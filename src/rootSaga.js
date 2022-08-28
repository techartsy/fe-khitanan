import { all } from "redux-saga/effects";

import invitationSaga from "./sagas";

export default function* rootSaga() {
  yield all([invitationSaga()]);
}
