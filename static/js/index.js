window.HELP_IMPROVE_VIDEOJS = false;

function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element && value !== undefined && value !== null) element.setAttribute('content', value);
}

function hasLink(value) {
    if (!value) return false;

    const normalized = String(value).trim();
    return normalized !== ''
        && normalized !== '#'
        && normalized.toUpperCase() !== 'TBD'
        && !normalized.startsWith('PROJECT_')
        && !normalized.startsWith('AUTHOR_');
}

function applyProjectConfig() {
    const config = window.PROJECT_CONFIG;
    if (!config) return;

    const authorNames = config.authors.map(author => author.name).join(', ');
    const authorBibtex = config.authors.map(author => author.name).join(' and ');
    const pageUrl = hasLink(config.pageUrl) ? config.pageUrl : '';
    const socialPreview = pageUrl ? `${pageUrl.replace(/\/$/, '')}/static/images/network_architecture.png` : '';

    document.title = `${config.title} - ${authorNames}`;

    setMeta('meta[name="title"]', `${config.title} - ${authorNames}`);
    setMeta('meta[name="description"]', config.shortDescription);
    setMeta('meta[name="keywords"]', config.keywords);
    setMeta('meta[name="author"]', authorNames);
    setMeta('meta[property="og:site_name"]', config.institution);
    setMeta('meta[property="og:title"]', config.title);
    setMeta('meta[property="og:description"]', config.shortDescription);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:image"]', socialPreview);
    setMeta('meta[name="twitter:title"]', config.title);
    setMeta('meta[name="twitter:description"]', config.shortDescription);
    setMeta('meta[name="twitter:image"]', socialPreview);
    setMeta('meta[name="citation_title"]', config.title);
    setMeta('meta[name="citation_author"]', config.authors[0]?.citationName || config.authors[0]?.name);
    setMeta('meta[name="citation_publication_date"]', config.year);
    setMeta('meta[name="citation_conference_title"]', config.venue);
    setMeta('meta[name="citation_pdf_url"]', config.paperUrl);

    document.querySelectorAll('[data-project-text]').forEach(element => {
        const key = element.dataset.projectText;
        if (config[key] !== undefined) element.textContent = config[key];
    });

    document.querySelectorAll('[data-project-href]').forEach(element => {
        const key = element.dataset.projectHref;
        if (hasLink(config[key])) {
            element.setAttribute('href', config[key]);
            element.setAttribute('target', '_blank');
            element.classList.remove('is-coming-soon');
            element.removeAttribute('aria-disabled');
        } else {
            element.removeAttribute('href');
            element.removeAttribute('target');
            element.classList.add('is-coming-soon');
            element.setAttribute('aria-disabled', 'true');

            const label = element.querySelector('span:last-child');
            if (label) label.textContent = 'Coming Soon';
        }
    });

    const authorsContainer = document.getElementById('project-authors');
    if (authorsContainer) {
        authorsContainer.innerHTML = '';
        config.authors.forEach((author, index) => {
            const wrapper = document.createElement('span');
            wrapper.className = 'author-block';

            if (hasLink(author.url)) {
                const link = document.createElement('a');
                link.href = author.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = author.name;
                wrapper.appendChild(link);
            } else {
                wrapper.appendChild(document.createTextNode(author.name));
            }

            if (author.equalContribution) {
                const equalMark = document.createElement('sup');
                equalMark.textContent = '*';
                wrapper.appendChild(equalMark);
            }

            if (index < config.authors.length - 1) {
                wrapper.appendChild(document.createTextNode(','));
            }

            authorsContainer.appendChild(wrapper);
        });
    }

    const equalContributionNote = document.getElementById('equal-contribution-note');
    if (equalContributionNote && !config.authors.some(author => author.equalContribution)) {
        equalContributionNote.remove();
    }

    const resultsContainer = document.getElementById('project-results');
    if (resultsContainer && Array.isArray(config.results)) {
        resultsContainer.innerHTML = '';

        config.results.forEach((result, index) => {
            const item = document.createElement('article');
            item.className = 'result-block';

            const image = document.createElement('img');
            image.src = result.image;
            image.alt = result.alt || `Project result ${index + 1}`;
            image.loading = 'lazy';
            item.appendChild(image);

            const text = document.createElement('div');
            text.className = 'result-text content has-text-justified';

            if (result.title) {
                const title = document.createElement('h3');
                title.className = 'title is-4';
                title.textContent = result.title;
                text.appendChild(title);
            }

            const description = result.description || result.caption;
            if (description) {
                const paragraph = document.createElement('p');
                paragraph.textContent = description;
                text.appendChild(paragraph);
            }

            item.appendChild(text);
            resultsContainer.appendChild(item);
        });
    }

    const bibtexElement = document.querySelector('[data-project-text="bibtex"]');
    if (bibtexElement && config.bibtex) {
        bibtexElement.textContent = config.bibtex
            .replaceAll('PROJECT_TITLE', config.title)
            .replaceAll('PROJECT_VENUE', config.venue)
            .replaceAll('PROJECT_YEAR', config.year)
            .replaceAll('PROJECT_PAGE_URL', pageUrl || 'Coming soon')
            .replace('Author One and Author Two and Author Three', authorBibtex);
    }
}

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    if (!dropdown || !button) return;
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && dropdown && button && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        if (!dropdown || !button) return;
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    if (!bibtexElement || !button) return;
    const copyText = button.querySelector('.copy-text');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Copied';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Copied';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        button.classList.add('copied');
        copyText.textContent = 'Copied';
        setTimeout(function() {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    applyProjectConfig();

    const options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    };

    if (window.bulmaCarousel && document.querySelector('.carousel')) {
        bulmaCarousel.attach('.carousel', options);
    }
	
    if (window.bulmaSlider) {
        bulmaSlider.attach();
    }
    
    setupVideoCarouselAutoplay();
});
