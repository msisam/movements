import datetime


from django.utils.translation import gettext as _
from django.utils import timezone
from django.db.models import Q, FilteredRelation, OuterRef, Subquery

import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError
from graphql_relay import to_global_id

from ..dudes import InsightClassAttendanceDude
from ..models import ScheduleItem

from ..modules.gql_tools import get_rid, require_login_and_permission


class ClassAttendanceYearCountType(graphene.ObjectType):
    description = graphene.String()
    data_current = graphene.List(graphene.Int)
    data_previous = graphene.List(graphene.Int)
    year = graphene.Int()
    schedule_item = graphene.ID()

    def resolve_description(self, info):
        return _("class_attendance_year_count")

    def resolve_data_current(self, info):
        insight_class_attendance_dude = InsightClassAttendanceDude()
        year = self.year
        if not year:
            year = timezone.now().year

        data = insight_class_attendance_dude.get_attendance_count_recurring_class_year(self.schedule_item, self.year)
        counts = []
        for week in data:
            counts.append(data[week])

        return counts

    def resolve_data_previous(self, info):
        insight_class_attendance_dude = InsightClassAttendanceDude()
        year = self.year
        if not year:
            year = timezone.now().year

        data = insight_class_attendance_dude.get_attendance_count_recurring_class_year(self.schedule_item, self.year-1)
        counts = []
        for week in data:
            counts.append(data[week])

        return counts


class InsightClassAttendanceQuery(graphene.ObjectType):
    insight_class_attendance_count_year = graphene.Field(ClassAttendanceYearCountType,
                                                         year=graphene.Int(),
                                                         schedule_item=graphene.ID())

    def resolve_insight_class_attendance_count_year(
            self,
            info,
            year=graphene.Int(required=True, default_value=timezone.now().year),
            schedule_item=graphene.ID(required=True)
    ):
        user = info.context.user
        require_login_and_permission(user, 'costasiella.view_scheduleitemattendance')

        rid = get_rid(schedule_item)
        schedule_item = ScheduleItem.objects.filter(id=rid.id).first()
        if not schedule_item:
            raise Exception('Invalid ScheduleItem ID!')

        class_attendance_year_count = ClassAttendanceYearCountType()
        class_attendance_year_count.year = year
        class_attendance_year_count.schedule_item = schedule_item

        return class_attendance_year_count
