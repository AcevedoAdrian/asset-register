// Initiate the updateAsset function when the form is submitted
async function updateAsset (idAsset) {
  const form = document.querySelector('#formEditAsset');
  const data = {};
  new FormData(form).forEach((value, key) => data[key] = value);
  const json = JSON.stringify(data);
  console.log(json);
  try {
    const res = await fetch(`/assets/edit/${idAsset}`, {
      method: 'PUT',
      body: json
    }
    );

    const result = await res.json();
    if (result.status === 200) {
      alert(result.message);
      window.location.href = '/assets/list';
    }
  } catch (error) {
    console.log(error);
  }
}
