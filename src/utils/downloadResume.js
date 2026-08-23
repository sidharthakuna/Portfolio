/**
 * Triggers download of Sidhartha Kuna's resume PDF from the base URL.
 */
export function downloadResume() {
  const link = document.createElement("a");
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  link.href = `${baseUrl}Sidhartha_Kuna_Resume.pdf`;
  link.download = "Sidhartha_Kuna_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
