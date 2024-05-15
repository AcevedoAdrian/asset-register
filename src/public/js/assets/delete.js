async function deleteAsset (idAsset) {
  try {
    // console.log({ idCart, idProduct });
    console.log({ idAsset });
    const res = await fetch(`/assets/delete/${idAsset}`, {
      method: 'PUT'
    });
    const result = await res.json();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
