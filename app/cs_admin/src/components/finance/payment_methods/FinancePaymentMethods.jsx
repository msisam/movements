// @flow

import React from 'react'
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { v4 } from "uuid"
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"


import {
  Page,
  Grid,
  Icon,
  Dimmer,
  Badge,
  Button,
  Card,
  Container,
  Table
} from "tabler-react";
import SiteWrapper from "../../SiteWrapper"
import HasPermissionWrapper from "../../HasPermissionWrapper"
// import { confirmAlert } from 'react-confirm-alert'; // Import
import { toast } from 'react-toastify'

import ContentCard from "../../general/ContentCard"
import FinanceMenu from "../FinanceMenu"

import { GET_PAYMENT_METHODS_QUERY } from "./queries"

const ARCHIVE_PAYMENT_METHOD = gql`
  mutation ArchiveFinancePaymentMethod($input: ArchiveFinancePaymentMethodInput!) {
    archiveFinancePaymentMethod(input: $input) {
      financePaymentMethod {
        id
        archived
      }
    }
  }
`


const FinancePaymentMethods = ({ t, history, archived=false }) => (
  <SiteWrapper>
    <div className="my-3 my-md-5">
      <Container>
        <Page.Header title={t("finance.title")} />
        <Grid.Row>
          <Grid.Col md={9}>
            <Query query={GET_PAYMENT_METHODS_QUERY} variables={{ archived }}>
             {({ loading, error, data: {financePaymentMethods: payment_methods}, refetch, fetchMore }) => {
                // Loading
                if (loading) return (
                  <ContentCard cardTitle={t('finance.payment_methods.title')}>
                    <Dimmer active={true}
                            loader={true}>
                    </Dimmer>
                  </ContentCard>
                )
                // Error
                if (error) return (
                  <ContentCard cardTitle={t('finance.payment_methods.title')}>
                    <p>{t('finance.payment_methods.error_loading')}</p>
                  </ContentCard>
                )
                const headerOptions = <Card.Options>
                  <Button color={(!archived) ? 'primary': 'secondary'}  
                          size="sm"
                          onClick={() => {archived=false; refetch({archived});}}>
                    {t('general.current')}
                  </Button>
                  <Button color={(archived) ? 'primary': 'secondary'} 
                          size="sm" 
                          className="ml-2" 
                          onClick={() => {archived=true; refetch({archived});}}>
                    {t('general.archive')}
                  </Button>
                </Card.Options>
                
                // Empty list
                if (!payment_methods.edges.length) { return (
                  <ContentCard cardTitle={t('finance.payment_methods.title')}
                               headerContent={headerOptions}>
                    <p>
                    {(!archived) ? t('finance.payment_methods.empty_list') : t("finance.payment_methods.empty_archive")}
                    </p>
                   
                  </ContentCard>
                )} else {   
                // Life's good! :)
                return (
                  <ContentCard cardTitle={t('finance.payment_methods.title')}
                               headerContent={headerOptions}
                               pageInfo={payment_methods.pageInfo}
                               onLoadMore={() => {
                                fetchMore({
                                  variables: {
                                    after: payment_methods.pageInfo.endCursor
                                  },
                                  updateQuery: (previousResult, { fetchMoreResult }) => {
                                    const newEdges = fetchMoreResult.financePaymentMethods.edges
                                    const pageInfo = fetchMoreResult.financePaymentMethods.pageInfo

                                    return newEdges.length
                                      ? {
                                          // Put the new payment_methods at the end of the list and update `pageInfo`
                                          // so we have the new `endCursor` and `hasNextPage` values
                                          financePaymentMethods: {
                                            __typename: previousResult.financePaymentMethods.__typename,
                                            edges: [ ...previousResult.financePaymentMethods.edges, ...newEdges ],
                                            pageInfo
                                          }
                                        }
                                      : previousResult
                                  }
                                })
                              }} >
                    <Table>
                          <Table.Header>
                            <Table.Row key={v4()}>
                              <Table.ColHeader>{t('general.name')}</Table.ColHeader>
                              <Table.ColHeader>{t('finance.code')}</Table.ColHeader>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                              {payment_methods.edges.map(({ node }) => (
                                <Table.Row key={v4()}>
                                  <Table.Col key={v4()}>
                                    {node.name}
                                  </Table.Col>
                                  <Table.Col key={v4()}>
                                    {node.code}
                                  </Table.Col>
                                  <Table.Col className="text-right" key={v4()}>
                                    {(node.archived) ? 
                                      <span className='text-muted'>{t('general.unarchive_to_edit')}</span> :
                                      <Button className='btn-sm' 
                                              onClick={() => history.push("/finance/paymentmethods/edit/" + node.id)}
                                              color="secondary">
                                        {t('general.edit')}
                                      </Button>
                                    }
                                  </Table.Col>
                                  {(node.systemMethod) ? 
                                    <Table.Col></Table.Col> :
                                    <Mutation mutation={ARCHIVE_PAYMENT_METHOD} key={v4()}>
                                      {(archivePaymentMethod, { data }) => (
                                        <Table.Col className="text-right" key={v4()}>
                                          <button className="icon btn btn-link btn-sm" 
                                            title={t('general.archive')} 
                                            href=""
                                            onClick={() => {
                                              console.log("clicked archived")
                                              let id = node.id
                                              archivePaymentMethod({ variables: {
                                                input: {
                                                  id,
                                                  archived: !archived
                                                }
                                          }, refetchQueries: [
                                              {query: GET_PAYMENT_METHODS_QUERY, variables: {"archived": archived }}
                                          ]}).then(({ data }) => {
                                            console.log('got data', data);
                                            toast.success(
                                              (archived) ? t('general.unarchived'): t('general.archived'), {
                                                position: toast.POSITION.BOTTOM_RIGHT
                                              })
                                          }).catch((error) => {
                                            toast.error((t('general.toast_server_error')) + ': ' +  error, {
                                                position: toast.POSITION.BOTTOM_RIGHT
                                              })
                                            console.log('there was an error sending the query', error);
                                          })
                                          }}>
                                            <Icon prefix="fa" name="inbox" />
                                          </button>
                                        </Table.Col>
                                      )}
                                    </Mutation>
                                  }
                                </Table.Row>
                              ))}
                          </Table.Body>
                        </Table>
                  </ContentCard>
                )}}
             }
            </Query>
          </Grid.Col>
          <Grid.Col md={3}>
            <HasPermissionWrapper permission="add"
                                  resource="financepaymentmethod">
              <Button color="primary btn-block mb-6"
                      onClick={() => history.push("/finance/paymentmethods/add")}>
                <Icon prefix="fe" name="plus-circle" /> {t('finance.payment_methods.add')}
              </Button>
            </HasPermissionWrapper>
            <FinanceMenu active_link='payment_methods'/>
          </Grid.Col>
        </Grid.Row>
      </Container>
    </div>
  </SiteWrapper>
);

export default withTranslation()(withRouter(FinancePaymentMethods))