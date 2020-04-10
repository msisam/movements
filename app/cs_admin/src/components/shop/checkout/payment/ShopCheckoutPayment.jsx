// @flow

import React, {Component } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import {
  Card,
  Grid,
  Icon,
  Table,
} from "tabler-react";
import ShopCheckoutPaymentBase from "./ShopCheckoutPaymentBase"

import { GET_ORDER_QUERY } from "./queries"
// import { CREATE_ORDER } from "../../queries"


function ShopCheckoutPayment({ t, match, history }) {
  const title = t("shop.home.title")
  const id = match.params.id
  const { loading, error, data } = useQuery(GET_ORDER_QUERY, {
    variables: { id: id }
  })

  // const [createOrder, { data: createOrderData }] = useMutation(CREATE_ORDER)


  if (loading) return (
    <ShopCheckoutPaymentBase title={title} >
      {t("general.loading_with_dots")}
    </ShopCheckoutPaymentBase>
  )
  if (error) return (
    <ShopCheckoutPaymentBase title={title}>
      {t("shop.classpass.error_loading")}
    </ShopCheckoutPaymentBase>
  )

  console.log(data)
  const order = data.financeOrder
  console.log(order)
  const orderItems = order.items.edges
  console.log(orderItems)

  return (
    <ShopCheckoutPaymentBase title={title}>
        <Grid.Row>
          <Grid.Col md={6}>
            <Card title={t("shop.checkout.payment.order_received")}>
              <Card.Body>
                <h5 className={"mb-4"}>{t("shop.checkout.payment.order_received_subheader")}</h5>
                {t("shop.checkout.payment.order_received_to_payment_explanation")} <br />
                {t("shop.checkout.payment.order_received_to_payment_text")}

              
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card title={t("shop.checkout.payment.order_summary")}>
              <Card.Body>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader>{t('general.item')}</Table.ColHeader>
                      <Table.ColHeader>{t('general.price')}</Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {orderItems.map(({ node }) => (
                      <Table.Row>
                        <Table.Col>
                          {node.productName} <br /> 
                          <span className="text-muted">
                            {node.description}
                          </span>
                        </Table.Col>
                        <Table.Col>{node.totalDisplay}</Table.Col>
                      </Table.Row>      
                    ))}
                    <Table.Row className="bold">
                      <Table.Col>
                        {t("general.total")}
                      </Table.Col>
                      <Table.Col>
                        {order.totalDisplay}
                      </Table.Col>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
    </ShopCheckoutPaymentBase>
  )
}


export default withTranslation()(withRouter(ShopCheckoutPayment))


{/* <Grid.Col sm={6} lg={3}>
<PricingCard active>
  <PricingCard.Category>{"Premium"}</PricingCard.Category>
  <PricingCard.Price>{"$49"} </PricingCard.Price>
  <PricingCard.AttributeList>
    <PricingCard.AttributeItem>
      <strong>10 </strong>
      {"Users"}
    </PricingCard.AttributeItem>
    <PricingCard.AttributeItem hasIcon available>
      {"Sharing Tools"}
    </PricingCard.AttributeItem>
    <PricingCard.AttributeItem hasIcon available>
      {"Design Tools"}
    </PricingCard.AttributeItem>
    <PricingCard.AttributeItem hasIcon available={false}>
      {"Private Messages"}
    </PricingCard.AttributeItem>
    <PricingCard.AttributeItem hasIcon available={false}>
      {"Twitter API"}
    </PricingCard.AttributeItem>
  </PricingCard.AttributeList>
  <PricingCard.Button active>{"Choose plan"} </PricingCard.Button>
</PricingCard>
</Grid.Col> */}