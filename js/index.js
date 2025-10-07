"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll('.item');
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add('fade-in');
      }, index * 300);
    });
  });