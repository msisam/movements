# from graphql.error.located_error import GraphQLLocatedError
import datetime
import graphql

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.utils import timezone
from django.test import TestCase
from graphene.test import Client

# Create your tests here.
from django.contrib.auth.models import AnonymousUser

from . import factories as f
from .helpers import execute_test_client_api_query
from .. import models
from .. import schema
from ..modules.finance_tools import display_float_as_amount
from ..modules.validity_tools import display_validity_unit

from graphql_relay import to_global_id


class GQLInsightRevenueClasspasses(TestCase):
    # https://docs.djangoproject.com/en/2.1/topics/testing/overview/
    def setUp(self):
        # This is run before every test
        self.admin_user = f.AdminUserFactory.create()
        self.anon_user = AnonymousUser()

        self.permission_view = 'view_insightrevenue'

        finance_invoice_item = f.FinanceInvoiceItemFactory.create()
        finance_invoice_item.account_classpass = f.AccountClasspassFactory.create(
            account=finance_invoice_item.finance_invoice.account
        )
        finance_invoice_item.save()
        finance_invoice = finance_invoice_item.finance_invoice
        finance_invoice.date_sent = datetime.date(2020, 1, 1)
        finance_invoice.status = 'SENT'
        finance_invoice.update_amounts()
        finance_invoice.save()
        self.finance_invoice = finance_invoice

        self.variables_query = {
            'year': 2020
        }   

        self.query_revenue_total = '''
  query InsightRevenueClasspasses($year: Int!) {
    insightRevenueClasspasses(year: $year) {
      description
      year
      total
      subtotal
      tax
    }
  }
'''

    def tearDown(self):
        # This is run after every test
        pass

    def test_query_revenue_total(self):
        """ Query total revenue for classpasses for a year """
        query = self.query_revenue_total

        executed = execute_test_client_api_query(query, self.admin_user, variables=self.variables_query)
        data = executed.get('data')

        self.assertEqual(data['insightRevenueClasspasses']['description'], 'revenue_total_classpasses')
        self.assertEqual(data['insightRevenueClasspasses']['year'], self.variables_query['year'])

        # Total
        self.assertEqual(data['insightRevenueClasspasses']['total'][0], format(self.finance_invoice.total, ".2f"))
        # Check data for other months
        for i in range(1, 12):
            self.assertEqual(data['insightRevenueClasspasses']['total'][i], '0')

        # Subtotal
        self.assertEqual(data['insightRevenueClasspasses']['subtotal'][0],
                         format(self.finance_invoice.subtotal, ".2f"))
        # Check data for other months
        for i in range(1, 12):
            self.assertEqual(data['insightRevenueClasspasses']['subtotal'][i], '0')

        # Total
        self.assertEqual(data['insightRevenueClasspasses']['tax'][0],
                         format(self.finance_invoice.tax, ".2f"))
        # Check data for other months
        for i in range(1, 12):
            self.assertEqual(data['insightRevenueClasspasses']['tax'][i], '0')

    def test_query_total_permission_denied(self):
        """ Query total revenue for classpassesfor a year - check permission denied """
        query = self.query_revenue_total

        # Create regular user
        user = self.finance_invoice.account
        executed = execute_test_client_api_query(query, user, variables=self.variables_query)
        errors = executed.get('errors')

        self.assertEqual(errors[0]['message'], 'Permission denied!')

    def test_query_total_permission_granted(self):
        """ Query total revenue for classpasses for a year - check permission granted """
        query = self.query_revenue_total

        # Create regular user
        user = self.finance_invoice.account
        permission = Permission.objects.get(codename=self.permission_view)
        user.user_permissions.add(permission)
        user.save()

        executed = execute_test_client_api_query(query, user, variables=self.variables_query)
        data = executed.get('data')

        self.assertEqual(data['insightRevenueClasspasses']['year'], self.variables_query['year'])

    def test_query_total_anon_user(self):
        """ Query total revenue for a year - anon user """
        query = self.query_revenue_total

        executed = execute_test_client_api_query(query, self.anon_user, variables=self.variables_query)
        errors = executed.get('errors')
        self.assertEqual(errors[0]['message'], 'Not logged in!')
