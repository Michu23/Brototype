from User.models import Department
def createDeparments():
    departments = ['Advisor', 'Communication', 'Finance', 'Lead', 'Placement', 'Student']
    for department in departments:
        Department.objects.create(name=department)