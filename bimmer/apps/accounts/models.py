from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone


class Address(models.Model):
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    street_name = models.CharField(max_length=100)
    house_number = models.CharField(max_length=20)
    building_name = models.CharField(max_length=50, null=True, blank=True)
    entrance = models.CharField(max_length=20, null=True, blank=True)
    floor = models.CharField(max_length=10, null=True, blank=True)
    door_number = models.CharField(max_length=10, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.street_name} {self.house_number}, {self.city}, {self.country}"


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a regular user.
        """

        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.password_last_changed = timezone.now()
        user.registration_timestamp = timezone.now()
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser.
        """

        extra_fields.setdefault("role", User.Role.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    # Basic info
    name = models.CharField(max_length=150)
    surname = models.CharField(max_length=150)
    display_name = models.CharField(max_length=301, editable=False, db_index=True)

    email = models.EmailField(unique=True, db_index=True)
    email_verified = models.BooleanField(default=False)

    username = models.CharField(max_length=150, unique=True, db_index=True)

    password_last_changed = models.DateTimeField(null=True, blank=True)

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        validators=[RegexValidator(r"^\+?[0-9]{7,15}$", "Enter a valid phone number,")],
    )
    phone_number_verified = models.BooleanField(default=False)

    date_of_birth = models.DateField(null=True, blank=True)

    # Address relationship
    address = models.OneToOneField(
        Address,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="user",
    )

    # Roles & status
    class Role(models.TextChoices):
        USER = "USER"
        ADMIN = "ADMIN"

    class AccountStatus(models.TextChoices):
        ACTIVE = "ACTIVE"
        SUSPENDED = "SUSPENDED"
        DELETED = "DELETED"

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)
    account_status = models.CharField(
        max_length=10,
        choices=AccountStatus.choices,
        default=AccountStatus.ACTIVE,
        db_index=True,
    )

    # Profile
    profile_picture = models.ImageField(
        upload_to="profile_pics/",
        null=True,
        blank=True,
    )
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    preferred_language = models.CharField(max_length=10, default="en")
    preferred_currency = models.CharField(max_length=5, default="USD")

    notification_preferences = models.JSONField(default=dict, blank=True)

    platform_user_number = models.BigIntegerField(
        unique=True,
        null=True,
        blank=True,
        db_index=True,
    )

    # Timestamps
    registration_timestamp = models.DateTimeField(auto_now_add=True)
    first_login_timestamp = models.DateTimeField(null=True, blank=True)
    last_login_timestamp = models.DateTimeField(null=True, blank=True)
    last_profile_update_timestamp = models.DateTimeField(auto_now=True)
    failed_login_attempts = models.PositiveIntegerField(default=0)

    deleted_at = models.DateTimeField(null=True, blank=True, db_index=True)

    # Django internal fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "surname", "username"]

    def __str__(self):
        return f"{self.display_name} ({self.email})"

    def save(self, *args, **kwargs):
        # Always generate display_name
        self.display_name = f"{self.name} {self.surname}"
        super().save(*args, **kwargs)
