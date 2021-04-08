
(function () {

  const photoGrid = document.querySelector('[data-photo-grid]');
  const photoGallery = document.querySelector('[data-photo-gallery]');
  const sectionGallery = document.querySelector('[data-section-gallery]');
  let imageList;

  new InstagramFeed({
    username: "barbearia_r_m",
    callback: function (data) {
      setTimeout(() => {
        imageList = getImageList(data);
        addImagesInDOM(imageList, photoGrid, templateFotos);
        listernersGrid();
      }, 1000)
    },
  });
  
  const addImagesInDOM = (imageList, element, template) => {
  
    element.innerHTML = `${imageList.map((image, index) => {
      return template(image, index)
    }).join('')}`;
  };

  const getImageList = (data) => {
    return data.edge_owner_to_timeline_media.edges.map(
      (edge) => { 
        return {
          photo: edge.node.display_url,
          alt: edge.node.edge_media_to_caption.edges[0].node.text
        }
      }
    );
  };
  
  const templateFotos = (image, index) => {
    return `
      <div class="fotos__item">
        <img src="${image.photo}" alt="${image.alt}" loading="lazy" data-position=${index}>
      </div>
    `
  }

  const templateGaleria = (image) => {
    return `
      <figure class="galeria__item">
        <img src="${image.photo}" alt="${image.alt}">
        <figcaption>${image.alt}</figcaption>
      </figure>
    `
  }

  const listenersGallery = () => {

    const stream = document.querySelector('.galeria__stream');
    const prev = document.querySelector('.galeria__prev');
    const next = document.querySelector('.galeria__next');
    const closeGallery = document.querySelector('[data-close-gallery]');

    let items = document.querySelectorAll('.galeria__item');
 
    prev.addEventListener('click', function() {
      stream.insertBefore(items[items.length - 1], items[0]);
      items = document.querySelectorAll('.galeria__item');
    });
  
    next.addEventListener('click', function() {
      stream.appendChild(items[0]);
      items = document.querySelectorAll('.galeria__item');
    });

    closeGallery.addEventListener('click', (evt) => {
      evt.stopPropagation();
      sectionGallery.style.display = 'none';
    })

    window.addEventListener('keydown', (evt) => {
      if(evt.key === "Escape") {}
        sectionGallery.style.display = 'none';
    })

  }

  const listernersGrid = () => {
    const imageListGrid = document.querySelectorAll('[data-photo-grid] img');
  
    imageListGrid.forEach(image => {
      image.addEventListener('click', (evt) => {

        let index = evt.target.dataset.position-2;
        imageList = [...imageList.splice(index), ...imageList.slice(0,index)];

        addImagesInDOM(imageList, photoGallery, templateGaleria);
        listenersGallery();

        sectionGallery.style.display = 'block';
      })
    })
  }

})();
