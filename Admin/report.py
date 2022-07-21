from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from datetime import datetime, timedelta

from .models import Advisor, Reviewer
from Manifest.models import Review
from .serializer import AdvisorReviewSerealizer, ReviewerReviewSerealizer
# from .serializer import 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def advisorReport(request):
    if request.user.is_superuser or request.user.is_lead:
        month = (datetime.now().replace(day=1) - timedelta(days=1)).month
        print("advisor")
        advisors = Advisor.objects.all()
        for advisor in advisors:
            reviews = Review.objects.filter(advisor=advisor, created__month=month)
            advisor.reviews = reviews.count()
            advisor.students = reviews.distinct('manifest__student_name').count()
            advisor.save()
        serializer = AdvisorReviewSerealizer(advisors, many=True).data
        return Response(serializer)
    else:
        return Response({"message": "You are not authorized to get Advisors"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reviewerReport(request):
    if request.user.is_superuser or request.user.is_lead:
        month = (datetime.now().replace(day=1) - timedelta(days=1)).month
        print("reviewer")
        reviewers = Reviewer.objects.all()
        for reviewer in reviewers:
            reviews = Review.objects.filter(reviewer=reviewer, created__month=month)
            reviewer.reviews = reviews.count()
            reviewer.students = reviews.distinct('manifest__student_name').count()
            reviewer.save()
        serializer = ReviewerReviewSerealizer(reviewers, many=True).data
        return Response(serializer)
    else:
        return Response({"message": "You are not authorized to get Advisors"})