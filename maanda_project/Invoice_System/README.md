
# Invoice Management App

A Django-based web app to create, edit, view, send, and download invoices as PDFs with a smooth user experience via Bootstrap modals.

## Features

- List all invoices with status badges (`Draft`, `Sent`, `Paid`)
- Create and edit invoices
- View invoice details in a modal popup
- Send invoices via modal confirmation:
  - Marks invoice as `Sent`
  - Generates a PDF of the invoice dynamically
  - Closes the modal and automatically downloads the PDF
- Responsive UI with Bootstrap 5
- CSRF protection and secure AJAX POST requests

## Requirements

- Python 3.8+
- Django 4.x+
- xhtml2pdf (`pip install xhtml2pdf`)
- Bootstrap 5 (loaded via static files or CDN)

## Installation

1. Clone the repo and navigate into it:

   ```bash
   git clone <repo-url>
   cd invoice-app
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```bash
   python manage.py migrate
   ```

5. Run the development server:

   ```bash
   python manage.py runserver
   ```

6. Open `http://localhost:8000/invoices/` in your browser.

## Usage

- Navigate to the Invoices page to view all invoices.
- Click **+ New Invoice** to create a new invoice.
- For invoices in `Draft` status:
  - Use **Edit** to modify invoice details.
  - Click **Send** to open a confirmation modal.
- Confirming **Send**:
  - Sends a POST request to mark invoice as sent.
  - Generates the PDF invoice.
  - Closes the modal and triggers automatic PDF download.
  - Refreshes the page to update invoice status.

## Important Files

- `templates/invoice.html` — Main invoice list and modals HTML.
- `templates/invoice_pdf.html` — HTML template used to generate PDF.
- `static/js/send.js` — JavaScript handling modal and PDF download.
- `views.py` — Contains `send_invoice` view for handling invoice sending and PDF generation.
- `utils.py` — Utility for generating invoice PDF (optional helper).

## Customization

- Modify `invoice_pdf.html` to change PDF layout and styles.
- Adjust Bootstrap modal styles or sizes in `invoice.html`.
- Extend `send_invoice` view to email the PDF or save it to disk/cloud.

## Troubleshooting

- **CSRF Errors**: Ensure CSRF token is present in cookies and sent via headers in AJAX.
- **PDF Generation Issues**: Verify `invoice_pdf.html` is valid HTML and all context variables exist.
- **Network Errors**: Check Django URL routing matches AJAX fetch URL.
- Use browser dev tools (Console & Network tabs) and Django logs for debugging.

