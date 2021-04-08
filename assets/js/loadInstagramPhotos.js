
(function () {
  new InstagramFeed({
    username: "barbearia_r_m",
    callback: function (data) {
      setTimeout(() => {
        addImagesInDOM(data)
      }, 1000)
    },
  });
  
  const getImageList = (data) => {
    return data.edge_owner_to_timeline_media.edges.map(
      (edge) => { 
        return {
          photo: edge.node.display_url,
          alt: edge.node.edge_media_to_caption.edges[0].node.text
        }
      }
    );
  }
  
  const template = (image) => {
    return `
      <div class="fotos__item">
        <img src="${image.photo}" alt="${image.alt}" loading="lazy">
      </div>
    `
  }
  
  const addImagesInDOM = (data) => {
    const imageList = getImageList(data);
    const photoContainer = document.querySelector('[data-photo-grid]');
  
    photoContainer.innerHTML = `${imageList.map(image => {
      return template(image)
    }).join('')}`;
  }
})();
