// @flow

import React from 'react'
import { withTranslation } from 'react-i18next'
import { v4 } from 'uuid'
import { withRouter } from "react-router"
import { Form as FoForm, Field, ErrorMessage } from 'formik'


import {
  Button,
  Card,
  Form,
  Grid
} from "tabler-react"


// import CSDatePicker from "../../ui/CSDatePicker"
// import ISO_COUNTRY_CODES from "../../../tools/iso_country_codes"


const UserLoginForm = ({ t, history, isSubmitting, errors, values, return_url, setFieldTouched, setFieldValue }) => (
  <FoForm className="card" autoComplete="off">
      <Card.Body className="p-6">
        <Card.Title>
          {t('user.login.title')}
        </Card.Title>
        <Form.Group label={t('user.login.email')}>
          <Field type="text" 
                  name="email" 
                  placeholder={t('user.login.email_placeholder')}
                  className={(errors.email) ? "form-control is-invalid" : "form-control"} 
                  autoComplete="off" />
          <ErrorMessage name="email" component="span" className="invalid-feedback" />
        </Form.Group>
        <Form.Group label={t('general.password')}>
          <Field type="password" 
                  name="password" 
                  placeholder={t('user.login.password_placeholder')}
                  className={(errors.password) ? "form-control is-invalid" : "form-control"} 
                  autoComplete="off" />
          <ErrorMessage name="password" component="span" className="invalid-feedback" />
        </Form.Group>
        <Form.Footer>
          <Button 
            block
            color="primary"
            type="submit" 
            disabled={isSubmitting}
          >
            {t('general.login')}
          </Button>
        </Form.Footer>
      </Card.Body>
  </FoForm>
)

export default withTranslation()(withRouter(UserLoginForm))

