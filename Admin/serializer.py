from rest_framework import serializers
from .models import Advisor, Reviewer, Code, Lead
from User.serializer import UserSerealizer, ProfileSerealizer

class AdvisorSerializer(serializers.ModelSerializer):
    user = UserSerealizer()
    profile = ProfileSerealizer()
    class Meta:
        model = Advisor
        fields = '__all__'

class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewer
        fields = '__all__'

class  AdvisorHalfSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    class Meta:
        model = Advisor
        fields = ('id', 'username')

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = '__all__'

class LeadSerealizer(serializers.ModelSerializer):
    user = UserSerealizer()
    location = serializers.CharField(source='location.place')
    class Meta:
        model = Lead
        fields = '__all__'

class AdvisorFullSerealizer(serializers.ModelSerializer):
    batch = serializers.ListField()
    username = serializers.CharField(source='user.username')
    groups = serializers.CharField(source='group.count', read_only=True)
    class Meta:
        model = Advisor
        fields = ('id', 'username', 'batch', 'groups')

class AdvisorReviewSerealizer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    reviews = serializers.CharField()
    students = serializers.CharField()
    class Meta:
        model = Advisor
        fields = ('id', 'username', 'reviews', 'students')

class ReviewerReviewSerealizer(serializers.ModelSerializer):
    reviews = serializers.CharField()
    students = serializers.CharField()
    class Meta:
        model = Reviewer
        fields = ('id', 'name', 'reviews', 'students')