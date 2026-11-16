const serviceCatalog = {
  men: [
    { id: 'men-haircuts-styling', name: 'Haircuts & Styling', category: 'Hair studio', description: 'Consultation-led cuts and polished styling shaped around your features and daily routine.', image: 'https://images.pexels.com/photos/3037244/pexels-photo-3037244.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Barber using clippers to cut a man’s hair', anchorId: 'hair' },
    { id: 'men-hair-wash-conditioning', name: 'Hair Wash & Conditioning', category: 'Care & cleanse', description: 'A refreshing cleanse and conditioning ritual selected for your hair and scalp needs.', image: 'https://images.pexels.com/photos/36292486/pexels-photo-36292486.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Man receiving a shampoo and rinse at a salon basin' },
    { id: 'men-hair-spa', name: 'Hair Spa', category: 'Restore', description: 'A relaxing hair and scalp ritual with a tailored care consultation and considered finish.', image: 'https://images.pexels.com/photos/10416604/pexels-photo-10416604.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Hair mask treatment being worked through long hair' },
    { id: 'men-beard-styling-grooming', name: 'Beard Styling & Grooming', category: 'Grooming', description: 'Detailed shaping and grooming to bring definition and balance to your beard.', image: 'https://images.pexels.com/photos/5853394/pexels-photo-5853394.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Barber shaping a man’s beard with scissors and a comb', anchorId: 'mens-hair' },
    { id: 'men-beard-trimming', name: 'Beard Trimming', category: 'Grooming', description: 'A clean, considered trim to maintain your preferred beard length and shape.', image: 'assets/images/mens-grooming.jpg', alt: 'Barber trimming a man’s beard' },
    { id: 'men-hair-colouring', name: 'Hair Colouring', category: 'Colour & gloss', description: 'Personalised colour refreshes and tonal work, planned around your hair goals.', image: 'https://images.pexels.com/photos/4981476/pexels-photo-4981476.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Colourist applying hair colour with a brush', anchorId: 'colour' },
    { id: 'men-hair-treatments', name: 'Hair Treatments', category: 'Care & repair', description: 'Targeted conditioning and repair rituals to support softness, strength and shine.', image: 'https://images.pexels.com/photos/23349912/pexels-photo-23349912.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Hairdresser combing and caring for wet hair' },
    { id: 'men-scalp-treatments', name: 'Scalp Treatments', category: 'Scalp care', description: 'A focused scalp-care consultation followed by a soothing, tailored treatment.', image: 'https://images.pexels.com/photos/17553840/pexels-photo-17553840.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Guest receiving a focused scalp massage' },
    { id: 'men-facials', name: 'Men’s Facials', category: 'Skin rituals', description: 'A refreshing facial experience chosen to suit your skin and personal care routine.', image: 'https://images.pexels.com/photos/20861923/pexels-photo-20861923.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Man receiving a facial massage in a skincare setting', anchorId: 'skin' },
    { id: 'men-skin-care', name: 'Skin Care', category: 'Skin & beauty', description: 'Thoughtful skin-care guidance and treatments tailored to your individual concerns.', image: 'https://images.pexels.com/photos/6763625/pexels-photo-6763625.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Man applying a face mask as part of a skincare routine' },
    { id: 'men-head-massage', name: 'Head Massage', category: 'Relax & restore', description: 'A calming head massage designed to make space for a moment of relaxation.', image: 'https://images.pexels.com/photos/17553843/pexels-photo-17553843.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Therapist massaging a guest’s scalp' },
    { id: 'men-manicure', name: 'Manicure', category: 'Nail care', description: 'Neat nail shaping and hand care with a clean, natural finish.', image: 'https://images.pexels.com/photos/22668317/pexels-photo-22668317.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Nail technician filing a guest’s nails during a manicure' },
  ],
  women: [
    { id: 'women-haircuts-styling', name: 'Haircuts & Styling', category: 'Hair studio', description: 'Precision cuts and polished styling shaped to your features and preferences.', image: 'https://images.pexels.com/photos/8834068/pexels-photo-8834068.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Stylist cutting a woman’s hair in a salon', anchorId: 'womens-hair' },
    { id: 'women-hair-colouring', name: 'Hair Colouring', category: 'Colour & gloss', description: 'Dimensional colour, highlights and glossing planned with a personal consultation.', image: 'https://images.pexels.com/photos/8468125/pexels-photo-8468125.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Hairdresser applying colour to a woman’s hair', anchorId: 'hair-colouring' },
    { id: 'women-hair-spa', name: 'Hair Spa', category: 'Restore', description: 'A restorative hair and scalp ritual finished with care recommendations for home.', image: 'https://images.pexels.com/photos/7755473/pexels-photo-7755473.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Woman enjoying a hair wash at a salon basin' },
    { id: 'women-hair-treatments', name: 'Hair Treatments', category: 'Care & repair', description: 'Targeted treatments to support softness, strength and healthy-looking shine.', image: 'https://images.pexels.com/photos/23349905/pexels-photo-23349905.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Stylist washing and caring for a guest’s hair' },
    { id: 'women-bridal-styling', name: 'Bridal Makeup & Styling', category: 'Occasions', description: 'Thoughtful bridal makeup, styling and finishing planned around your occasion.', image: 'https://images.pexels.com/photos/37710473/pexels-photo-37710473.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Makeup artist applying makeup to a bride', anchorId: 'celebration' },
    { id: 'women-makeup', name: 'Makeup', category: 'Makeup artistry', description: 'Makeup artistry for everyday polish or special occasions, shaped around your look.', image: 'https://images.pexels.com/photos/7290123/pexels-photo-7290123.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Makeup artist applying eye makeup' },
    { id: 'women-manicure', name: 'Manicure', category: 'Nail care', description: 'A considered nail-care appointment with shaping and a neat, polished finish.', image: 'https://images.pexels.com/photos/7446915/pexels-photo-7446915.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Nail technician applying polish during a manicure' },
    { id: 'women-pedicure', name: 'Pedicure', category: 'Nail care', description: 'A restorative foot-care ritual with careful grooming and a polished finish.', image: 'https://images.pexels.com/photos/34930123/pexels-photo-34930123.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Beauty technician performing a pedicure' },
    { id: 'women-nail-art', name: 'Nail Art', category: 'Nail artistry', description: 'Personalised nail details and colour, designed with your preferred style in mind.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', alt: 'Nails finished with black and tortoiseshell nail art' },
    { id: 'women-facials', name: 'Facials', category: 'Skin rituals', description: 'Hydrating and refreshing facial care selected to suit your skin goals.', image: 'assets/images/facial-treatment.jpg', alt: 'Guest receiving a professional facial mask treatment' },
    { id: 'women-skin-treatments', name: 'Skin Treatments', category: 'Skin & beauty', description: 'Personalised skin treatments and consultations to complement your care routine.', image: 'https://images.pexels.com/photos/30809943/pexels-photo-30809943.jpeg?auto=compress&cs=tinysrgb&w=800&q=80', alt: 'Professional facial treatment being performed at a spa' },
    { id: 'women-hair-styling', name: 'Hair Styling', category: 'Hair artistry', description: 'Occasion-ready styling and finishing, tailored to your hair and the moment.', image: 'assets/images/womens-hair.jpg', alt: 'Stylist blow-drying a guest’s hair' },
  ],
};

const aestheticTreatmentCatalog = {
  peel: {
    title: 'Chemical Peel',
    image: 'https://images.pexels.com/photos/37229299/pexels-photo-37229299.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80',
    imageAlt: 'Illustrative facial mask application in a spa',
    imageCaption: 'Illustrative facial-care imagery; not a chemical-peel procedure photo or client result.',
    introduction: 'Chemical peels use a topical exfoliating solution as part of a practitioner-led skin treatment. The products and strength vary and are selected only after an assessment.',
    information: 'Before deciding, ask the practitioner to explain the ingredients, expected recovery, possible risks, alternatives and aftercare for the specific protocol being offered.',
    benefits: ['May be discussed for concerns such as uneven-looking tone or surface texture.', 'Possible outcomes and recovery vary by person and protocol.', 'No specific result can be guaranteed.'],
    suitability: 'Suitability depends on skin history, sensitivity, current skin-care products or medicines, and recent procedures. A qualified practitioner must assess you first.',
    procedure: ['Consultation and skin-history review', 'Discussion of protocol, risks and alternatives', 'Treatment only if the practitioner considers it appropriate', 'Individual aftercare and follow-up guidance'],
    faqs: [
      ['Is the same peel used for everyone?', 'No. Products and strengths vary. A practitioner should explain the exact option and confirm suitability before treatment.'],
      ['Will I need recovery time?', 'Recovery varies with the protocol and individual response. Ask for the expected downtime and aftercare before booking.'],
      ['Are results guaranteed?', 'No. Results differ between people and cannot be guaranteed.']
    ],
    related: [['Mesotherapy', 'mesotherapy.html'], ['Medi Facial', 'medifacial.html'], ['Microdermabrasion', 'microdermabrasion.html']]
  },
  mesotherapy: {
    title: 'Mesotherapy',
    image: 'https://images.pexels.com/photos/4586740/pexels-photo-4586740.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80',
    imageAlt: 'Illustrative consultation with a skin-care professional',
    imageCaption: 'Illustrative skin-care consultation; not a mesotherapy procedure photo or client result.',
    introduction: 'Mesotherapy is a term used for different techniques and products. The exact method, substances and intended use can vary between providers.',
    information: 'Before proceeding, ask which products and delivery method are proposed, who will perform the procedure, what evidence supports the proposed use, and what risks and alternatives apply.',
    benefits: ['Some providers discuss it for skin appearance or hydration goals.', 'Potential benefits depend on the exact protocol and evidence for the intended use.', 'No outcome is assured.'],
    suitability: 'A qualified practitioner should review your health history, the products involved and any relevant sensitivities or medicines before deciding whether the procedure is appropriate.',
    procedure: ['Consultation and review of your goals and health history', 'Clear explanation of products, method, risks and alternatives', 'Treatment only by an appropriately qualified practitioner, if suitable', 'Protocol-specific aftercare and follow-up'],
    faqs: [
      ['What does mesotherapy involve?', 'The name covers different approaches. Ask the provider to describe the exact products and method planned for you.'],
      ['Does every mesotherapy treatment use injections?', 'Methods vary. Confirm whether the proposed treatment involves injections or another delivery method before consenting.'],
      ['How many appointments will I need?', 'There is no single schedule. Any plan should follow an individual assessment and should not promise a particular result.']
    ],
    related: [['Chemical Peel', 'peel.html'], ['Medi Facial', 'medifacial.html'], ['Platelet-Rich Plasma', 'platelet-rich-plasma.html']]
  },
  medifacial: {
    title: 'Medi Facial',
    image: '../assets/images/facial-treatment.jpg',
    imageAlt: 'Illustrative facial mask being applied by a skin-care professional',
    imageCaption: 'Illustrative facial imagery; not a client result.',
    introduction: '“Medi facial” can describe different clinic facial protocols. The products, devices and steps should be explained by the provider before your appointment.',
    information: 'A consultation helps identify your goals and sensitivities and gives the practitioner a chance to explain the proposed steps, possible reactions and aftercare.',
    benefits: ['May support cleansing or skin-comfort goals, depending on the protocol.', 'Products and steps can be adjusted when appropriate.', 'Visible results and skin response vary.'],
    suitability: 'Tell the practitioner about skin conditions, allergies, sensitivities and current products or medicines. A skin assessment is needed to determine suitability.',
    procedure: ['Skin consultation and sensitivity review', 'Explanation of the products and steps proposed', 'Facial treatment adapted to the agreed plan', 'Aftercare instructions and guidance on follow-up'],
    faqs: [
      ['What is included in a medi facial?', 'There is no single standard protocol. Ask which cleansing, exfoliation, products or devices are included.'],
      ['Can it be adapted for sensitive skin?', 'The practitioner should review your sensitivities and explain whether the available protocol is appropriate.'],
      ['How often should I book?', 'Timing depends on the treatment and your skin. Follow individualized advice rather than a fixed schedule.']
    ],
    related: [['Chemical Peel', 'peel.html'], ['Microdermabrasion', 'microdermabrasion.html'], ['Mesotherapy', 'mesotherapy.html']]
  },
  prp: {
    title: 'Platelet-Rich Plasma',
    image: 'https://images.pexels.com/photos/7446684/pexels-photo-7446684.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80',
    imageAlt: 'Illustrative patient and skin-care professional reviewing information',
    imageCaption: 'Illustrative clinic consultation; not a PRP procedure photo or client result.',
    introduction: 'Platelet-rich plasma (PRP) procedures use a component of a person’s own blood. Protocols, intended uses and delivery methods vary.',
    information: 'A qualified healthcare professional should explain whether blood is collected, how it is handled, how the treatment is delivered, and the relevant risks, evidence and alternatives.',
    benefits: ['Potential aims depend on the specific use and protocol.', 'Evidence and expected response can differ by indication.', 'No specific result or timeline can be promised.'],
    suitability: 'Suitability requires an individual clinical assessment, including relevant health history and medicines. Ask who is responsible for the procedure and follow-up.',
    procedure: ['Consultation with a qualified healthcare professional', 'Review of the proposed use, process, risks and alternatives', 'Treatment only after informed consent and suitability review', 'Individual aftercare and follow-up instructions'],
    faqs: [
      ['What happens during a PRP appointment?', 'Procedures vary. Your provider should explain any blood collection, preparation and delivery steps before you consent.'],
      ['Is PRP suitable for everyone?', 'No. A qualified healthcare professional must review your health history and the intended use.'],
      ['When will I see a result?', 'Response and timing vary, and a particular result cannot be guaranteed. Ask your provider what is realistic for the proposed use.']
    ],
    related: [['Mesotherapy', 'mesotherapy.html'], ['Medi Facial', 'medifacial.html'], ['Chemical Peel', 'peel.html']]
  },
  microdermabrasion: {
    title: 'Microdermabrasion',
    image: 'https://images.pexels.com/photos/30809943/pexels-photo-30809943.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80',
    imageAlt: 'Illustrative facial-care session at a spa',
    imageCaption: 'Illustrative skin-care imagery; not a microdermabrasion procedure photo or client result.',
    introduction: 'Microdermabrasion is a form of surface exfoliation. Equipment and techniques vary, so the provider should explain the specific approach planned.',
    information: 'Discuss the intended treatment area, expected skin response, possible irritation, alternatives and aftercare with the practitioner before deciding.',
    benefits: ['May be considered for surface texture or dullness concerns.', 'The response depends on the protocol and individual skin.', 'No particular outcome is guaranteed.'],
    suitability: 'A practitioner should assess skin sensitivity, current concerns, relevant conditions and recent procedures. Not every skin type or concern is suitable.',
    procedure: ['Consultation and skin assessment', 'Agreement on the device, approach and expected response', 'Controlled treatment only if considered appropriate', 'Aftercare advice and review if needed'],
    faqs: [
      ['What does microdermabrasion feel like?', 'Experience varies with the equipment and settings. The practitioner should explain sensations and possible reactions in advance.'],
      ['Is there downtime?', 'Skin response and recovery vary. Ask what to expect for the specific protocol and your skin.'],
      ['How many treatments are needed?', 'There is no universal schedule. A practitioner should recommend next steps only after assessment.']
    ],
    related: [['Chemical Peel', 'peel.html'], ['Medi Facial', 'medifacial.html'], ['Mesotherapy', 'mesotherapy.html']]
  },
  wart: {
    title: 'Wart Removal',
    image: 'https://images.pexels.com/photos/29648642/pexels-photo-29648642.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80',
    imageAlt: 'Illustrative dermatologist assessing a patient in a clinic',
    imageCaption: 'Illustrative consultation imagery; not a diagnosis or wart-removal result.',
    introduction: 'A wart-like skin growth should be assessed by a qualified healthcare professional before any removal is considered. This page does not diagnose skin lesions.',
    information: 'If a mark is new, changing, bleeding, painful or has not been diagnosed, seek medical assessment rather than treating it as a cosmetic concern. Removal options depend on diagnosis and provider qualifications.',
    benefits: ['Any treatment goal depends on a confirmed diagnosis and clinical recommendation.', 'Different lesions may need different care or referral.', 'Clearance and recurrence cannot be guaranteed.'],
    suitability: 'A medical assessment is required first. A booking enquiry is not a diagnosis or approval for treatment; the provider should explain qualifications, risks and alternatives.',
    procedure: ['Clinical assessment and confirmation of the concern', 'Discussion of appropriate options or referral', 'Informed consent before any suitable procedure', 'Aftercare and follow-up according to clinical advice'],
    faqs: [
      ['Do I need a diagnosis before removal?', 'Yes. A qualified healthcare professional should assess a wart-like lesion before treatment.'],
      ['Can removal be guaranteed?', 'No. The appropriate option and outcome depend on the diagnosis and individual response.'],
      ['Can I book online for a changing lesion?', 'Seek medical assessment for a new, changing, bleeding or painful lesion. Do not rely on a booking form for diagnosis.']
    ],
    related: [['Medi Facial', 'medifacial.html'], ['Microdermabrasion', 'microdermabrasion.html'], ['Chemical Peel', 'peel.html']]
  },
  semiPermanent: {
    title: 'Semi Permanent Make-Up',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Illustrative close-up beauty portrait with softly defined makeup',
    imageCaption: 'Illustrative makeup portrait; not a treatment application or client result.',
    introduction: 'Semi-permanent make-up uses pigment and a specialist technique to define features such as brows or lips. Technique, pigment and expected longevity vary.',
    information: 'A consultation should cover design, pigment, hygiene, healing, possible reactions, aftercare and any touch-up policy before you decide.',
    benefits: ['Can be discussed for a softly defined look tailored to personal preference.', 'Appearance and pigment retention vary by person and technique.', 'No particular shape, colour or duration is guaranteed.'],
    suitability: 'The practitioner should review relevant skin history, allergies, medicines and expectations, and explain any screening or patch testing that applies.',
    procedure: ['Consultation and design discussion', 'Review of pigment, hygiene, risks and aftercare', 'Treatment only after suitability review and informed consent', 'Healing guidance and any recommended review'],
    faqs: [
      ['How long does semi-permanent make-up last?', 'Longevity varies with technique, pigment, skin and aftercare. Ask the practitioner about the specific service offered.'],
      ['Can I choose the final shape and colour?', 'Design should be discussed and agreed before treatment. Results can vary, so ask how changes and concerns are handled.'],
      ['Are verified before-and-after photos available?', 'No verified client results have been supplied for this page yet. We will not use stock or generated images as treatment results.']
    ],
    related: [['Medi Facial', 'medifacial.html'], ['Chemical Peel', 'peel.html'], ['Mesotherapy', 'mesotherapy.html']]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const dropdowns = [...document.querySelectorAll('.main-nav .has-dropdown')];

  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('open');
      dropdown.querySelector('.nav-button')?.setAttribute('aria-expanded', 'false');
    });
  };

  const closeMobileNav = () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  let userScrollPending = false;
  let userScrollTimeout;
  const markUserScroll = () => {
    userScrollPending = true;
    window.clearTimeout(userScrollTimeout);
    userScrollTimeout = window.setTimeout(() => {
      userScrollPending = false;
    }, 250);
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) closeDropdowns();
    });
  }

  dropdowns.forEach((dropdown, index) => {
    const button = dropdown.querySelector('.nav-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!button || !menu) return;

    menu.id = menu.id || `${button.textContent.trim().toLowerCase().replace(/\s+/g, '-')}-dropdown-${index}`;
    button.setAttribute('aria-controls', menu.id);
    button.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('open');
    button.addEventListener('click', () => {
      const isOpen = dropdown.classList.contains('open');
      closeDropdowns();
      if (!isOpen) dropdown.classList.add('open');
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeDropdowns();
      if (window.matchMedia('(max-width: 980px)').matches) closeMobileNav();
    });
  });

  document.querySelectorAll('[data-service-grid]').forEach((grid) => {
    const services = serviceCatalog[grid.dataset.serviceGrid];
    if (!services) return;

    services.forEach((service) => {
      const card = document.createElement('article');
      card.className = 'service-option-card';
      if (service.anchorId) card.id = service.anchorId;

      const image = document.createElement('img');
      image.src = service.image;
      image.alt = service.alt;
      image.loading = 'lazy';
      image.decoding = 'async';

      const copy = document.createElement('div');
      copy.className = 'service-option-copy';

      const category = document.createElement('span');
      category.className = 'eyebrow';
      category.textContent = service.category;

      const heading = document.createElement('h3');
      heading.textContent = service.name;

      const description = document.createElement('p');
      description.textContent = service.description;

      const link = document.createElement('a');
      link.className = 'card-link';
      link.href = `service-detail.html?service=${encodeURIComponent(service.id)}`;
      link.setAttribute('aria-label', `Explore ${service.name}`);
      link.append(document.createTextNode('Explore Service '));

      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      link.append(arrow);

      copy.append(category, heading, description, link);
      card.append(image, copy);
      grid.append(card);
    });
  });

  const serviceDetailContent = document.getElementById('service-detail-content');
  if (serviceDetailContent) {
    const serviceId = new URLSearchParams(window.location.search).get('service');
    const service = Object.values(serviceCatalog).flat().find((item) => item.id === serviceId);
    const unavailableMessage = document.getElementById('service-detail-unavailable');

    if (service) {
      document.title = `${service.name} | EVolve Salon`;
      document.getElementById('service-detail-title').textContent = service.name;
      document.getElementById('service-detail-breadcrumb').textContent = service.name;
      document.getElementById('service-detail-category').textContent = service.category;
      document.getElementById('service-detail-description').textContent = service.description;
      const image = document.getElementById('service-detail-image');
      image.src = service.image;
      image.alt = service.alt;
      serviceDetailContent.hidden = false;
    } else if (unavailableMessage) {
      unavailableMessage.hidden = false;
    }
  }

  const treatmentRoot = document.querySelector('[data-aesthetic-treatment]');
  if (treatmentRoot) {
    const treatment = aestheticTreatmentCatalog[treatmentRoot.dataset.aestheticTreatment];
    const createNode = (tagName, className, text) => {
      const node = document.createElement(tagName);
      if (className) node.className = className;
      if (text) node.textContent = text;
      return node;
    };

    if (!treatment) {
      const message = createNode('p', 'treatment-results-notice', 'Treatment information is unavailable. Please return to Aesthetics or contact the team.');
      message.setAttribute('role', 'alert');
      treatmentRoot.append(message);
    } else {
      const container = createNode('div', 'container');
      const overview = createNode('div', 'treatment-overview');
      const overviewCopy = createNode('div', 'treatment-overview-copy');
      overviewCopy.append(
        createNode('span', 'eyebrow', 'Treatment information'),
        createNode('h2', 'section-title', `About ${treatment.title}`),
        createNode('p', 'lead', treatment.introduction),
        createNode('p', '', treatment.information)
      );

      const heroFigure = createNode('figure', 'treatment-hero-media');
      const heroImage = createNode('img');
      heroImage.src = treatment.image;
      heroImage.alt = treatment.imageAlt;
      heroImage.loading = 'lazy';
      heroFigure.append(heroImage, createNode('figcaption', '', treatment.imageCaption));
      overview.append(overviewCopy, heroFigure);
      container.append(overview);

      const infoGrid = createNode('div', 'treatment-info-grid');
      [
        { label: 'Potential benefits', title: 'Goals and outcomes vary', items: treatment.benefits },
        { label: 'Suitability', title: 'An assessment comes first', text: treatment.suitability }
      ].forEach((item) => {
        const card = createNode('article', 'treatment-info-card');
        card.append(createNode('span', 'eyebrow', item.label), createNode('h3', '', item.title));
        if (item.items) {
          const list = createNode('ul');
          item.items.forEach((text) => list.append(createNode('li', '', text)));
          card.append(list);
        } else {
          card.append(createNode('p', '', item.text));
        }
        infoGrid.append(card);
      });
      container.append(infoGrid);

      const procedure = createNode('section', 'treatment-procedure');
      procedure.append(createNode('span', 'eyebrow', 'Procedure overview'), createNode('h2', 'section-title', 'What to expect'));
      const stepGrid = createNode('div', 'treatment-step-grid');
      treatment.procedure.forEach((text, index) => {
        const step = createNode('article', 'treatment-step');
        step.append(
          createNode('span', '', String(index + 1).padStart(2, '0')),
          createNode('h3', '', ['Consultation', 'Plan', 'Treatment', 'Aftercare'][index]),
          createNode('p', '', text)
        );
        stepGrid.append(step);
      });
      procedure.append(stepGrid);
      container.append(procedure);

      const results = createNode('section', 'treatment-results');
      results.append(createNode('span', 'eyebrow', 'Before & after gallery'), createNode('h2', 'section-title', `${treatment.title} results`));
      const resultsNotice = createNode('div', 'treatment-results-notice');
      resultsNotice.setAttribute('role', 'note');
      resultsNotice.append(
        createNode('strong', '', `Verified ${treatment.title} before-and-after photos have not yet been supplied.`),
        createNode('p', '', 'No comparison images are shown here. We will only publish genuine treatment photographs when their source, treatment relevance and informed client consent can be verified; stock and generated images will never be presented as results.')
      );
      results.append(resultsNotice);
      container.append(results);

      const faq = createNode('section', 'treatment-faq');
      faq.append(createNode('span', 'eyebrow', 'Helpful guidance'), createNode('h2', 'section-title', 'Frequently asked questions'));
      const faqList = createNode('div', 'treatment-faq-list');
      treatment.faqs.forEach(([question, answer]) => {
        const details = createNode('details');
        details.append(createNode('summary', '', question), createNode('p', '', answer));
        faqList.append(details);
      });
      faq.append(faqList);
      container.append(faq);

      const related = createNode('section', 'treatment-related');
      related.append(createNode('span', 'eyebrow', 'Explore further'), createNode('h2', 'section-title', 'Related treatments'));
      const relatedList = createNode('div', 'treatment-related-list');
      treatment.related.forEach(([label, href]) => {
        const link = createNode('a', '', label);
        link.href = href;
        relatedList.append(link);
      });
      related.append(relatedList);
      const enquiry = createNode('div', 'treatment-enquiry');
      const enquiryLink = createNode('a', 'button', `Enquire about ${treatment.title}`);
      enquiryLink.href = '../contact.html#booking';
      enquiry.append(enquiryLink);
      related.append(enquiry);
      container.append(related);

      treatmentRoot.append(container);
    }
  }

  const serviceTabs = [...document.querySelectorAll('[data-service-tab]')];
  const activateServiceTab = (tab) => {
    serviceTabs.forEach((candidate) => {
      const isSelected = candidate === tab;
      const panel = document.getElementById(candidate.getAttribute('aria-controls'));
      candidate.classList.toggle('is-active', isSelected);
      candidate.setAttribute('aria-pressed', String(isSelected));
      if (panel) {
        panel.hidden = !isSelected;
        panel.classList.toggle('is-active', isSelected);
      }
    });
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateServiceTab(tab));
  });

  if (window.location.hash && serviceTabs.length) {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    const targetPanel = target?.closest('.service-persona');
    const matchingTab = serviceTabs.find((tab) => tab.getAttribute('aria-controls') === targetPanel?.id);
    if (matchingTab) {
      activateServiceTab(matchingTab);
      target?.scrollIntoView({ block: 'start' });
    }
  }

  const enquiryForm = document.querySelector('.contact-enquiry-form');
  enquiryForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const service = formData.get('service');
    const subject = encodeURIComponent(`${service} enquiry`);
    const body = encodeURIComponent([
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone') || 'Not provided'}`,
      `Service: ${service}`,
      '',
      formData.get('message'),
    ].join('\n'));
    window.location.href = `mailto:hello@evolvesalon.com?subject=${subject}&body=${body}`;
  });

  document.addEventListener('click', (event) => {
    const clickedElement = event.target?.closest ? event.target : event.target?.parentElement;
    if (clickedElement?.closest('.nav-button, .dropdown-menu')) return;
    closeDropdowns();
  });

  document.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
      const target = event.target?.closest ? event.target : event.target?.parentElement;
      if (!target?.closest('input, textarea, select, button, a, [contenteditable="true"]')) {
        markUserScroll();
      }
    }

    if (event.key !== 'Escape') return;

    const openDropdown = dropdowns.find((dropdown) => dropdown.classList.contains('open'));
    const mobileNavWasOpen = nav?.classList.contains('open');
    closeDropdowns();
    if (window.matchMedia('(max-width: 980px)').matches && mobileNavWasOpen) {
      closeMobileNav();
    }
    if (openDropdown) {
      openDropdown.querySelector('.nav-button')?.focus();
    } else if (mobileNavWasOpen) {
      toggle?.focus();
    }
  });

  window.addEventListener('wheel', markUserScroll, { passive: true });
  window.addEventListener('touchmove', markUserScroll, { passive: true });
  window.addEventListener('scroll', () => {
    if (!userScrollPending) return;
    userScrollPending = false;
    window.clearTimeout(userScrollTimeout);
    closeDropdowns();
  }, { passive: true });

  window.addEventListener('resize', () => {
    closeDropdowns();
    if (!window.matchMedia('(max-width: 980px)').matches) closeMobileNav();
  });

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});
