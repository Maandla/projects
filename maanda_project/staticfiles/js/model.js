
document.addEventListener("DOMContentLoaded", function () {
    const modal = new bootstrap.Modal(document.getElementById('invoiceDetailModal'));
    const modalBody = document.getElementById('invoice-modal-body');

    document.querySelectorAll('.view-invoice-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const uuid = this.dataset.uuid;
            modalBody.innerHTML = '<div class="text-center text-muted">Loading...</div>';
            fetch(`/invoices/partial/${uuid}/`)
                .then(res => res.text())
                .then(html => {
                    modalBody.innerHTML = html;
                    modal.show();
                });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = new bootstrap.Modal(document.getElementById('editInvoiceModal'));
    const modalBody = document.getElementById('editInvoiceModalContent');

    document.querySelectorAll('.edit-invoice-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            modalBody.innerHTML = '<div class="modal-body text-center text-muted">Loading...</div>';
            
            fetch(this.href)
                .then(res => res.text())
                .then(html => {
                    modalBody.innerHTML = html;

                    // Run inline scripts manually
                    const scripts = modalBody.querySelectorAll("script");
                    scripts.forEach(oldScript => {
                        const newScript = document.createElement("script");
                        if (oldScript.src) {
                            newScript.src = oldScript.src;
                        } else {
                            newScript.textContent = oldScript.textContent;
                        }
                        document.body.appendChild(newScript);
                        document.body.removeChild(newScript);
                    });

                    // **YOUR INVOICE FORM JS: bind inputs & calculate totals**
                    bindInitialInputEvents();
                    calculateTotals();

                    modal.show();
                });
        });
    });
});

// Make sure these two functions exist in the global scope:
function calculateTotals() {
    const rows = document.querySelectorAll('.service-row');
    let subtotal = 0;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty')?.value) || 0;
        const price = parseFloat(row.querySelector('.price')?.value) || 0;
        subtotal += qty * price;
    });

    const vatEnabled = document.getElementById('include_vat')?.checked;
    const vat = vatEnabled ? subtotal * 0.15 : 0;
    const total = subtotal + vat;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('vat-amount').textContent = vat.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function bindInitialInputEvents() {
    document.querySelectorAll('.qty, .price').forEach(input => {
        input.addEventListener('input', calculateTotals);
    });

    const vatToggle = document.getElementById('include_vat');
    if (vatToggle) {
        vatToggle.addEventListener('change', calculateTotals);
    }
}



