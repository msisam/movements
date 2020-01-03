// @flow

import React, { useCallback } from 'react'
import gql from "graphql-tag"
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  Card, 
  Table
} from "tabler-react"

import UpdateProductName from "./UpdateProductName"
import UpdateDescription from "./UpdateDescription"
import UpdateQuantity from "./UpdateQuantity"
import UpdatePrice from "./UpdatePrice"
import UpdateFinanceTaxRate from "./UpdateFinanceTaxRate"
import FinanceInvoiceItemDelete from "./FinanceInvoiceItemDelete"
import FinanceInvoiceItemAdd from "./FinanceInvoiceItemAdd"


export const UPDATE_INVOICE_ITEM = gql`
  mutation UpdateFinanceInvoiceItem($input: UpdateFinanceInvoiceItemInput!) {
    updateFinanceInvoiceItem(input: $input) {
      financeInvoiceItem {
        id
        productName
        description
        quantity
        price
        financeTaxRate {
          id
          name
        }
      }
    }
  }
`

function FinanceInvoiceEditItems ({ t, history, match, refetchInvoice, inputData }) {
  // function onDragEnd(result) {
  //   console.log('onDragEnd triggered...')
  //   console.log(result)
  //   const { destination, source, reason } = result
  //   console.log(source)
  //   console.log(destination)
  //   console.log(reason)
  // }

  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Card statusColor="blue">
        <Card.Header>
          <Card.Title>{t('general.items')}</Card.Title>
          <Card.Options>
            <FinanceInvoiceItemAdd />
          </Card.Options>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>{t("general.product")}</Table.ColHeader>
                <Table.ColHeader>{t("general.description")}</Table.ColHeader>
                <Table.ColHeader>{t("general.quantity_short_and_price")}</Table.ColHeader>
                <Table.ColHeader>{t("general.tax")}</Table.ColHeader>
                <Table.ColHeader>{t("general.total")}</Table.ColHeader>
                <Table.ColHeader></Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Droppable droppableId="invoice_items">
              {(provided, snapshot) => (
                  <tbody 
                    ref={provided.innerRef} 
                    {...provided.droppableProps} 
                  >
                    {inputData.financeInvoice.items.edges.map(({ node }, idx) => (
                      <Draggable 
                        draggableId={node.id}
                        index={idx}
                        key={node.id}
                      >
                        {(provided, snapshot) => (
                            <tr 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Table.Col>
                                <UpdateProductName initialValues={node} />
                              </Table.Col>
                              <Table.Col>
                                <UpdateDescription initialValues={node} />
                              </Table.Col>
                              <Table.Col>
                                <UpdateQuantity initialValues={node} />
                                <UpdatePrice initialValues={node} />
                              </Table.Col>
                              <Table.Col>
                                <UpdateFinanceTaxRate initialValues={node} inputData={inputData} />
                              </Table.Col>
                              <Table.Col>
                                <span className="pull-right">{node.totalDisplay}</span>
                              </Table.Col>
                              <Table.Col>
                                <FinanceInvoiceItemDelete node={node} />
                              </Table.Col>
                            </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
              )}
            </Droppable>
          </Table>
        </Card.Body>
      </Card>
    </DragDropContext>
  )
}


export default withTranslation()(withRouter(FinanceInvoiceEditItems))