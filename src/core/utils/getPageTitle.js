export default function getPageTitle(title) {
  if (!title) {
    return 'TechHustlers PH - Local Tech Products in One Place';
  }
  return `${title} - TechHustlers PH`;
}
