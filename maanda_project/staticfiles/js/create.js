function addServiceRow() {
    const container = document.getElementById('service-items');
    const row = document.createElement('div');
    row.classList.add('row', 'g-3', 'mb-3', 'service-row');

    row.innerHTML = `
        <div class="col-md-6">
            <input type="text" name="service_description[]" class="form-control" placeholder="Description" required>
        </div>
        <div class="col-md-2">
            <input type="number" name="quantity[]" class="form-control qty" placeholder="Qty" min="1" required>
        </div>
        <div class="col-md-3">
            <input type="number" step="0.01" name="price[]" class="form-control price" placeholder="Price (ZAR)" required>
        </div>
        <div class="col-md-1 d-flex align-items-center">
            <button type="button" class="btn btn-danger btn-sm" onclick="removeRow(this)">✖</button>
        </div>
    `;

    container.appendChild(row);
    calculateTotals(); // Recalculate when row is added
}

function removeRow(button) {
    const row = button.closest('.service-row');
    if (row) row.remove();
    calculateTotals(); // Recalculate when row is removed
}

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

document.addEventListener('input', (e) => {
    if (e.target.classList.contains('qty') || e.target.classList.contains('price') || e.target.id === 'include_vat') {
        calculateTotals();
    }
});

window.onload = calculateTotals;