from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from Batch.models import Batch, Group
from User.models import User, Department
from .models import Advisor, Lead, Location, Reviewer, Code
from .serializer import AdvisorFullSerealizer, AdvisorHalfSerializer, ReviewerSerializer, CodeSerializer, LeadSerealizer
from .utils import createDeparments
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAdvisorsNames(request):
    if request.user.is_lead or request.user.is_superuser:
        advisors = AdvisorHalfSerializer(Advisor.objects.all(), many=True)
        return Response(advisors.data)
    else:
        return Response({"message": "You are not authorized to get Advisors"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getReviewers(request):
    if request.user.is_lead or (request.user.is_staff and request.user.is_active) or request.user.is_superuser:
        reviewers = ReviewerSerializer(Reviewer.objects.all(), many=True)
        return Response(reviewers.data)
    else:
        return Response({"message": "You are not authorized to get Advisors"})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAdvisors(request):
    if request.user.is_lead or request.user.is_superuser:
        advisors = Advisor.objects.all()
        for advisor in advisors:
            advisor.batch = [ batch.name for batch in list(Batch.objects.filter(advisor=advisor))]
            advisor.group = Group.objects.filter(advisor=advisor)
            advisor.save()
        advisors_serializer = AdvisorFullSerealizer(advisors, many=True)
        code = Code.objects.all()
        code_serializer = CodeSerializer(code[0]).data if len(code) > 0 else {"code": None}
        return Response({"advisors":advisors_serializer.data,"link":code_serializer})
    else:
        return Response({"message": "You are not authorized to get Advisors"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def blockAdvisor(request):
    if request.user.is_lead or request.user.is_superuser:
        advisor = Advisor.objects.filter(id=request.data['id'])
        User.objects.filter(advisor=advisor[0]).update(is_active=False)
        return Response({"message": "Advisor deleted successfully"})
    else:
        return Response({"message": "You are not authorized to get Advisors"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createLead(request):
    if request.user.is_superuser:
        department = Department.objects.all().count()
        if department == 0:
            createDeparments()
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'],
                                   is_staff=False, is_lead=True, department=Department.objects.get(name=request.data['staff']))
        location = Location.objects.get(id=request.data['location'])
        Lead.objects.create(user=user, name=request.data['fullname'], phone=request.data['phone'], location=location)
        return Response({"message": "Lead created successfully"})
    else:
        return Response({"message": "You are not authorized to create Lead"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteLead(request):
    if request.user.is_superuser:
        lead = Lead.objects.filter(id=request.data['id'])[0]
        lead.user.delete()
        lead.delete()
        return Response({"message": "Lead deleted successfully"})
    else:
        return Response({"message": "You are not authorized to delete Lead"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getLeads(request):
    if request.user.is_superuser:
        leads = Lead.objects.all()
        serializer = LeadSerealizer(leads, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "You are not authorized to get Leads"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateLink(request):
    if request.user.is_superuser or request.user.is_lead:
        Code.objects.all().delete()
        code = Code.objects.create(code=request.data['link'])
        serializer = CodeSerializer(code).data
        return Response({"message": "Link updated successfully", "code": serializer})
    else:
        return Response({"message": "You are not authorized to update Link"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReviewer(request):
    if request.user.is_superuser or request.user.is_lead:
        Reviewer.objects.create(name=request.data['name'])
        return Response({"message": "Reviewer created successfully"})
    else:
        return Response({"message": "You are not authorized to create Reviewer"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteReviewer(request):
    if request.user.is_superuser or request.user.is_lead:
        Reviewer.objects.filter(id=request.data['id']).delete()
        return Response({"message": "Reviewer deleted successfully"})
    else:
        return Response({"message": "You are not authorized to delete Reviewer"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateReviewer(request):
    if request.user.is_superuser or request.user.is_lead:
        Reviewer.objects.filter(id=request.data['id']).update(name=request.data['name'])
        return Response({"message": "Reviewer updated successfully"})
    else:
        return Response({"message": "You are not authorized to update Reviewer"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createLocation(request):
    if request.user.is_superuser or request.user.is_lead:
        Location.objects.create(place=request.data['name'])
        return Response({"message": "Location created successfully"})
    else:
        return Response({"message": "You are not authorized to create Location"})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteLocation(request):
    if request.user.is_superuser or request.user.is_lead:
        Location.objects.filter(id=request.data['id']).delete()
        return Response({"message": "Location deleted successfully"})
    else:
        return Response({"message": "You are not authorized to delete Location"})