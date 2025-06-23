from django.db import models

# Create your models here.
# invoice_app/models.py

import uuid
from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    company_name = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.company_name})" if self.company_name else self.name


class Invoice(models.Model):
    STATUS_DRAFT = 'draft'
    STATUS_SENT = 'sent'
    STATUS_PAID = 'paid'

    STATUS_CHOICES = (
        (STATUS_DRAFT, 'Draft'),
        (STATUS_SENT, 'Sent'),
        (STATUS_PAID, 'Paid'),
    )
    invoice_number = models.CharField(max_length=20, unique=True, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='invoices')
    due_date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    vat_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.client.name}"
    def total_amount(self):
        return sum(item.subtotal for item in self.items.all())


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='items')
    description = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def subtotal(self):
        return self.quantity * self.price

    def __str__(self):
        return f"{self.description} ({self.quantity} x {self.price})"


class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=50)
    date_paid = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Payment of {self.amount_paid} for {self.invoice.invoice_number}"
