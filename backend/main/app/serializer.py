from rest_framework import serializers
from .models import Users, UrlCheckResults
from ml.dataset.url_model import predict_url

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