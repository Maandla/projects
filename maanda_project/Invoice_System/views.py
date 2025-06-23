from django.shortcuts import render, redirect
from django.utils.crypto import get_random_string
from django.views.decorators.csrf import csrf_exempt
from .models import Client, Invoice, InvoiceItem
from django.contrib import messages
import datetime
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt  
from django.template.loader import get_template
from xhtml2pdf import pisa
from io import BytesIO
from decimal import Decimal
from django.views.decorators.csrf import csrf_exempt
import io
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.template.loader import get_template
from django.views.decorators.http import require_POST

def generate_invoice_number():
    today = datetime.date.today()
    return f"INV{today.strftime('%Y%m%d')}-{get_random_string(5).upper()}"

def create_invoice(request):
    if request.method == 'POST':
        client_name = request.POST.get('client_name')
        client_email = request.POST.get('client_email')
        client_company = request.POST.get('client_company')
        due_date = request.POST.get('due_date')
        notes = request.POST.get('invoice_notes')
        vat_enabled = request.POST.get('include_vat') == 'on'

        # Try to get existing client or create new one
        client, _ = Client.objects.get_or_create(
            email=client_email,
            defaults={
                'name': client_name,
                'company_name': client_company
            }
        )

        invoice = Invoice.objects.create(
            invoice_number=generate_invoice_number(),
            client=client,
            due_date=due_date,
            notes=notes,
            status='draft',
            vat_enabled=vat_enabled
        )

        descriptions = request.POST.getlist('service_description[]')
        quantities = request.POST.getlist('quantity[]')
        prices = request.POST.getlist('price[]')

        for desc, qty, price in zip(descriptions, quantities, prices):
            if desc and qty and price:
                InvoiceItem.objects.create(
                    invoice=invoice,
                    description=desc,
                    quantity=int(qty),
                    price=float(price)
                )

        messages.success(request, f"Invoice {invoice.invoice_number} created successfully as draft.")
        return redirect('invoices:invoice-list')

    return render(request, 'invoice_form.html')


from django.shortcuts import render
from .models import Invoice

from django.shortcuts import render
from .models import Invoice

from django.shortcuts import render
from .models import Invoice
from django.db.models import Sum, F, FloatField, ExpressionWrapper
from django.shortcuts import render
from .models import Invoice

def invoice_list(request):
    # Calculate total = sum(quantity * price) per invoice using annotate
    invoices = Invoice.objects.select_related('client').annotate(
        total=Sum(
            ExpressionWrapper(
                F('items__quantity') * F('items__price'),
                output_field=FloatField()
            )
        )
    ).order_by('-created_at')

    return render(request, 'invoice_list.html', {'invoices': invoices})

def invoice_view(request, uuid):
    invoice = get_object_or_404(Invoice, uuid=uuid)
    total = sum(item.subtotal for item in invoice.items.all())
    
    vat_amount = 0
    if invoice.vat_enabled:
        vat_amount = total * 15 / 115  # since total includes VAT already

    return render(request, 'invoice_detail.html', {
        'invoice': invoice,
        'total': total,
        'vat_amount': vat_amount,
    })
    

def edit_invoice(request, uuid):
    invoice = get_object_or_404(Invoice, uuid=uuid)
    if request.method == 'POST':

        invoice.due_date = request.POST.get('due_date')
        invoice.notes = request.POST.get('invoice_notes')
        invoice.vat_enabled = request.POST.get('include_vat') == 'on'
        invoice.save()
        invoice.client.name = request.POST.get('client_name')
        invoice.client.email = request.POST.get('client_email')
        invoice.client.company_name = request.POST.get('client_company')
        invoice.client.save()

        invoice.items.all().delete()

        descriptions = request.POST.getlist('service_description[]')
        quantities = request.POST.getlist('quantity[]')
        prices = request.POST.getlist('price[]')

        for desc, qty, price in zip(descriptions, quantities, prices):
            if desc.strip() == "":
                continue
            InvoiceItem.objects.create(
                invoice=invoice,
                description=desc,
                quantity=int(qty),
                price=float(price)
            )

        return redirect('invoices:invoice-list')

    return render(request, 'edit_invoice.html', {'invoice': invoice})

@csrf_exempt
def send_invoice(request):
    if request.method == 'POST':
        uuid = request.POST.get('invoice_uuid')  # Works with URLSearchParams

        invoice = get_object_or_404(Invoice, uuid=uuid)
        invoice.status = 'sent'
        invoice.save()

        items = invoice.items.all()
        subtotal = sum(item.subtotal for item in items)
        vat_amount = subtotal * Decimal('0.15') if invoice.vat_enabled else Decimal('0.00')
        total = subtotal + vat_amount

        context = {
            'invoice': invoice,
            'vat_amount': vat_amount,
            'total': total,
        }

        template = get_template("invoice_pdf.html")
        html = template.render(context)

        pdf_file = io.BytesIO()
        pisa_status = pisa.CreatePDF(html, dest=pdf_file)

        if pisa_status.err:
            return HttpResponse("PDF generation failed", status=500)

        pdf_file.seek(0)
        response = HttpResponse(pdf_file.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Invoice_{invoice.invoice_number}.pdf"'
        return response

def generate_invoice_pdf(invoice, context_extra={}):
    template = get_template("invoice_pdf.html")  # Copy your HTML into this template
    context = {"invoice": invoice, **context_extra}
    html = template.render(context)
    
    pdf_file = BytesIO()
    pisa_status = pisa.CreatePDF(html, dest=pdf_file)

    if pisa_status.err:
        return None
    pdf_file.seek(0)
    return pdf_file



@require_POST
def delete_invoice(request):
    uuid = request.POST.get('invoice_uuid')
    invoice = get_object_or_404(Invoice, uuid=uuid)
    invoice.items.all().delete()
    invoice.payments.all().delete()
    invoice.payments.all().delete()
    invoice.delete()
    messages.success(request, 'Invoice and all related records deleted successfully.')
    return redirect('invoices:invoice-list')


