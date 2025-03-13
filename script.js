import productData from '/data.js';

// Ensure that the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Render products
    function renderProducts(category) {
        const container = document.getElementById(`${category}-container`);
        const template = document.getElementById('product-template');
        const products = productData[category];

        container.innerHTML = '';

        products.forEach(product => {
            const clone = template.content.cloneNode(true);
            
            const card = clone.querySelector('.card');
            card.dataset.id = product.id;

            const link = clone.querySelector('a');
            link.href = `${product.mainImage.replace(/^[./]+/, 'images/')}`;
            
            const img = clone.querySelector('img');
            img.src = `${(product.thumbnailImage || product.mainImage).replace(/^[./]+/, 'images/')}`;
            img.alt = product.title;
            img.onerror = function() {
                this.src = 'images/placeholder.png';
                this.onerror = null;
            };
            
            const title = clone.querySelector('.card-title');
            title.textContent = product.title;
            
            const description = clone.querySelector('.card-description');
            description.textContent = product.description;

            // Set up Fancybox
            link.dataset.fancybox = category; // Separate galleries per category
            link.dataset.caption = `${product.title}`;

            container.appendChild(clone);
        });
    }

    // Initialize with shopping products
    renderProducts('shopping');

    // Update products when tab changes
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            renderProducts(tabId);
        });
    });
    
    // Initialize Fancybox
    Fancybox.bind("[data-fancybox]", {
        Images: {
            zoom: true,
        },
        Carousel: {
            infinite: true,
            navigation: true
        },
        Toolbar: {
            display: {
                left: ["close"],
                middle: [],
                right: ["slideshow", "fullscreen"]
            },
            autoEnable: false
        },
        Navigation: {
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.59 6L12 7.41 7.83 12 12 16.59 10.59 18l-6-6z"/></svg>',
        },
        Image: {
            fit: "contain",
            ratio: 16/9,
        },
        l10n: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
        }
    });
    
});
