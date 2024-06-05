async function deleteAsset (idAsset) {
  if (confirm('Desear quitar tu vida a Esteban?')) {
    try {
      console.log({ idAsset });
      const res = await fetch(`/assets/delete/${idAsset}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      console.log(result);
      if (result.status === 200) {
        alert(result.message);
        window.location.href = '/assets/list';
      } else {
        alert(result.message);
        window.location.href = '/assets/list';
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Cancelado');
  }
}
