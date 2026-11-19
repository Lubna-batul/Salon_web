(() => {
  const categoryServiceRequests = new Map();
  const serviceTypeRequests = new Map();
  let catalogTypeImageMap = null;
  let catalogTypeImageMapRequest = null;
  const approvedServiceImages = new Map([
    [1, {
      categoryId: 1,
      serviceName: 'Hair Cut',
      src: 'assets/images/men-haircut.jpg',
      alt: "A barber trims a man's hair with scissors in a barbershop.",
    }],
    [2, {
      categoryId: 2,
      serviceName: 'Facial',
      src: 'assets/images/facial-treatment.jpg',
      alt: 'A woman receives a facial treatment with a mask applied by a skincare professional.',
    }],
    [3, {
      categoryId: 2,
      serviceName: 'Hair Coloring',
      src: 'assets/images/women-hair-colour.jpg',
      alt: "A stylist applies colour to a woman's hair in a salon.",
    }],
    [4, {
      categoryId: 3,
      serviceName: 'Skin Treatment',
      src: 'assets/images/women-aesthetic-treatment.jpg',
      alt: 'A doctor performs a cosmetic skin treatment on a woman.',
    }],
  ]);
  const serviceNavigation = {
    men: {
      label: 'MEN SERVICES',
      intro: "Browse men's service categories and enquire about the individual options in each group.",
      groups: [
        {
          slug: 'haircuts-styling',
          label: 'Haircuts & Styling',
          description: 'Explore haircut and styling options shaped around your preferred look.',
          imageSrc: 'assets/images/men-haircut.jpg',
          imageAlt: "A barber trims a man's hair with scissors in a barbershop.",
          serviceNames: ['Hair Cut'],
        },
        {
          slug: 'beard-grooming',
          label: 'Beard & Grooming',
          description: 'Keep facial hair neat with professional beard trimming and grooming.',
          imageSrc: 'assets/images/men-beard-grooming.jpg',
          imageAlt: "A barber trims a man's beard with a razor.",
          serviceNames: [],
        },
        {
          slug: 'hair-colour',
          label: 'Hair Colour',
          description: 'Explore professional hair-colour application for men.',
          imageSrc: 'assets/images/men-hair-colour.jpg',
          imageAlt: 'A stylist applies hair colour to a male client.',
          serviceNames: [],
        },
        {
          slug: 'hair-treatments',
          label: 'Hair Treatments',
          description: 'Browse salon hair-care options in the enquiry catalogue.',
          imageSrc: 'assets/images/men-hair-treatment.jpg',
          imageAlt: "A barber washes a male client's hair at a salon basin.",
          serviceNames: [],
        },
        {
          slug: 'scalp-treatments',
          label: 'Scalp Treatments',
          description: 'Enquire about scalp-care sessions listed in this category.',
          imageSrc: 'assets/images/men-scalp-treatment.jpg',
          imageAlt: 'A man receives a shampoo and scalp wash at a salon.',
          serviceNames: [],
        },
        {
          slug: 'skincare-facials',
          label: 'Skincare & Facials',
          description: 'Explore facial and skincare sessions focused on everyday grooming.',
          imageSrc: 'assets/images/men-facial-treatment.jpg',
          imageAlt: 'A barber applies a facial mask to a man.',
          serviceNames: [],
        },
        {
          slug: 'head-massage-spa',
          label: 'Head Massage & Spa',
          description: 'Browse head-massage and spa options in the enquiry catalogue.',
          imageSrc: 'assets/images/men-head-massage.jpg',
          imageAlt: "A barber massages a male client's head in a barbershop.",
          serviceNames: [],
        },
        {
          slug: 'manicure-pedicure',
          label: 'Manicure & Pedicure',
          description: 'Discover nail-care services for hands and feet.',
          imageSrc: 'assets/images/men-manicure.jpg',
          imageAlt: 'A man receives a manicure at a salon.',
          serviceNames: [],
        },
        {
          slug: 'occasion-grooming',
          label: 'Occasion Grooming',
          description: 'Prepare for a special occasion with professional grooming and finishing.',
          imageSrc: 'assets/images/men-occasion-grooming.jpg',
          imageAlt: 'A barber applies shaving cream to a man during beard grooming.',
          serviceNames: [],
        },
      ],
    },
    women: {
      label: 'WOMEN SERVICES',
      intro: "Browse women's service categories and enquire about the individual options in each group.",
      groups: [
        {
          slug: 'haircuts-styling',
          label: 'Haircuts & Styling',
          description: 'Explore haircuts and salon styling shaped around your preferred finish.',
          imageSrc: 'assets/images/women-haircut.jpg',
          imageAlt: "A stylist cuts a woman's hair in a salon.",
          serviceNames: [],
        },
        {
          slug: 'hair-colour-highlights',
          label: 'Hair Colour & Highlights',
          description: 'Browse colour and highlight services applied by a salon stylist.',
          imageSrc: 'assets/images/women-hair-colour.jpg',
          imageAlt: "A stylist applies colour to a woman's hair in a salon.",
          serviceNames: ['Hair Coloring'],
        },
        {
          slug: 'hair-treatments',
          label: 'Hair Treatments',
          description: 'Explore salon hair-care sessions, including professional treatment rituals.',
          imageSrc: 'assets/images/women-hair-treatment.jpg',
          imageAlt: 'A woman receives a salon hair treatment under a hooded steamer.',
          serviceNames: [],
        },
        {
          slug: 'scalp-hair-spa',
          label: 'Scalp & Hair Spa',
          description: 'Explore hair-washing and scalp-spa options listed for enquiry.',
          imageSrc: 'assets/images/women-scalp-hair-spa.jpg',
          imageAlt: "A stylist washes a woman's hair at a salon basin.",
          serviceNames: [],
        },
        {
          slug: 'skin-care-facials',
          label: 'Skin Care & Facials',
          description: 'Explore facial and skincare services for a considered salon-care session.',
          imageSrc: 'assets/images/facial-treatment.jpg',
          imageAlt: 'A woman receives a facial treatment with a mask applied by a skincare professional.',
          serviceNames: ['Facial'],
        },
        {
          slug: 'aesthetic-treatments',
          label: 'Aesthetic Treatments',
          description: 'Explore personal-care options in this category and discuss them with the salon team.',
          imageSrc: 'assets/images/women-aesthetic-treatment.jpg',
          imageAlt: 'A doctor performs a cosmetic skin treatment on a woman.',
          serviceNames: [],
        },
        {
          slug: 'waxing-threading',
          label: 'Waxing & Threading',
          description: 'Browse professional hair-removal options shown in the service menu.',
          imageSrc: 'assets/images/women-waxing.jpg',
          imageAlt: "A beauty professional performs a waxing treatment on a woman's leg.",
          serviceNames: [],
        },
        {
          slug: 'manicure-pedicure',
          label: 'Manicure & Pedicure',
          description: 'Discover manicure and pedicure care for hands and feet.',
          imageSrc: 'assets/images/women-manicure-pedicure.jpg',
          imageAlt: 'A woman receives a manicure from a nail technician.',
          serviceNames: [],
        },
        {
          slug: 'nail-art',
          label: 'Nail Art',
          description: 'Explore detailed nail designs and decorative finishes.',
          imageSrc: 'assets/images/women-nail-art.jpg',
          imageAlt: 'A close-up of a hand with red and white nail art.',
          serviceNames: [],
        },
        {
          slug: 'makeup',
          label: 'Makeup',
          description: 'Browse professional makeup application for a range of occasions.',
          imageSrc: 'assets/images/women-makeup.jpg',
          imageAlt: 'A makeup artist applies lipstick to a woman.',
          serviceNames: [],
        },
        {
          slug: 'bridal-occasion',
          label: 'Bridal & Occasion',
          description: 'Explore bridal and occasion makeup application for special events.',
          imageSrc: 'assets/images/women-bridal-makeup.jpg',
          imageAlt: 'A makeup artist applies makeup to a bride.',
          serviceNames: [],
        },
        {
          slug: 'body-spa-massage',
          label: 'Body Spa & Massage',
          description: 'Browse spa and massage sessions focused on relaxation and care.',
          imageSrc: 'assets/images/women-body-massage.jpg',
          imageAlt: 'A therapist gives a woman a back massage at a spa.',
          serviceNames: [],
        },
        {
          slug: 'hair-extensions',
          label: 'Hair Extensions',
          description: 'Ask the team about extension options and availability.',
          imageSrc: 'assets/images/women-hair-extensions-category.jpg',
          imageAlt: 'Hair extension strands and application tools arranged on a white surface.',
          serviceNames: [],
        },
      ],
    },
  };
  const legacyCategoryAliases = {
    men: {
      skin: { all: 'skincare-facials', facials: 'skincare-facials', 'clean-up': 'skincare-facials' },
      hair: {
        all: 'haircuts-styling',
        haircut: 'haircuts-styling',
        colors: 'hair-colour',
        texture: 'hair-treatments',
        'hair-spa': 'head-massage-spa',
      },
      makeup: { all: 'occasion-grooming', 'party-makeup': 'occasion-grooming' },
      'hand-feet': { all: 'manicure-pedicure', manicure: 'manicure-pedicure', pedicure: 'manicure-pedicure' },
    },
    women: {
      skin: {
        all: 'skin-care-facials',
        'body-care': 'body-spa-massage',
        facials: 'skin-care-facials',
        'clean-up': 'skin-care-facials',
        waxing: 'waxing-threading',
        'everyday-essentials': 'skin-care-facials',
      },
      hair: {
        all: 'haircuts-styling',
        haircut: 'haircuts-styling',
        colors: 'hair-colour-highlights',
        texture: 'hair-treatments',
        'hair-spa': 'scalp-hair-spa',
        'hair-style': 'haircuts-styling',
      },
      makeup: {
        all: 'makeup',
        'party-makeup': 'makeup',
        'bridal-makeup': 'bridal-occasion',
        makeup: 'makeup',
        outdoor: 'makeup',
        'saree-drape': 'bridal-occasion',
        'special-occasion': 'bridal-occasion',
      },
      'hand-feet': {
        all: 'manicure-pedicure',
        manicure: 'manicure-pedicure',
        pedicure: 'manicure-pedicure',
        nails: 'nail-art',
      },
    },
  };

  function showState(container, message, {
    isError = false, retry, detail, action,
  } = {}) {
    container.replaceChildren();
    container.hidden = false;
    container.classList.toggle('is-error', isError);
    container.classList.toggle('is-empty-state', Boolean(detail || action));
    container.setAttribute('role', isError ? 'alert' : 'status');

    const text = document.createElement('p');
    text.textContent = message;

    if (!detail && !action) {
      container.append(text);
      if (retry) {
        const button = document.createElement('button');
        button.className = 'button';
        button.type = 'button';
        button.textContent = 'Try again';
        button.addEventListener('click', retry, { once: true });
        container.append(button);
      }
      return;
    }

    const panel = document.createElement('div');
    panel.className = 'catalog-empty-panel';

    const mark = document.createElement('span');
    mark.className = 'catalog-empty-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = isError ? '!' : '✦';

    const body = document.createElement('div');
    body.className = 'catalog-empty-body';

    const title = document.createElement('p');
    title.className = 'catalog-empty-title';
    title.textContent = message;
    body.append(title);

    if (detail) {
      const hint = document.createElement('p');
      hint.className = 'catalog-empty-detail';
      hint.textContent = detail;
      body.append(hint);
    }

    panel.append(mark, body);

    if (action || retry) {
      const actionWrap = document.createElement('div');
      actionWrap.className = 'catalog-empty-action';
      if (action) {
        const button = document.createElement('button');
        button.className = 'button-secondary';
        button.type = 'button';
        button.textContent = action.label;
        button.addEventListener('click', action.onClick, { once: true });
        actionWrap.append(button);
      }
      if (retry) {
        const retryButton = document.createElement('button');
        retryButton.className = 'button';
        retryButton.type = 'button';
        retryButton.textContent = 'Try again';
        retryButton.addEventListener('click', retry, { once: true });
        actionWrap.append(retryButton);
      }
      panel.append(actionWrap);
    }

    container.append(panel);
  }

  function clearState(container) {
    container.replaceChildren();
    container.hidden = true;
    container.classList.remove('is-error', 'is-empty-state');
  }

  async function getJson(path, options = {}) {
    let response;
    try {
      response = await fetch(path, {
        ...options,
        headers: { ...(options.headers || {}), Accept: 'application/json' },
      });
    } catch (error) {
      console.error(`Service API request failed: ${path}`, error);
      throw new Error('The service catalog could not be reached.');
    }

    if (!response.ok) {
      const error = new Error('The service catalog request failed.');
      error.status = response.status;
      throw error;
    }

    try {
      return await response.json();
    } catch (error) {
      console.error(`Invalid JSON from service API: ${path}`, error);
      throw new Error('The service catalog returned an invalid response.');
    }
  }

  function isCategory(value) {
    return value !== null
      && typeof value === 'object'
      && Number.isInteger(value.category_id)
      && value.category_id > 0
      && typeof value.category_name === 'string'
      && (value.description === null || typeof value.description === 'string');
  }

  function isService(value) {
    return value !== null
      && typeof value === 'object'
      && Number.isInteger(value.service_id)
      && value.service_id > 0
      && typeof value.service_name === 'string'
      && (value.category_id === null
        || (Number.isInteger(value.category_id) && value.category_id > 0))
      && (value.category_name === null || typeof value.category_name === 'string')
      && (value.description === null || typeof value.description === 'string')
      && (value.image === null || typeof value.image === 'string');
  }

  function isCatalogCategory(value) {
    return value !== null
      && typeof value === 'object'
      && Number.isInteger(value.category_id)
      && value.category_id > 0
      && ['men', 'women'].includes(value.gender)
      && typeof value.category_name === 'string'
      && typeof value.slug === 'string'
      && typeof value.description === 'string'
      && (value.image_path === null || typeof value.image_path === 'string')
      && typeof value.image_alt === 'string';
  }

  function isServiceType(value) {
    return value !== null
      && typeof value === 'object'
      && Number.isInteger(value.service_type_id)
      && value.service_type_id > 0
      && Number.isInteger(value.category_id)
      && value.category_id > 0
      && ['men', 'women'].includes(value.gender)
      && typeof value.category_name === 'string'
      && typeof value.service_name === 'string'
      && typeof value.description === 'string'
      && (value.image_path === null || typeof value.image_path === 'string')
      && typeof value.image_alt === 'string'
      && value.availability_status === 'enquiry_only';
  }

  function getCatalogImageKey(gender, categoryName, serviceName) {
    return `${gender}|${categoryName}|${serviceName}`;
  }

  function getCatalogTypeImageMap() {
    if (!catalogTypeImageMapRequest) {
      catalogTypeImageMapRequest = getJson('/assets/images/service-type-image-map.json', {
        cache: 'no-store',
      })
        .then((entries) => {
          if (!Array.isArray(entries) || !entries.every((entry) => (
            entry !== null
            && typeof entry === 'object'
            && ['men', 'women'].includes(entry.gender)
            && typeof entry.category === 'string'
            && typeof entry.service === 'string'
            && typeof entry.image === 'string'
            && entry.image.startsWith('assets/images/')
            && !entry.image.includes('..')
            && typeof entry.alt === 'string'
            && entry.alt.trim().length > 0
          ))) {
            throw new Error('The service image map is invalid.');
          }

          const imageMap = new Map(entries.map((entry) => [
            getCatalogImageKey(entry.gender, entry.category, entry.service),
            { src: entry.image, alt: entry.alt },
          ]));
          if (imageMap.size !== entries.length) {
            throw new Error('The service image map contains duplicate service entries.');
          }
          catalogTypeImageMap = imageMap;
          return imageMap;
        })
        .catch((error) => {
          catalogTypeImageMapRequest = null;
          throw error;
        });
    }
    return catalogTypeImageMapRequest;
  }

  async function getCategories() {
    const categories = await getJson('/categories');
    if (!Array.isArray(categories) || !categories.every(isCategory)) {
      throw new Error('The service catalog returned invalid categories.');
    }
    return categories;
  }

  function getServicesForCategory(categoryId) {
    if (!categoryServiceRequests.has(categoryId)) {
      const request = getJson(`/categories/${encodeURIComponent(categoryId)}/services`)
        .then((services) => {
          if (!Array.isArray(services) || !services.every(isService)) {
            throw new Error('The service catalog returned invalid services.');
          }
          return services;
        })
        .catch((error) => {
          categoryServiceRequests.delete(categoryId);
          throw error;
        });
      categoryServiceRequests.set(categoryId, request);
    }
    return categoryServiceRequests.get(categoryId);
  }

  async function getServiceCategories(gender) {
    const categories = await getJson(
      `/service-categories?gender=${encodeURIComponent(gender)}`,
    );
    if (!Array.isArray(categories) || !categories.every(isCatalogCategory)) {
      throw new Error('The service catalog returned invalid service categories.');
    }
    return categories;
  }

  function getServiceTypesForCategory(categoryId) {
    if (!serviceTypeRequests.has(categoryId)) {
      const request = getJson(
        `/service-categories/${encodeURIComponent(categoryId)}/types`,
      )
        .then((types) => {
          if (!Array.isArray(types) || !types.every(isServiceType)) {
            throw new Error('The service catalog returned invalid service types.');
          }
          return types;
        })
        .catch((error) => {
          serviceTypeRequests.delete(categoryId);
          throw error;
        });
      serviceTypeRequests.set(categoryId, request);
    }
    return serviceTypeRequests.get(categoryId);
  }

  function createPendingImage(serviceName, message = 'Image pending approval') {
    const placeholder = document.createElement('div');
    placeholder.className = 'service-image-pending';
    placeholder.setAttribute('role', 'img');
    const accessibleMessage = message === 'Image pending approval'
      ? `Approved photo for ${serviceName} is not available yet.`
      : `${serviceName}: ${message}.`;
    placeholder.setAttribute('aria-label', accessibleMessage);
    placeholder.textContent = message;
    return placeholder;
  }

  function createApprovedImage(imageMapping, fallbackLabel) {
    const image = document.createElement('img');
    image.src = imageMapping.src;
    image.alt = imageMapping.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.replaceWith(createPendingImage(fallbackLabel, 'Approved image could not be loaded'));
    }, { once: true });
    return image;
  }

  function createCategoryImage(group) {
    if (!group.imageSrc) {
      return createPendingImage(group.label, 'No suitable photo available');
    }
    return createApprovedImage({
      src: group.imageSrc,
      alt: group.imageAlt,
    }, group.label);
  }

  function createServiceImage(service) {
    const approvedImage = approvedServiceImages.get(service.service_id);
    if (approvedImage
      && service.category_id === approvedImage.categoryId
      && service.service_name.trim().toLowerCase() === approvedImage.serviceName.toLowerCase()) {
      return createApprovedImage(approvedImage, service.service_name);
    }
    return createPendingImage(service.service_name);
  }

  function createCatalogTypeImage(serviceType) {
    const imageMapping = catalogTypeImageMap?.get(
      getCatalogImageKey(
        serviceType.gender,
        serviceType.category_name,
        serviceType.service_name,
      ),
    );
    if (!imageMapping) {
      console.warn(
        `No verified photograph is mapped for ${serviceType.gender} ${serviceType.category_name}: ${serviceType.service_name}`,
      );
      return createPendingImage(serviceType.service_name, 'No suitable photo available');
    }
    return createApprovedImage(imageMapping, serviceType.service_name);
  }

  function createServiceTypeCard(serviceType) {
    const card = document.createElement('article');
    card.className = 'service-list-card';

    const copy = document.createElement('div');
    copy.className = 'service-list-copy';
    const heading = document.createElement('h3');
    heading.textContent = serviceType.service_name;
    const description = document.createElement('p');
    description.textContent = serviceType.description;

    const actions = document.createElement('div');
    actions.className = 'service-list-actions';
    const bookLink = document.createElement('a');
    bookLink.className = 'button';
    bookLink.href = `contact.html?service=${encodeURIComponent(serviceType.service_name)}#booking`;
    bookLink.textContent = 'Book';
    bookLink.setAttribute('aria-label', `Enquire about ${serviceType.service_name}`);

    const detailsLink = document.createElement('a');
    detailsLink.className = 'button-secondary';
    detailsLink.href = `service-detail.html?type=${encodeURIComponent(serviceType.service_type_id)}`;
    detailsLink.textContent = 'View More';

    actions.append(bookLink, detailsLink);
    copy.append(heading, description, actions);
    card.append(createCatalogTypeImage(serviceType), copy);
    return card;
  }

  function createServiceCard(service) {
    const card = document.createElement('article');
    card.className = 'service-list-card';

    const copy = document.createElement('div');
    copy.className = 'service-list-copy';

    const heading = document.createElement('h3');
    heading.textContent = service.service_name;

    const actions = document.createElement('div');
    actions.className = 'service-list-actions';
    const bookLink = document.createElement('a');
    bookLink.className = 'button';
    bookLink.href = `contact.html?service=${encodeURIComponent(service.service_name)}#booking`;
    bookLink.textContent = 'Book';
    bookLink.setAttribute('aria-label', `Enquire about ${service.service_name}`);

    const detailsLink = document.createElement('a');
    detailsLink.className = 'button-secondary';
    detailsLink.href = `service-detail.html?service=${encodeURIComponent(service.service_id)}`;
    detailsLink.textContent = 'View More';

    copy.append(heading);
    if (service.description) {
      const description = document.createElement('p');
      description.textContent = service.description;
      copy.append(description);
    }
    if (typeof service.duration === 'string' && service.duration.trim()) {
      const duration = document.createElement('p');
      duration.className = 'service-list-duration';
      duration.textContent = service.duration;
      copy.append(duration);
    }
    actions.append(bookLink, detailsLink);
    copy.append(actions);
    card.append(createServiceImage(service), copy);
    return card;
  }

  async function loadCategoryServices(category, status, grid, onLoaded, renderService = createServiceCard) {
    showState(status, 'Loading services…');
    status.setAttribute('aria-busy', 'true');
    grid.replaceChildren();

    try {
      const services = await getServicesForCategory(category.category_id);
      if (services.length === 0) {
        showState(status, 'No services are available in this category yet.');
      } else {
        clearState(status);
        services.forEach((service) => grid.append(renderService(service)));
      }
      onLoaded?.();
    } catch {
      showState(status, 'Services could not be loaded. Please try again.', {
        isError: true,
        retry: () => loadCategoryServices(category, status, grid, onLoaded, renderService),
      });
    } finally {
      status.removeAttribute('aria-busy');
    }
  }

  async function initializeServicesPage(root) {
    const sidebarHeading = root.querySelector('[data-service-sidebar-heading]');
    const sidebarToggle = root.querySelector('[data-service-sidebar-toggle]');
    const sidebarNavigation = root.querySelector('[data-service-sidebar-navigation]');
    const resultsHeading = root.querySelector('[data-service-results-heading]');
    const categoryIntro = root.querySelector('[data-service-category-intro]');
    const status = root.querySelector('[data-service-list-state]');
    const serviceList = root.querySelector('[data-service-list]');
    let categories = [];
    let catalogLoaded = false;
    let sidebarExpanded = false;
    let requestVersion = 0;
    const state = {
      gender: 'men',
      group: 'all',
      category: 'all',
      notice: null,
    };

    function getGroup(gender, groupSlug) {
      return serviceNavigation[gender].groups.find((group) => group.slug === groupSlug) || null;
    }

    function getCategoryRecord(gender, groupSlug) {
      const matches = categories.filter(
        (category) => category.gender === gender && category.slug === groupSlug,
      );
      return matches.length === 1 ? matches[0] : null;
    }

    function readUrlState() {
      const params = new URLSearchParams(window.location.search);
      const requestedGender = params.get('gender');
      let gender = serviceNavigation[requestedGender] ? requestedGender : null;
      let notice = null;

      if (!gender) {
        const hash = window.location.hash.toLowerCase();
        gender = hash.startsWith('#women') ? 'women' : 'men';
        if (requestedGender) notice = 'That service section is not available. Showing Men services.';
      }

      const groupSlug = params.get('group');
      const categorySlug = params.get('category');
      if (!groupSlug || groupSlug === 'all') {
        return { gender, group: 'all', category: 'all', notice };
      }

      const group = getGroup(gender, groupSlug);
      if (!group) {
        const legacyGroup = legacyCategoryAliases[gender][groupSlug]?.[categorySlug || 'all'];
        if (legacyGroup) {
          return { gender, group: legacyGroup, category: 'all', notice };
        }
      }
      if (!group) {
        return {
          gender,
          group: 'all',
          category: 'all',
          notice: 'That category link is not available. Showing all verified services for this section.',
        };
      }
      if (!categorySlug || categorySlug === 'all') {
        return { gender, group: groupSlug, category: 'all', notice };
      }

      return {
        gender,
        group: 'all',
        category: 'all',
        notice: 'That category link is not available. Showing all verified services for this section.',
      };
    }

    function writeUrl(replace = false) {
      const url = new URL(window.location.href);
      url.searchParams.set('gender', state.gender);
      url.searchParams.set('group', state.group);
      url.searchParams.set('category', state.category);
      const method = replace ? 'replaceState' : 'pushState';
      window.history[method](
        { gender: state.gender, group: state.group, category: state.category },
        '',
        url,
      );
    }

    function setGenderSelection() {
      sidebarHeading.textContent = serviceNavigation[state.gender].label;
      root.querySelectorAll('[data-gender-toggle]').forEach((button) => {
        const selected = state.gender === button.dataset.genderToggle;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
    }

    function setSidebarSelection() {
      setGenderSelection();
      const allSelected = state.group === 'all';
      const allButton = sidebarNavigation.querySelector('.service-sidebar-all');
      allButton.classList.toggle('is-active', allSelected);
      if (allSelected) allButton.setAttribute('aria-current', 'page');
      else allButton.removeAttribute('aria-current');

      sidebarNavigation.querySelectorAll('[data-sidebar-group-toggle]').forEach((button) => {
        const selected = button.dataset.sidebarGroupToggle === state.group;
        button.classList.toggle('is-active', selected);
        if (selected) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
      sidebarToggle.setAttribute(
        'aria-expanded',
        String(!window.matchMedia('(max-width: 640px)').matches || sidebarExpanded),
      );
      sidebarNavigation.hidden = window.matchMedia('(max-width: 640px)').matches
        && !sidebarExpanded;
    }

    function selectCategory(gender, groupSlug, categorySlug) {
      state.gender = gender;
      state.group = groupSlug;
      state.category = categorySlug;
      state.notice = null;
      if (window.matchMedia('(max-width: 640px)').matches) sidebarExpanded = false;
      renderSidebar();
      updateSidebarVisibility();
      writeUrl();
      void loadServices();
    }

    function renderSidebar() {
      sidebarNavigation.replaceChildren();
      const allButton = document.createElement('button');
      allButton.className = 'service-sidebar-all';
      allButton.type = 'button';
      allButton.textContent = 'All Services';
      allButton.dataset.sidebarGroup = 'all';
      allButton.dataset.sidebarCategory = 'all';
      allButton.addEventListener('click', () => selectCategory(state.gender, 'all', 'all'));
      sidebarNavigation.append(allButton);

      serviceNavigation[state.gender].groups.forEach((group) => {
        const groupButton = document.createElement('button');
        groupButton.className = 'service-sidebar-category';
        groupButton.type = 'button';
        groupButton.textContent = group.label;
        groupButton.dataset.sidebarGroupToggle = group.slug;
        groupButton.setAttribute('aria-label', `Show ${group.label} services`);
        groupButton.addEventListener('click', () => {
          selectCategory(state.gender, group.slug, 'all');
        });
        sidebarNavigation.append(groupButton);
      });
      setSidebarSelection();
    }

    function updateSidebarVisibility() {
      const mobile = window.matchMedia('(max-width: 640px)').matches;
      sidebarToggle.hidden = !mobile;
      sidebarNavigation.hidden = mobile && !sidebarExpanded;
      sidebarToggle.setAttribute('aria-expanded', String(!mobile || sidebarExpanded));
    }

    function renderCategoryCards(gender) {
      const grid = document.createElement('div');
      grid.className = 'service-option-grid';

      serviceNavigation[gender].groups.forEach((group) => {
        const card = document.createElement('article');
        card.className = 'service-option-card service-category-card';
        const copy = document.createElement('div');
        copy.className = 'service-option-copy';
        const heading = document.createElement('h3');
        heading.textContent = group.label.toUpperCase();
        const description = document.createElement('p');
        description.textContent = group.description;
        const actions = document.createElement('div');
        actions.className = 'service-category-actions';
        const explore = document.createElement('button');
        explore.type = 'button';
        explore.className = 'card-link';
        explore.textContent = 'Explore More';
        const arrow = document.createElement('span');
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        explore.append(arrow);
        explore.setAttribute('aria-label', `Explore ${group.label} services`);
        explore.addEventListener('click', () => {
          selectCategory(gender, group.slug, 'all');
        });
        const bookLink = document.createElement('a');
        bookLink.className = 'button';
        bookLink.href = `contact.html?service=${encodeURIComponent(group.label)}#booking`;
        bookLink.textContent = 'Book';
        bookLink.setAttribute('aria-label', `Enquire about ${group.label}`);
        actions.append(explore, bookLink);
        copy.append(heading, description, actions);
        card.append(createCategoryImage(group), copy);
        grid.append(card);
      });

      const overview = document.createElement('p');
      overview.className = 'service-category-overview';
      overview.textContent = serviceNavigation[gender].intro;
      serviceList.append(overview);
      serviceList.append(grid);
    }

    function renderCategoryIntro(group) {
      const intro = document.createElement('article');
      intro.className = 'service-category-intro';

      const copy = document.createElement('div');
      copy.className = 'service-category-intro-copy';
      const heading = document.createElement('h3');
      heading.textContent = group.label;
      const description = document.createElement('p');
      description.textContent = group.description;
      copy.append(heading, description);
      intro.append(createCategoryImage(group), copy);
      return intro;
    }

    async function loadServices() {
      if (!catalogLoaded) return;
      const currentRequest = ++requestVersion;
      const gender = state.gender;
      const categorySlug = state.category;
      const groupSlug = state.group;
      categoryIntro.replaceChildren();
      categoryIntro.hidden = true;
      serviceList.replaceChildren();

      if (categorySlug === 'all') {
        if (groupSlug === 'all') {
          if (state.notice) {
            showState(status, state.notice, {
              detail: 'Showing all available service categories for this section.',
            });
          } else clearState(status);
          resultsHeading.textContent = 'All Services';
          renderCategoryCards(gender);
          return;
        }
      }

      const group = getGroup(gender, groupSlug);
      if (!group) {
        resultsHeading.textContent = 'All Services';
        showState(status, 'This service category is unavailable.');
        return;
      }
      const category = getCategoryRecord(gender, groupSlug);
      if (!category) {
        resultsHeading.textContent = group.label;
        showState(status, `The ${group.label} catalogue is unavailable. Please try again.`);
        return;
      }
      resultsHeading.textContent = group.label;
      categoryIntro.append(renderCategoryIntro(group));
      categoryIntro.hidden = false;
      showState(status, `Loading ${gender} services…`);
      try {
        const services = await getServiceTypesForCategory(category.category_id);
        if (currentRequest !== requestVersion) return;
        const matchingServices = services.filter(
          (service) => service.gender === gender,
        );

        if (state.notice) {
          showState(status, state.notice, {
            detail: 'Use the categories on the left to browse the enquiry catalogue.',
            action: {
              label: 'Show all services',
              onClick: () => selectCategory(state.gender, 'all', 'all'),
            },
          });
        } else if (matchingServices.length === 0) {
          showState(
            status,
            `No ${group.label} options are listed yet.`,
            {
              detail: 'Please contact our team to ask about options for this category.',
              action: {
                label: 'Browse all categories',
                onClick: () => selectCategory(state.gender, 'all', 'all'),
              },
            },
          );
        } else {
          clearState(status);
          const enquiryNotice = document.createElement('p');
          enquiryNotice.className = 'service-category-overview';
          enquiryNotice.textContent = 'Listed options are for enquiry; our team will confirm availability.';
          serviceList.append(enquiryNotice);
        }

        matchingServices.forEach(
          (service) => serviceList.append(createServiceTypeCard(service)),
        );
      } catch {
        if (currentRequest !== requestVersion) return;
        showState(status, `Could not load ${gender} services. Please try again.`, {
          isError: true,
          retry: () => loadServices(),
        });
      }
    }

    function restoreFromUrl() {
      const urlState = readUrlState();
      state.gender = urlState.gender;
      state.group = urlState.group;
      state.category = urlState.category;
      state.notice = urlState.notice;
      renderSidebar();
      updateSidebarVisibility();
      const group = getGroup(state.gender, state.group);
      resultsHeading.textContent = group ? `${group.label} Services` : 'All Services';
    }

    root.querySelectorAll('[data-gender-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const gender = button.dataset.genderToggle;
        if (gender !== state.gender) selectCategory(gender, 'all', 'all');
      });
    });
    sidebarToggle.addEventListener('click', () => {
      sidebarExpanded = !sidebarExpanded;
      updateSidebarVisibility();
    });
    window.addEventListener('popstate', () => {
      restoreFromUrl();
      void loadServices();
    });
    window.addEventListener('resize', updateSidebarVisibility);

    async function loadCatalog() {
      root.setAttribute('aria-busy', 'true');
      showState(status, 'Loading service categories…');
      try {
        catalogTypeImageMap = await getCatalogTypeImageMap();
        const catalogCategories = await Promise.all([
          getServiceCategories('men'),
          getServiceCategories('women'),
        ]);
        categories = catalogCategories.flat();
        catalogLoaded = true;
        restoreFromUrl();
        writeUrl(true);
        await loadServices();
      } catch (error) {
        console.error('Failed to load service categories:', error);
        const message = error.status === 503
          ? 'The service database is temporarily unavailable.'
          : error.status
            ? `Service categories could not be loaded (HTTP ${error.status}).`
            : 'Could not connect to the service API.';
        const detail = error.status === 503
          ? 'Please try again shortly.'
          : error.status
            ? 'The API rejected the categories request. Check that the frontend is being served by the FastAPI application.'
            : 'Start the FastAPI application and open the site from the same API host.';
        showState(status, message, {
          isError: true,
          detail,
          retry: loadCatalog,
        });
      } finally {
        root.removeAttribute('aria-busy');
      }
    }

    renderSidebar();
    updateSidebarVisibility();
    await loadCatalog();
  }

  async function initializeMenuPage(root) {
    const status = document.querySelector('[data-menu-status]');

    async function loadMenu() {
      showState(status, 'Loading menu…');
      root.hidden = true;
      root.replaceChildren();

      try {
        const categories = await getCategories();
        if (categories.length === 0) {
          showState(status, 'No service categories are available right now.');
          return;
        }

        categories.forEach((category) => {
          const card = document.createElement('article');
          card.className = 'menu-card';
          const header = document.createElement('div');
          header.className = 'menu-head';
          const heading = document.createElement('h3');
          heading.textContent = category.category_name;
          const label = document.createElement('span');
          label.textContent = 'Services';
          header.append(heading, label);

          const categoryStatus = document.createElement('div');
          categoryStatus.className = 'catalog-load-state';
          categoryStatus.setAttribute('role', 'status');
          categoryStatus.setAttribute('aria-live', 'polite');

          const items = document.createElement('div');
          card.append(createPendingImage(category.category_name), header, categoryStatus, items);
          root.append(card);
          loadCategoryServices(category, categoryStatus, items, null, (service) => {
            const item = document.createElement('div');
            item.className = 'menu-item';
            const name = document.createElement('span');
            name.textContent = service.service_name;
            item.append(name);
            return item;
          }).then(() => {
            items.classList.add('menu-category-items');
          });
        });

        clearState(status);
        root.hidden = false;
      } catch {
        showState(status, 'The menu could not be loaded. Please try again.', {
          isError: true,
          retry: loadMenu,
        });
      }
    }

    await loadMenu();
  }

  async function initializeServiceDetail(root) {
    const loading = document.getElementById('service-detail-loading');
    const unavailable = document.getElementById('service-detail-unavailable');
    const unavailableMessage = document.getElementById('service-detail-unavailable-message');
    const retry = document.getElementById('service-detail-retry');
    const params = new URLSearchParams(window.location.search);
    const serviceTypeId = params.get('type');
    const serviceId = params.get('service');

    async function loadDetail() {
      loading.hidden = false;
      root.hidden = true;
      unavailable.hidden = true;
      retry.hidden = true;

      const isServiceTypeRequest = serviceTypeId !== null;
      const requestedId = serviceTypeId || serviceId;
      if (!requestedId || !/^[1-9]\d*$/.test(requestedId)) {
        loading.hidden = true;
        unavailableMessage.textContent = 'Choose a service from the collection to see its details, or contact our team for help.';
        unavailable.hidden = false;
        return;
      }

      try {
        if (isServiceTypeRequest) {
          catalogTypeImageMap = await getCatalogTypeImageMap();
        }
        const service = await getJson(
          isServiceTypeRequest
            ? `/service-types/${encodeURIComponent(requestedId)}`
            : `/services/${encodeURIComponent(requestedId)}`,
        );
        if (
          isServiceTypeRequest
            ? !isServiceType(service)
            : !isService(service)
        ) {
          throw new Error('The service catalog returned invalid service details.');
        }

        const name = service.service_name;
        document.title = `${name} | EVolve Salon`;
        document.getElementById('service-detail-title').textContent = name;
        document.getElementById('service-detail-breadcrumb').textContent = name;
        document.getElementById('service-detail-category').textContent = service.category_name || 'Service';
        const description = document.getElementById('service-detail-description');
        description.textContent = service.description || '';
        description.hidden = !service.description?.trim();
        const enquiryUrl = `contact.html?service=${encodeURIComponent(name)}#booking`;
        document.getElementById('service-detail-book').href = enquiryUrl;
        document.getElementById('service-detail-enquire').href = enquiryUrl;
        document.getElementById('service-detail-image-container').replaceChildren(
          isServiceTypeRequest
            ? createCatalogTypeImage(service)
            : createServiceImage(service),
        );
        root.hidden = false;
        loading.hidden = true;
      } catch (error) {
        loading.hidden = true;
        unavailableMessage.textContent = error.status === 404
          ? 'This service was not found. Browse the current service categories or contact our team for help.'
          : 'Service details could not be loaded. Please try again or contact our team for help.';
        unavailable.hidden = false;
        retry.hidden = error.status === 404;
      }
    }

    retry.addEventListener('click', loadDetail);
    await loadDetail();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const servicesPage = document.querySelector('[data-services-catalog]');
    const menuPage = document.querySelector('[data-menu-catalog]');
    const detailPage = document.getElementById('service-detail-content');

    if (servicesPage) initializeServicesPage(servicesPage);
    if (menuPage) initializeMenuPage(menuPage);
    if (detailPage) initializeServiceDetail(detailPage);
  });
})();
