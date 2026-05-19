from rest_framework import serializers
from .models import Users, UrlCheckResults, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
    def create(self, validated_data):
        user = Users(
            username = validated_data['username'],
            email = validated_data['email'],
            image = validated_data.get('image')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'email']


class UrlCheckRequestSerializer(serializers.Serializer):
    url = serializers.URLField(required=True)

    
class UrlCheckResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlCheckResults
        fields = '__all__'


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['text', 'score']


class ReviewResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
