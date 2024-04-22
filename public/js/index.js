window.addEventListener("load", () => {
  document.querySelector(".preloader").remove();
  document.querySelector(".pre-loader").remove();
});
window.addEventListener("resize", filtersPosition);
function filtersPosition() {
  document.querySelector(".filters").style.top = `${
    document.querySelector(".navbar").offsetHeight - 1
  }px`;
}
filtersPosition();
setTimeout(() => {
  if (document.querySelector("[data-bs-dismiss]")) {
    document.querySelector("[data-bs-dismiss]").click();
  }
}, 1800);
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
if (document.querySelector(".home")) {
  document.querySelector(".home").addEventListener("click", () => {
    location.href = `${location.origin}/`;
  });
}
