from typing import Dict

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Address, User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ("created_at", "updated_at")


class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "surname",
            "display_name",
            "username",
            "email",
            "email_verified",
            "phone_number",
            "phone_number_verified",
            "date_of_birth",
            "address",
            "role",
            "account_status",
            "platform_user_number",
            "preferred_language",
            "preferred_currency",
            "registration_timestamp",
        ]
        read_only_fields = [
            "id",
            "display_name",
            "platform_user_number",
            "registration_timestamp",
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
    )
    password_confirm = serializers.CharField(write_only=True, required=True)
    address = AddressSerializer(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "name",
            "surname",
            "username",
            "email",
            "password",
            "password_confirm",
            "phone_number",
            "date_of_birth",
            "address",
            "preferred_language",
            "preferred_currency",
        ]

    def validate(self, attrs: Dict) -> Dict:
        """Validate that passwords match."""

        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {
                    "password": "Password fields do not match.",
                }
            )

        return attrs

    def create(self, validated_data: Dict) -> User:
        # Remove password_confirm -> It's not needed anymore
        validated_data.pop("password_confirm")

        # Extract address if it's in payload
        address_data = validated_data.pop("address", None)

        # Create user instance
        user = User.objects.create_user(**validated_data)

        # Create address if it's provided and link it to the user
        if address_data:
            address = Address.objects.create(**address_data)
            user.address = address
            user.save()

        return user
