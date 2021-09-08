import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NoteForm from "./components/NoteForm/NoteForm.jsx";
import { NoteContext } from "./context/NoteContext.jsx";

function Router() {
  const { notes, getRedirectTo } = useContext(NoteContext);
  return (
    <Switch>
      <Route exact={true} path="/">
        <h1>No selected</h1>
      </Route>
      <Route path="/noexist">
        <h1>No exist</h1>
      </Route>
      {notes.map((i) =>
        i ? (
          <Route
            exact={true}
            key={i.id}
            path={`/${i.id}`}
            children={<NoteForm />}
          ></Route>
        ) : null
      )}
      {getRedirectTo() ? <Redirect to={`/${getRedirectTo()}`} /> : null}
      <Redirect from="*" to="/noexist" />
    </Switch>
  );
}

export default Router;
