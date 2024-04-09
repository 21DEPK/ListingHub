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

setTimeout(() => {
  if (document.querySelector("[data-bs-dismiss]")) {
    document.querySelector("[data-bs-dismiss]").click();
  }
}, 1600);

if (document.querySelector(".home")) {
  document.querySelector(".home").addEventListener("click", () => {
    location.href = `${location.origin}/`;
  });
}
