async function deleteAsset (idAsset) {
  if (confirm('Desear eliminar este Bien?')) {
    try {
      console.log({ idAsset });
      const res = await fetch(`/assets/delete/${idAsset}`, {
        method: 'PUT'
      });
      const result = await res.json();
      if (result.status === 200) {
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
