import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", { writable: true, value: (media: string) => ({ media, matches: false, addEventListener() {}, removeEventListener() {} }) });
HTMLDialogElement.prototype.showModal ??= function () { this.setAttribute("open", ""); };
HTMLDialogElement.prototype.close ??= function () { this.removeAttribute("open"); this.dispatchEvent(new Event("close")); };
