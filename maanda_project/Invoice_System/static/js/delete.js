document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-invoice-btn");
    const deleteUuidInput = document.getElementById("delete-invoice-uuid");
    const deleteClientName = document.getElementById("deleteClientName");

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const uuid = button.getAttribute("data-uuid");
            const name = button.getAttribute("data-name");

            deleteUuidInput.value = uuid;
            deleteClientName.textContent = name;
        });
    });
});

