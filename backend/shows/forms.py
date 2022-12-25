from django import forms
from django.core.exceptions import ValidationError


class ShowForm(forms.ModelForm):
    def clean(self):
        premiere_date = self.data['premiere_date']
        finale_date = self.data['finale_date']
        if finale_date and premiere_date > finale_date:
            raise ValidationError({'finale_date': 'Finale date cannot be before premiere date date.'})
