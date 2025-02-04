document.querySelector('button').addEventListener('click', async () => {
  const inputKeyword = document.getElementById('input1').value.trim();
  const inputNumber = parseInt(document.getElementById('input2').value, 10);


  if (!inputKeyword) {
    alert('Please enter a search keyword!');
    return;
  }
  if (isNaN(inputNumber) || inputNumber < 2) {
    alert('Please enter a number of images greater than or equal to 2!');
    return;
  }

  const API_KEY = '37087275-fe41d61c9a83317d8062718f0';
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(inputKeyword)}&per_page=${inputNumber}`;

  try {

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch images from Pixabay API');
    }
    const data = await response.json();


    const content = document.getElementById('content');
    content.innerHTML = '<h1>The Image Gallery</h1>'; 
    data.hits.forEach(image => {
      const imgBlock = document.createElement('div');
      imgBlock.innerHTML = `
        <img src="${image.largeImageURL}" alt="${image.tags}" style="width:200px; height:auto;">
        <p><strong>Downloads:</strong> ${image.downloads}</p>
        <p><strong>Large Image URL:</strong> <a href="${image.largeImageURL}" target="_blank">${image.largeImageURL}</a></p>
        <p><strong>Image Likes:</strong> ${image.likes}</p>
        <p><strong>Tags:</strong> ${image.tags}</p>
        <p><strong>Image Type:</strong> ${image.type}</p>
        <p><strong>User Name:</strong> ${image.user}</p>
        <p><strong>URL:</strong> <a href="${image.pageURL}" target="_blank">View on Pixabay</a></p>
      `;
      content.appendChild(imgBlock);
    });
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
