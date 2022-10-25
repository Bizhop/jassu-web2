import React from "react"
import { Field, Form } from "react-final-form"

import { RenderTextInput } from "../shared/FormInput"

const UpdateUserForm = props => (
  <Form onSubmit={props.onSubmit} initialValues={props.user}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit}>
        <Field name="nickname" label="Nickname" type="text" component={RenderTextInput} />
        <button type="submit" className="btn btn-primary" disabled={submitting || pristine}>
          Päivitä käyttäjä
        </button>
      </form>
    )}
  </Form>
)

export default UpdateUserForm
