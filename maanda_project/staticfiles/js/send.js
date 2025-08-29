document.addEventListener('DOMContentLoaded', () => {
  const sendInvoiceModalEl = document.getElementById('sendInvoiceModal');
  const sendInvoiceModal = new bootstrap.Modal(sendInvoiceModalEl);
  let currentInvoiceUuid = null;

  // When modal is triggered, populate data
  sendInvoiceModalEl.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    currentInvoiceUuid = button.getAttribute('data-uuid');
    const clientName = button.getAttribute('data-name');
    const clientEmail = button.getAttribute('data-email');

    document.getElementById('modalClientName').textContent = clientName;
    document.getElementById('modalClientEmail').textContent = clientEmail;
  });

  // On form submit (Send button)
  document.getElementById('sendInvoiceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!currentInvoiceUuid) {
      alert("Invoice UUID missing.");
      return;
    }

    // Send the request
    fetch("/invoices/send/", {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: new URLSearchParams({ invoice_uuid: currentInvoiceUuid }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      return response.blob(); // Expecting PDF
    })
    .then(blob => {
      sendInvoiceModal.hide(); // Close the modal

      // Download PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice_${currentInvoiceUuid}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Optional: Reload page to update status
      setTimeout(() => location.reload(), 1000);
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error sending invoice: " + error.message);
    });
  });

  // Get CSRF token from cookie
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
