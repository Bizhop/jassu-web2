import React from 'react'
import Select from 'react-select'

export const RenderTextInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group form-inline">
    <div className="row">
      <div className="col-md-3">
        <label className="form-control-label pull-right" htmlFor={input.name}>
          {label}
        </label>
      </div>
      <div className="col-md-9">
        <input className="form-control" {...input} type={type} />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  </div>
)
