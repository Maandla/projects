document.addEventListener('DOMContentLoaded', () => {
  const sendInvoiceModalEl = document.getElementById('sendInvoiceModal');
  const sendInvoiceModal = new bootstrap.Modal(sendInvoiceModalEl);
  let currentInvoiceUuid = null;

  // When modal is about to be shown, populate client info and store uuid
  sendInvoiceModalEl.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget; // Element that triggered the modal
    currentInvoiceUuid = button.getAttribute('data-uuid');
    const clientName = button.getAttribute('data-name');
    const clientEmail = button.getAttribute('data-email');

    document.getElementById('modalClientName').textContent = clientName;
    document.getElementById('modalClientEmail').textContent = clientEmail;
  });

  // Confirm Send button
  document.getElementById('confirmSendBtn').addEventListener('click', () => {
    if (!currentInvoiceUuid) return;

    fetch("{% url 'invoices:send-invoice' %}", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify({ invoice_uuid: currentInvoiceUuid }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => {
        sendInvoiceModal.hide();
        if (data.success) {
          location.reload(); // Refresh page after successful send
        } else {
          alert('Failed to send invoice.');
        }
      })
      .catch(error => alert('Error: ' + error.message));
  });

  // Helper to get CSRF cookie
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const c = cookie.trim();
        if (c.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(c.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});
