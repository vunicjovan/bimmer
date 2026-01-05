import uuid

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

from .choices import AccountStatus, Country, Currency, Language, UserRole


def generate_platform_user_number() -> str:
    """Generate a unique UUID string for platform_user_number."""

    return str(uuid.uuid4())


class Address(models.Model):
    country = models.CharField(max_length=2, choices=Country.choices)
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

    def __str__(self) -> str:
        return f"{self.street_name} {self.house_number}, {self.city}, {self.country}"


class UserManager(BaseUserManager):
    def create_user(
        self,
        email: str,
        password: str | None = None,
        **extra_fields,
    ) -> "User":
        """
        Creates and saves a regular user.
        """

        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        current_timestamp = timezone.now()

        user.set_password(password)
        user.password_last_changed = current_timestamp
        user.registration_timestamp = current_timestamp

        user.save(using=self._db)

        return user

    def create_superuser(
        self,
        email: str,
        password: str | None = None,
        **extra_fields,
    ) -> "User":
        """
        Creates and saves a superuser.
        """

        extra_fields.setdefault("role", UserRole.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    # Basic info
    name = models.CharField(max_length=150)
    surname = models.CharField(max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)
    display_name = models.CharField(max_length=301, editable=False, db_index=True)
    username = models.CharField(max_length=150, unique=True, db_index=True)
    email = models.EmailField(unique=True, db_index=True)
    email_verified = models.BooleanField(default=False)
    password_last_changed = models.DateTimeField(null=True, blank=True)
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                r"^\+?[0-9]{7,15}$",
                "Enter a valid phone number,",
            ),
        ],
    )
    phone_number_verified = models.BooleanField(default=False)

    # Address relationship
    address = models.OneToOneField(
        Address,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="user",
    )

    role = models.CharField(
        max_length=10,
        choices=UserRole.choices,
        default=UserRole.USER,
    )
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
    platform_user_number = models.CharField(
        max_length=36,
        unique=True,
        default=generate_platform_user_number,
        db_index=True,
        editable=False,
    )
    preferred_language = models.CharField(
        max_length=10,
        choices=Language.choices,
        default=Language.EN,
    )
    preferred_currency = models.CharField(
        max_length=5,
        choices=Currency.choices,
        default=Currency.EUR,
    )
    notification_preferences = models.JSONField(default=dict, blank=True)

    # Timestamps
    registration_timestamp = models.DateTimeField(auto_now_add=True)
    first_login_timestamp = models.DateTimeField(null=True, blank=True)
    last_login_timestamp = models.DateTimeField(null=True, blank=True)
    last_profile_update_timestamp = models.DateTimeField(auto_now=True)
    failed_login_attempts = models.PositiveIntegerField(default=0)
    deleted_at = models.DateTimeField(null=True, blank=True, db_index=True)

    # Django internal fields: is_active = can login, is_staff = admin site access
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"  # Use email to log in
    REQUIRED_FIELDS = [  # Required when creating superusers
        "name",
        "surname",
        "username",
    ]

    def __str__(self) -> str:
        return f"{self.display_name} ({self.email})"

    def save(self, *args, **kwargs) -> None:
        # Always generate display_name
        self.display_name = f"{self.name} {self.surname}"
        super().save(*args, **kwargs)
