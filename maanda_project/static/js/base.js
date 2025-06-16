
////sidebar
document.querySelectorAll('.toggle-submenu').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const parentLi = this.closest('.has-submenu');
      parentLi.classList.toggle('open');
    });
  });

  //////
  
$(document).ready(function () {
  $('#studentScores').DataTable();
});