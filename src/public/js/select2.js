document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = ['typeAsset', 'area', 'building', 'state']; // Reemplaza estos con los IDs de tus dropdowns
  dropdowns.forEach((dropdownId) => {
    const element = document.getElementById(dropdownId);
    const choices = new Choices(element, {
      noResultsText: 'No se encontró un resultado con ese nombre'
    });
  });
});
