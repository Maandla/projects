from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)

class Project(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)

class BudgetLine(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    year = models.IntegerField()
    quarter = models.IntegerField()
    allocated = models.DecimalField(max_digits=12, decimal_places=2)

class Expenditure(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    date = models.DateField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True, null=True)

