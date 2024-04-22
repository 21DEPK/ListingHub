window.addEventListener("load", () => {
  document.querySelector(".preloader").remove();
  document.querySelector(".pre-loader").remove();
});

function loading(seconds) {
  let a = Date.now();
  let b = Date.now() + +seconds;
  for (let i = 0; i < b; ) {
    i = Date.now();
  }
  let c = Date.now();
  console.log(
    `${
      (c - a) / 1000
    } seconds Loading animation and it is intentionally injected in the code only on home page.`
  );
}
location.pathname === "/listings" ? loading(1200) : {};

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
