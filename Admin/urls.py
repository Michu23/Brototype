from django.urls import path
from . import views



urlpatterns = [
    path('view/advisors', views.getAdvisors, name='get_advisors'),
    path('view/reviewers', views.getReviewers, name='get_reviewers'),
    path('block/advisor', views.blockAdvisor, name='block_reviewers'),
    path('view/advisors/names', views.getAdvisorsNames, name='get_advisors_names'),
    path('view/leads', views.getLeads, name='get_leads'),
    path('create/lead', views.createLead, name='create_leads'),
    path('delete/lead', views.deleteLead, name='delete_leads'),
    path('update/link', views.updateLink, name='update_link'),
    path('create/reviewer', views.createReviewer, name='create_reviewers'),
    path('delete/reviewer', views.deleteReviewer, name='delete_reviewers'),
    path('update/reviewer', views.updateReviewer, name='update_reviewers'),
    path('create/location', views.createLocation, name='create_location'),
    path('delete/location', views.deleteLocation, name='delete_location'),
]