import { CartModal, Footer, Header } from "../components";

export const PageLayout = ({ pageTitle, children, isCartModalOpen = false }) => {
  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${Header({ pageTitle })} ${isCartModalOpen ? CartModal() : ""}
      <main class="max-w-md mx-auto px-4 py-4">${children}</main>
      ${Footer()}
    </div>
  `;
};
