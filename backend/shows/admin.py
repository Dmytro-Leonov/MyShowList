from django.contrib import admin

from .models.country import Country
from .models.franchise import Franchise
from .models.franchise_show import FranchiseShow
from .models.genre import Genre
from .models.person import Person
from .models.show import Show
from .models.show_person import ShowPerson
from .models.user_show_rating import UserShowRating

from .forms import ShowForm


class ShowPersonInline(admin.TabularInline):
    model = ShowPerson
    extra = 1


class ShowAdmin(admin.ModelAdmin):
    form = ShowForm
    model = Show
    prepopulated_fields = {'slug': ('english_name',)}
    readonly_fields = ('times_rated', 'ratings_sum', 'rating')
    inlines = (ShowPersonInline,)
    filter_horizontal = ('genres', 'countries')


class FranchiseShowInline(admin.TabularInline):
    model = FranchiseShow
    extra = 1


class FranchiseAdmin(admin.ModelAdmin):
    model = Franchise
    inlines = (FranchiseShowInline,)


admin.site.register(Country)
admin.site.register(Franchise, FranchiseAdmin)
admin.site.register(FranchiseShow)
admin.site.register(Genre)
admin.site.register(Person)
admin.site.register(Show, ShowAdmin)
admin.site.register(ShowPerson)
admin.site.register(UserShowRating)
