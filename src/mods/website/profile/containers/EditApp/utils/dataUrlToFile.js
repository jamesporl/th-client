export default async function dataUrltoFile(dataUrl, filename, type) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type });
}
