from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class UserManager(BaseUserManager):
    def create_user(self, full_name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if not full_name:
            raise ValueError('Users must have a full name')

        user = self.model(
            full_name=full_name,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, full_name, email, password=None):
        user = self.create_user(
            full_name,
            email,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    full_name = models.CharField(max_length=50)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    picture = models.ImageField(
        upload_to='profile_pictures/%Y/%m/%d/',
        blank=True
    )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['full_name']

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.full_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
