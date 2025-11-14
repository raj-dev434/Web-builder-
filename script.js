/* ---------- OMDb API CONFIGURATION ---------- */
const OMDB_API_KEY = '76764ddc';
const OMDB_API = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=`;

// SVG placeholder for images (always works)
const PLACEHOLDER_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUE5QTlBIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg==';

// Register component type BEFORE initializing editor
grapesjs.plugins.add('omdb-movie-type', (editor) => {
  editor.DomComponents.addType('omdb-movie', {
    model: {
      defaults: {
            script: function () {
  const el = this;
  const movieId = el.getAttribute('data-movie-id');
  
  if (!movieId) {
    el.querySelector('.movie-title').textContent = 'No ID';
    return;
  }

  console.log('Fetching OMDb:', movieId);

  (async () => {
    try {
      // FINAL: corsproxy.io (NO KEY, NO CSP, WORKS IN INDIA)
      const omdbUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=76764ddc`;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(omdbUrl)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.Response === 'True') {
        updateMovieWithData(el, data);
      } else {
        showError(el, data.Error || 'Not found');
      }
    } catch (err) {
      console.error('Fetch failed:', err);
      showDemoData(el, movieId);
    }
  })();
}
        }
      }
  });
});

const editor =grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: true,
  autorender: true,
  plugins: ['omdb-movie-type'],
  storageManager: { 
    type: 'local', 
    autosave: true, 
    autoload: true, 
    stepsBeforeSave: 1 
  },

  blockManager: {
    appendTo: '#blocks',
    blocks: [
      /* ========== BASIC COMPONENTS ========== */
      { 
        id: 'hero-section', 
        label: 'Hero Section', 
        category: 'Layout',
        content: `<section style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 20px; text-align: center;">
                    <h1 style="font-size: 3em; margin: 0 0 20px 0;">Welcome to MovieHub</h1>
                    <p style="font-size: 1.2em; margin: 0 0 30px 0; opacity: 0.9;">Discover the best movies and TV shows</p>
                    <button style="background: #ff6b6b; color: white; border: none; padding: 12px 30px; font-size: 1.1em; border-radius: 25px; cursor: pointer;">Explore Now</button>
                  </section>` 
      },
      { 
        id: 'Basic-header', 
        label: 'Header', 
        category: 'Basic', 
        content: '<h1 style="text-align:center;color:#333;padding:20px;margin:0;">My Site</h1>' 
      },
       { 
        id: 'business-hero', 
        label: 'Business Hero', 
        category: 'Hero',
        content: `<section style="background: #f8f9fa; padding: 100px 20px;">
                  <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 50px;">
                    <div style="flex: 1;">
                      <h1 style="font-size: 3em; color: #2c3e50; margin: 0 0 20px 0; line-height: 1.2;">Grow Your Business with Our Solutions</h1>
                      <p style="font-size: 1.2em; color: #7f8c8d; margin: 0 0 30px 0; line-height: 1.6;">We provide innovative solutions to help your business reach new heights and achieve success.</p>
                      <button style="background: #3498db; color: white; border: none; padding: 15px 35px; font-size: 1.1em; border-radius: 5px; cursor: pointer; font-weight: 600;">Start Free Trial</button>
                    </div>
                    <div style="flex: 1; text-align: center;">
                      <div style="background: #ecf0f1; padding: 60px; border-radius: 10px; display: inline-block;">
                        <span style="font-size: 3em; color: #3498db;">📊</span>
                      </div>
                    </div>
                  </div>
                </section>` 
    },
    {
        id: 'modern-navbar',
        label: 'Modern Navbar',
        category: 'Navigation',
        content: `<header style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 0 20px;">
                  <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; height: 70px;">
                    <div style="display: flex; align-items: center; gap: 40px;">
                      <div style="font-size: 1.5em; font-weight: bold; color: #2c3e50;">Logo</div>
                      <nav style="display: flex; gap: 30px;">
                        <a href="#" style="color: #2c3e50; text-decoration: none; font-weight: 500;">Home</a>
                        <a href="#" style="color: #2c3e50; text-decoration: none; font-weight: 500;">Features</a>
                        <a href="#" style="color: #2c3e50; text-decoration: none; font-weight: 500;">Pricing</a>
                        <a href="#" style="color: #2c3e50; text-decoration: none; font-weight: 500;">Contact</a>
                      </nav>
                    </div>
                    <div>
                      <button style="background: #3498db; color: white; border: none; padding: 10px 25px; border-radius: 5px; cursor: pointer; font-weight: 500;">Sign Up</button>
                    </div>
                  </div>
                </header>`
      },
      {
        id: 'features-grid',
        label: 'Features Grid',
        category: 'Sections',
        content: `<section style="padding: 80px 20px; background: #f8f9fa;">
                  <div style="max-width: 1200px; margin: 0 auto;">
                    <h2 style="text-align: center; font-size: 2.5em; color: #2c3e50; margin: 0 0 60px 0;">Why Choose Us</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
                      <div style="text-align: center; padding: 30px;">
                        <div style="background: #3498db; color: white; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.5em;">🚀</div>
                        <h3 style="color: #2c3e50; margin: 0 0 15px 0;">Fast Performance</h3>
                        <p style="color: #7f8c8d; line-height: 1.6;">Lightning fast loading times and smooth user experience.</p>
                      </div>
                      <div style="text-align: center; padding: 30px;">
                        <div style="background: #2ecc71; color: white; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.5em;">🔒</div>
                        <h3 style="color: #2c3e50; margin: 0 0 15px 0;">Secure & Safe</h3>
                        <p style="color: #7f8c8d; line-height: 1.6;">Enterprise-grade security to protect your data.</p>
                      </div>
                      <div style="text-align: center; padding: 30px;">
                        <div style="background: #e74c3c; color: white; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.5em;">💡</div>
                        <h3 style="color: #2c3e50; margin: 0 0 15px 0;">Easy to Use</h3>
                        <p style="color: #7f8c8d; line-height: 1.6;">Intuitive interface that anyone can master quickly.</p>
                      </div>
                    </div>
                  </div>
                </section>`
      },

      { 
        id: 'modern-hero', 
        label: 'Modern Hero', 
        category: 'Hero',
        content: `<section style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center;">
                  <div style="max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3.5em; margin: 0 0 20px 0; font-weight: 300;">Create Amazing Websites</h1>
                    <p style="font-size: 1.3em; margin: 0 0 40px 0; opacity: 0.9;">Build beautiful, responsive websites with our powerful drag & drop builder</p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                      <button style="background: #fff; color: #667eea; border: none; padding: 15px 35px; font-size: 1.1em; border-radius: 30px; cursor: pointer; font-weight: 600;">Get Started</button>
                      <button style="background: transparent; color: white; border: 2px solid white; padding: 15px 35px; font-size: 1.1em; border-radius: 30px; cursor: pointer; font-weight: 600;">Learn More</button>
                    </div>
                  </div>
                </section>` 
      },
      { 
        id: 'section-title', 
        label: 'Section Title', 
        category: 'Basic',
        content: '<h2 style="color:#2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin: 30px 0 20px 0;">Featured Movies</h2>'
      },
      /* ========== GALLERY & PORTFOLIO ========== */
    {
      id: 'image-gallery',
      label: 'Image Gallery',
      category: 'Media',
      content: `<section style="padding: 60px 20px;">
                  <div style="max-width: 1200px; margin: 0 auto;">
                    <h2 style="text-align: center; font-size: 2.5em; color: #2c3e50; margin: 0 0 40px 0;">Our Gallery</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                      <div style="background: #ecf0f1; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #7f8c8d;">Image 1</div>
                      <div style="background: #ecf0f1; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #7f8c8d;">Image 2</div>
                      <div style="background: #ecf0f1; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #7f8c8d;">Image 3</div>
                      <div style="background: #ecf0f1; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #7f8c8d;">Image 4</div>
                    </div>
                  </div>
                </section>`
    },

    /* ========== TESTIMONIALS ========== */
    {
      id: 'testimonials',
      label: 'Testimonials',
      category: 'Sections',
      content: `<section style="padding: 80px 20px; background: #2c3e50; color: white;">
                  <div style="max-width: 1200px; margin: 0 auto;">
                    <h2 style="text-align: center; font-size: 2.5em; margin: 0 0 60px 0;">What Our Clients Say</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                      <div style="background: #34495e; padding: 30px; border-radius: 10px;">
                        <p style="font-style: italic; margin: 0 0 20px 0; line-height: 1.6;">"This platform transformed our business. The results were incredible!"</p>
                        <div style="display: flex; align-items: center; gap: 15px;">
                          <div style="width: 50px; height: 50px; background: #3498db; border-radius: 50%;"></div>
                          <div>
                            <div style="font-weight: bold;">John Smith</div>
                            <div style="color: #bdc3c7; font-size: 0.9em;">CEO, Company</div>
                          </div>
                        </div>
                      </div>
                      <div style="background: #34495e; padding: 30px; border-radius: 10px;">
                        <p style="font-style: italic; margin: 0 0 20px 0; line-height: 1.6;">"Outstanding service and support. Highly recommended!"</p>
                        <div style="display: flex; align-items: center; gap: 15px;">
                          <div style="width: 50px; height: 50px; background: #2ecc71; border-radius: 50%;"></div>
                          <div>
                            <div style="font-weight: bold;">Sarah Johnson</div>
                            <div style="color: #bdc3c7; font-size: 0.9em;">Marketing Director</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>`
    },

    /* ========== PRICING TABLES ========== */
    {
      id: 'pricing-table',
      label: 'Pricing Table',
      category: 'E-commerce',
      content: `<section style="padding: 80px 20px; background: #f8f9fa;">
                  <div style="max-width: 1200px; margin: 0 auto;">
                    <h2 style="text-align: center; font-size: 2.5em; color: #2c3e50; margin: 0 0 60px 0;">Simple Pricing</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                      <div style="background: white; padding: 40px; border-radius: 10px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="color: #2c3e50; margin: 0 0 20px 0;">Basic</h3>
                        <div style="font-size: 3em; color: #3498db; margin: 0 0 20px 0;">$19<span style="font-size: 0.5em; color: #7f8c8d;">/mo</span></div>
                        <ul style="list-style: none; padding: 0; margin: 0 0 30px 0; text-align: left;">
                          <li style="padding: 8px 0; color: #7f8c8d;">✓ 10 Projects</li>
                          <li style="padding: 8px 0; color: #7f8c8d;">✓ 5GB Storage</li>
                          <li style="padding: 8px 0; color: #7f8c8d;">✓ Basic Support</li>
                        </ul>
                        <button style="background: #3498db; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: 600;">Get Started</button>
                      </div>
                      <div style="background: #3498db; color: white; padding: 40px; border-radius: 10px; text-align: center; box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3); transform: scale(1.05);">
                        <h3 style="margin: 0 0 20px 0;">Pro</h3>
                        <div style="font-size: 3em; margin: 0 0 20px 0;">$49<span style="font-size: 0.5em; opacity: 0.8;">/mo</span></div>
                        <ul style="list-style: none; padding: 0; margin: 0 0 30px 0; text-align: left;">
                          <li style="padding: 8px 0; opacity: 0.9;">✓ Unlimited Projects</li>
                          <li style="padding: 8px 0; opacity: 0.9;">✓ 50GB Storage</li>
                          <li style="padding: 8px 0; opacity: 0.9;">✓ Priority Support</li>
                        </ul>
                        <button style="background: white; color: #3498db; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: 600;">Get Started</button>
                      </div>
                    </div>
                  </div>
                </section>`
    },

    /* ========== CONTACT FORMS ========== */
    {
      id: 'contact-form',
      label: 'Contact Form',
      category: 'Forms',
      content: `<section style="padding: 80px 20px;">
                  <div style="max-width: 600px; margin: 0 auto;">
                    <h2 style="text-align: center; font-size: 2.5em; color: #2c3e50; margin: 0 0 40px 0;">Get In Touch</h2>
                    <form style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                      <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 500;">Name</label>
                        <input type="text" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1em;">
                      </div>
                      <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 500;">Email</label>
                        <input type="email" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1em;">
                      </div>
                      <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 500;">Message</label>
                        <textarea style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1em; height: 120px; resize: vertical;"></textarea>
                      </div>
                      <button style="background: #3498db; color: white; border: none; padding: 15px 30px; border-radius: 5px; cursor: pointer; font-weight: 600; width: 100%;">Send Message</button>
                    </form>
                  </div>
                </section>`
    },

    /* ========== BLOG COMPONENTS ========== */
    {
      id: 'blog-post',
      label: 'Blog Post',
      category: 'Blog',
      content: `<article style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
                  <h1 style="font-size: 2.5em; color: #2c3e50; margin: 0 0 20px 0;">Blog Post Title</h1>
                  <div style="color: #7f8c8d; margin-bottom: 30px;">
                    <span>By Author Name</span> • <span>March 15, 2024</span> • <span>5 min read</span>
                  </div>
                  <div style="background: #ecf0f1; height: 300px; border-radius: 8px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; color: #7f8c8d;">
                    Featured Image
                  </div>
                  <p style="font-size: 1.1em; line-height: 1.7; color: #2c3e50; margin-bottom: 20px;">
                    This is the introduction to your blog post. It should capture the reader's attention and provide a brief overview of what they'll learn.
                  </p>
                  <p style="font-size: 1.1em; line-height: 1.7; color: #2c3e50;">
                    Continue writing your blog post content here. You can add more paragraphs, images, and other elements as needed.
                  </p>
                </article>`
    },

    /* ========== CALL TO ACTION ========== */
    {
      id: 'cta-section',
      label: 'Call to Action',
      category: 'Marketing',
      content: `<section style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 20px; text-align: center;">
                  <div style="max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5em; margin: 0 0 20px 0;">Ready to Get Started?</h2>
                    <p style="font-size: 1.2em; margin: 0 0 40px 0; opacity: 0.9;">Join thousands of satisfied customers and transform your business today.</p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                      <button style="background: white; color: #667eea; border: none; padding: 15px 35px; font-size: 1.1em; border-radius: 30px; cursor: pointer; font-weight: 600;">Start Free Trial</button>
                      <button style="background: transparent; color: white; border: 2px solid white; padding: 15px 35px; font-size: 1.1em; border-radius: 30px; cursor: pointer; font-weight: 600;">Schedule Demo</button>
                    </div>
                  </div>
                </section>`
    },

    /* ========== TEAM SECTION ========== */
    {
      id: 'team-section',
      label: 'Team Section',
      category: 'Sections',
      content: `<section style="padding: 80px 20px; background: #f8f9fa;">
                  <div style="max-width: 1200px; margin: 0 auto;">
                    <h2 style="text-align: center; font-size: 2.5em; color: #2c3e50; margin: 0 0 60px 0;">Meet Our Team</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px;">
                      <div style="text-align: center;">
                        <div style="background: #3498db; width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em;">👨‍💼</div>
                        <h3 style="color: #2c3e50; margin: 0 0 10px 0;">John Doe</h3>
                        <p style="color: #3498db; margin: 0 0 15px 0; font-weight: 500;">CEO & Founder</p>
                        <p style="color: #7f8c8d;">Visionary leader with 10+ years of industry experience.</p>
                      </div>
                      <div style="text-align: center;">
                        <div style="background: #2ecc71; width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em;">👩‍💼</div>
                        <h3 style="color: #2c3e50; margin: 0 0 10px 0;">Jane Smith</h3>
                        <p style="color: #2ecc71; margin: 0 0 15px 0; font-weight: 500;">CTO</p>
                        <p style="color: #7f8c8d;">Technical expert driving innovation and development.</p>
                      </div>
                    </div>
                  </div>
                </section>`
      },

      
      /* ========== MOVIE CARDS ========== */
      { 
        id: 'movie-card', 
        label: 'Movie Card', 
        category: 'Movie Website',
        content: `<div class="movie-card" style="background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:15px;margin:10px;max-width:300px;">
                    <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Poster" style="width:100%;border-radius:4px;">
                    <div class="movie-title" style="font-weight:bold;margin:10px 0;font-size:18px;">Movie Title</div>
                    <div class="movie-year" style="color:#666;margin-bottom:10px;">2023</div>
                    <div class="movie-description" style="color:#777;line-height:1.4;">Movie description goes here...</div>
                  </div>` 
      },
      {
        id: 'movie-card-dark',
        label: 'Dark Movie Card',
        category: 'Movie Website',
        content: `<div class="movie-card" style="background:#2c3e50;color:white;border:1px solid #34495e;border-radius:12px;padding:20px;margin:10px;max-width:300px;box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Poster" style="width:100%;border-radius:8px;margin-bottom:15px;">
                    <div class="movie-title" style="font-weight:bold;margin:10px 0;font-size:20px;color:#ecf0f1;">Movie Title</div>
                    <div class="movie-year" style="color:#bdc3c7;margin-bottom:10px;font-size:14px;">2023 • Action</div>
                    <div class="movie-description" style="color:#95a5a6;line-height:1.5;font-size:14px;">An exciting movie description that captures the essence of the film.</div>
                    <div style="margin-top:15px;display:flex;justify-content:space-between;align-items:center;">
                      <span style="background:#e74c3c;color:white;padding:4px 8px;border-radius:4px;font-size:12px;">⭐ 8.5/10</span>
                      <button style="background:#3498db;color:white;border:none;padding:6px 12px;border-radius:4px;font-size:12px;cursor:pointer;">Watch</button>
                    </div>
                  </div>`
      },

      /* ========== LAYOUT COMPONENTS ========== */
      {
        id: 'two-column',
        label: 'Two Columns',
        category: 'Layout',
        content: `<div style="display: flex; gap: 20px; padding: 20px;">
                    <div style="flex: 1; background: #f8f9fa; padding: 20px; border-radius: 8px;">
                      <h3>Column 1</h3>
                      <p>Left column content</p>
                    </div>
                    <div style="flex: 1; background: #f8f9fa; padding: 20px; border-radius: 8px;">
                      <h3>Column 2</h3>
                      <p>Right column content</p>
                    </div>
                  </div>`
      },
      {
        id: 'three-column',
        label: 'Three Columns',
        category: 'Layout',
        content: `<div style="display: flex; gap: 15px; padding: 20px;">
                    <div style="flex: 1; background: #ecf0f1; padding: 15px; border-radius: 6px; text-align:center;">
                      <h4>Feature 1</h4>
                      <p>Description</p>
                    </div>
                    <div style="flex: 1; background: #ecf0f1; padding: 15px; border-radius: 6px; text-align:center;">
                      <h4>Feature 2</h4>
                      <p>Description</p>
                    </div>
                    <div style="flex: 1; background: #ecf0f1; padding: 15px; border-radius: 6px; text-align:center;">
                      <h4>Feature 3</h4>
                      <p>Description</p>
                    </div>
                  </div>`
      },

      /* ========== MEDIA COMPONENTS ========== */
      { 
        id: 'movie-trailer',
        label: 'Trailer',
        category: 'Movie Website',
        content: '<div style="text-align:center;padding:20px;"><iframe class="movie-trailer" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;max-width:560px;height:315px;border-radius:8px;"></iframe></div>' 
      },
      {
        id: 'video-section',
        label: 'Video Section',
        category: 'Movie Website',
        content: `<section style="background: #1a1a1a; padding: 40px 20px; text-align: center;">
                    <h2 style="color: white; margin-bottom: 30px;">Latest Trailers</h2>
                    <div style="display: inline-block; background: #2c2c2c; padding: 20px; border-radius: 10px;">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>
                    </div>
                  </section>`
      },

      /* ========== BUTTONS & CTAs ========== */
      {
        id: 'cta-button',
        label: 'CTA Button',
        category: 'Elements',
        content: '<button style="background: linear-gradient(45deg, #FF416C, #FF4B2B); color: white; border: none; padding: 15px 30px; font-size: 1.1em; border-radius: 30px; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 75, 43, 0.3);">Watch Now</button>'
      },
      {
        id: 'button-group',
        label: 'Button Group',
        category: 'Elements',
        content: `<div style="display: flex; gap: 10px; padding: 20px;">
                    <button style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Popular</button>
                    <button style="background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">New Releases</button>
                    <button style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Top Rated</button>
                  </div>`
      },

      /* ========== FOOTER ========== */
      {
        id: 'footer',
        label: 'Footer',
        category: 'Layout',
        content: `<footer style="background: #2c3e50; color: white; padding: 40px 20px; margin-top: 50px;">
                    <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px;">
                      <div style="flex: 1; min-width: 200px;">
                        <h3 style="color: #3498db;">MovieHub</h3>
                        <p>Your ultimate destination for movie reviews and trailers.</p>
                      </div>
                      <div style="flex: 1; min-width: 200px;">
                        <h4>Quick Links</h4>
                        <ul style="list-style: none; padding: 0;">
                          <li><a href="#" style="color: #bdc3c7; text-decoration: none;">Home</a></li>
                          <li><a href="#" style="color: #bdc3c7; text-decoration: none;">Movies</a></li>
                          <li><a href="#" style="color: #bdc3c7; text-decoration: none;">TV Shows</a></li>
                        </ul>
                      </div>
                      <div style="flex: 1; min-width: 200px;">
                        <h4>Connect</h4>
                        <p>Follow us on social media</p>
                      </div>
                    </div>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #34495e;">
                      <p>&copy; 2024 MovieHub. All rights reserved.</p>
                    </div>
                  </footer>`
      },

      /* ========== OMDb API MOVIES ========== */
      {
        id: 'omdb-avengers',
        label: 'Avengers',
        category: 'Movie Website',
        content: `<div class="movie-card omdb-movie" data-movie-id="tt4154796" style="background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:15px;margin:10px;max-width:300px;">
                    <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Loading" style="width:100%;border-radius:4px;">
                    <div class="movie-title" style="font-weight:bold;margin:10px 0;font-size:18px;">Loading Avengers...</div>
                    <div class="movie-info" style="color:#666;margin-bottom:10px;font-size:14px;">
                      <span class="movie-year">-</span> • 
                      <span class="movie-rating">-</span>
                    </div>
                    <div class="movie-description" style="color:#777;line-height:1.4;">Fetching from OMDb...</div>
                    <div class="movie-genre" style="margin-top:10px;font-size:12px;color:#999;"></div>
                  </div>`
      },
      {
        id: 'omdb-spiderman',
        label: 'Spider-Man',
        category: 'Movie Website',
        content: `<div class="movie-card omdb-movie" data-movie-id="tt10872600" style="background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:15px;margin:10px;max-width:300px;">
                    <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Loading" style="width:100%;border-radius:4px;">
                    <div class="movie-title" style="font-weight:bold;margin:10px 0;font-size:18px;">Loading Spider-Man...</div>
                    <div class="movie-info" style="color:#666;margin-bottom:10px;font-size:14px;">
                      <span class="movie-year">-</span> • 
                      <span class="movie-rating">-</span>
                    </div>
                    <div class="movie-description" style="color:#777;line-height:1.4;">Fetching from OMDb...</div>
                    <div class="movie-genre" style="margin-top:10px;font-size:12px;color:#999;"></div>
                  </div>`
      },
      {
        id: 'omdb-batman',
        label: 'Batman',
        category: 'Movie Website',
        content: `<div class="movie-card omdb-movie" data-movie-id="tt1877830" style="background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:15px;margin:10px;max-width:300px;">
                    <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Loading" style="width:100%;border-radius:4px;">
                    <div class="movie-title" style="font-weight:bold;margin:10px 0;font-size:18px;">Loading Batman...</div>
                    <div class="movie-info" style="color:#666;margin-bottom:10px;font-size:14px;">
                      <span class="movie-year">-</span> • 
                      <span class="movie-rating">-</span>
                    </div>
                    <div class="movie-description" style="color:#777;line-height:1.4;">Fetching from OMDb...</div>
                    <div class="movie-genre" style="margin-top:10px;font-size:12px;color:#999;"></div>
                  </div>`
      },
     { 
      id: 'netflix-hero', 
      label: 'Netflix Hero', 
      category: 'Movie Website',
      content: `<section class="netflix-hero-mobile" style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/387cfa57-7e18-4c16-8e8c-c8de233050e2/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg'); background-size: cover; background-position: center; color: white; padding: 80px 20px; text-align: center; min-height: 70vh; display: flex; align-items: center; justify-content: center;">
                  <div style="max-width: 800px;" class="mobile-padding">
                    <h1 style="font-size: 3.5rem; font-weight: 900; margin: 0 0 20px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Unlimited movies, TV shows and more</h1>
                    <p style="font-size: 1.5rem; margin: 0 0 30px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Watch anywhere. Cancel anytime.</p>
                    <div class="netflix-hero-buttons" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                      <button style="background: #e50914; color: white; border: none; padding: 12px 25px; font-size: 1.1rem; border-radius: 4px; cursor: pointer; font-weight: bold;" class="mobile-full-width">Get Started</button>
                      <button style="background: rgba(109, 109, 110, 0.7); color: white; border: none; padding: 12px 25px; font-size: 1.1rem; border-radius: 4px; cursor: pointer; font-weight: bold;" class="mobile-full-width">Learn More</button>
                    </div>
                  </div>
                </section>` 
    },

    /* ========== MOBILE-RESPONSIVE NETFLIX HEADER ========== */
    {
      id: 'netflix-header',
      label: 'Netflix Header',
      category: 'Movie Website',
      content: `<header class="netflix-header-mobile" style="background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%); padding: 15px 30px; position: absolute; top: 0; left: 0; right: 0; z-index: 1000; display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 20px;">
                    <img class="netflix-logo-mobile" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" style="height: 30px; filter: brightness(0) invert(1);">
                    <nav class="netflix-nav-mobile" style="display: flex; gap: 15px;">
                      <a href="#" style="color: white; text-decoration: none; font-size: 0.9rem;">Home</a>
                      <a href="#" style="color: white; text-decoration: none; font-size: 0.9rem;">TV Shows</a>
                    </nav>
                  </div>
                  <div style="display: flex; align-items: center; gap: 15px;">
                    <button style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">🔍</button>
                    <button style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">☰</button>
                  </div>
                </header>`
    },

    /* ========== MOBILE-RESPONSIVE MOVIE ROW ========== */
    {
      id: 'netflix-row',
      label: 'Movie Row',
      category: 'Movie Website',
      content: `<section class="netflix-row-mobile mobile-padding" style="padding: 30px 0; background: #141414;">
                  <h2 class="netflix-row-title" style="color: white; font-size: 1.5rem; margin: 0 0 15px 20px; font-weight: 600;">Popular on Netflix</h2>
                  <div style="display: flex; gap: 10px; overflow-x: auto; padding: 0 20px 10px 20px; scrollbar-width: none;">
                    <div class="movie-card-mobile" style="flex: 0 0 auto; width: 180px; transition: transform 0.3s ease;">
                      <img src="${PLACEHOLDER_SVG}" alt="Movie" style="width: 100%; border-radius: 4px; aspect-ratio: 2/3;">
                      <p style="color: white; margin: 8px 0 0 0; font-size: 0.85rem; text-align: center;">Movie Title</p>
                    </div>
                    <div class="movie-card-mobile" style="flex: 0 0 auto; width: 180px; transition: transform 0.3s ease;">
                      <img src="${PLACEHOLDER_SVG}" alt="Movie" style="width: 100%; border-radius: 4px; aspect-ratio: 2/3;">
                      <p style="color: white; margin: 8px 0 0 0; font-size: 0.85rem; text-align: center;">Movie Title</p>
                    </div>
                    <div class="movie-card-mobile" style="flex: 0 0 auto; width: 180px; transition: transform 0.3s ease;">
                      <img src="${PLACEHOLDER_SVG}" alt="Movie" style="width: 100%; border-radius: 4px; aspect-ratio: 2/3;">
                      <p style="color: white; margin: 8px 0 0 0; font-size: 0.85rem; text-align: center;">Movie Title</p>
                    </div>
                  </div>
                </section>`
    },

    /* ========== MOBILE-RESPONSIVE BILLBOARD ========== */
    {
      id: 'netflix-billboard',
      label: 'Netflix Billboard',
      category: 'Movie Website',
      content: `<section class="netflix-billboard-mobile mobile-padding" style="background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'); background-size: cover; background-position: center; color: white; padding: 100px 20px 50px 20px; min-height: 60vh; display: flex; align-items: flex-end;">
                  <div style="max-width: 100%;" class="mobile-text-center">
                    <h1 style="font-size: 2.5rem; font-weight: 900; margin: 0 0 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Stranger Things</h1>
                    <p style="font-size: 1rem; margin: 0 0 20px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); line-height: 1.4;">When a young boy vanishes, a small town uncovers a mystery involving secret experiments.</p>
                    <div class="billboard-buttons-mobile" style="display: flex; gap: 10px; justify-content: center;">
                      <button style="background: white; color: black; border: none; padding: 10px 20px; font-size: 1rem; border-radius: 4px; cursor: pointer; font-weight: bold;">
                        ▶️ Play
                      </button>
                      <button style="background: rgba(109, 109, 110, 0.7); color: white; border: none; padding: 10px 20px; font-size: 1rem; border-radius: 4px; cursor: pointer; font-weight: bold;">
                        ⓘ More Info
                      </button>
                    </div>
                  </div>
                </section>`
    },

    /* ========== MOBILE-RESPONSIVE GRID LAYOUT ========== */
    {
      id: 'netflix-grid',
      label: 'Movie Grid',
      category: 'Movie Website',
      content: `<section class="mobile-padding" style="padding: 30px 0; background: #141414;">
                  <h2 class="mobile-text-center" style="color: white; font-size: 1.5rem; margin: 0 0 20px 0; font-weight: 600;">Trending Now</h2>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; padding: 0 15px;">
                    <div class="netflix-card omdb-movie" data-movie-id="tt4154796" style="background: #181818; border-radius: 8px; overflow: hidden; transition: transform 0.3s ease;">
                      <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Loading" style="width: 100%; aspect-ratio: 2/3;">
                      <div style="padding: 10px;">
                        <div class="movie-title" style="color: white; font-weight: bold; margin: 0 0 5px 0; font-size: 0.9rem;">Loading...</div>
                        <div class="movie-year" style="color: #a3a3a3; font-size: 0.8rem;">-</div>
                      </div>
                    </div>
                    <div class="netflix-card omdb-movie" data-movie-id="tt10872600" style="background: #181818; border-radius: 8px; overflow: hidden; transition: transform 0.3s ease;">
                      <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Loading" style="width: 100%; aspect-ratio: 2/3;">
                      <div style="padding: 10px;">
                        <div class="movie-title" style="color: white; font-weight: bold; margin: 0 0 5px 0; font-size: 0.9rem;">Loading...</div>
                        <div class="movie-year" style="color: #a3a3a3; font-size: 0.8rem;">-</div>
                      </div>
                    </div>
                  </div>
                </section>`
    },

    /* ========== MOBILE-RESPONSIVE FOOTER ========== */
    {
      id: 'netflix-footer',
      label: 'Netflix Footer',
      category: 'Movie Website',
      content: `<footer class="netflix-footer-mobile" style="background: #141414; color: #808080; padding: 40px 20px; margin-top: 30px;">
                  <div style="max-width: 1000px; margin: 0 auto;">
                    <div class="footer-grid-mobile" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 25px;">
                      <div>
                        <h4 style="color: #808080; margin-bottom: 12px; font-size: 0.9rem;">Audio & Subtitles</h4>
                        <ul style="list-style: none; padding: 0;">
                          <li><a href="#" style="color: #808080; text-decoration: none; font-size: 0.8rem;">Audio Description</a></li>
                          <li><a href="#" style="color: #808080; text-decoration: none; font-size: 0.8rem;">Help Center</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 style="color: #808080; margin-bottom: 12px; font-size: 0.9rem;">Media Center</h4>
                        <ul style="list-style: none; padding: 0;">
                          <li><a href="#" style="color: #808080; text-decoration: none; font-size: 0.8rem;">Investor Relations</a></li>
                          <li><a href="#" style="color: #808080; text-decoration: none; font-size: 0.8rem;">Jobs</a></li>
                        </ul>
                      </div>
                    </div>
                    <div style="border-top: 1px solid #333; padding-top: 15px; text-align: center;">
                      <p style="margin: 0; font-size: 0.8rem;">&copy; 2024 Netflix Clone. For educational purposes.</p>
                    </div>
                  </div>
                </footer>`
    },

    /* ========== KEEP YOUR EXISTING COMPONENTS ========== */
    { 
      id: 'movie-header', 
      label: 'Simple Header', 
      category: 'Basic', 
      content: '<h1 style="text-align:center;color:#333;padding:20px;margin:0;">My Movie Site</h1>' 
    },
    { 
      id: 'movie-trailer',
      label: 'Trailer',
      category: 'Movie Website',
      content: '<div style="text-align:center;padding:20px;"><iframe class="movie-trailer" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;max-width:560px;height:315px;border-radius:8px;"></iframe></div>' 
    }
    ]
  },

  styleManager: {
    sectors: [
      { 
        name: 'General', 
        open: false, 
        buildProps: ['float', 'display', 'position', 'top', 'left'] 
      },
      { 
        name: 'Dimension', 
        open: false, 
        buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'] 
      },
      { 
        name: 'Typography', 
        open: false, 
        buildProps: ['font-family', 'font-size', 'font-weight', 'color', 'line-height', 'text-align'] 
      },
      { 
        name: 'Decorations', 
        open: false, 
        buildProps: ['background-color', 'border', 'border-radius', 'box-shadow'] 
      }
    ]
  },

  deviceManager: {
    devices: [
      { name: 'Desktop', width: '' },
      { name: 'Tablet', width: '768px', widthMedia: '768px' },
      { name: 'Mobile', width: '320px', widthMedia: '320px' }
    ]
  }
});

/* ---------- HELPER FUNCTIONS ---------- */
function updateMovieWithData(el, movieData) {
  // Update poster
  if (movieData.Poster && movieData.Poster !== 'N/A') {
    el.querySelector('.movie-poster').src = movieData.Poster;
    el.querySelector('.movie-poster').alt = movieData.Title;
  }
  
  // Update title
  el.querySelector('.movie-title').textContent = movieData.Title || 'No Title';
  
  // Update info
  el.querySelector('.movie-year').textContent = movieData.Year || 'N/A';
  if (movieData.imdbRating && movieData.imdbRating !== 'N/A') {
    el.querySelector('.movie-rating').textContent = `${movieData.imdbRating}/10`;
  } else {
    el.querySelector('.movie-rating').textContent = 'No Rating';
  }
  
  // Update plot
  if (movieData.Plot && movieData.Plot !== 'N/A') {
    el.querySelector('.movie-description').textContent = 
      movieData.Plot.substring(0, 120) + (movieData.Plot.length > 120 ? '...' : '');
  } else {
    el.querySelector('.movie-description').textContent = 'No description available.';
  }
  
  // Update genre
  if (movieData.Genre && movieData.Genre !== 'N/A') {
    el.querySelector('.movie-genre').textContent = movieData.Genre;
  }
}

function showError(el, message) {
  el.querySelector('.movie-title').textContent = 'Movie Not Found';
  el.querySelector('.movie-description').textContent = message;
}

function showDemoData(el, movieId) {
  const demoMovies = {
    'tt4154796': {
      title: 'Avengers: Endgame',
      year: '2019',
      plot: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
      rating: '8.4/10',
      genre: 'Action, Adventure, Drama'
    },
    'tt10872600': {
      title: 'Spider-Man: No Way Home',
      year: '2021', 
      plot: 'With Spider-Man identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
      rating: '8.2/10',
      genre: 'Action, Adventure, Fantasy'
    },
    'tt1877830': {
      title: 'The Batman',
      year: '2022',
      plot: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city hidden corruption.',
      rating: '7.8/10',
      genre: 'Action, Crime, Drama'
    }
  };
  
  const demo = demoMovies[movieId] || {
    title: 'Demo Movie',
    year: '2023',
    plot: 'This is demo data. The API request failed. Check your console for errors.',
    rating: '7.0/10',
    genre: 'Demo'
  };
  
  el.querySelector('.movie-title').textContent = demo.title;
  el.querySelector('.movie-year').textContent = demo.year;
  el.querySelector('.movie-rating').textContent = demo.rating;
  el.querySelector('.movie-description').textContent = demo.plot;
  el.querySelector('.movie-genre').textContent = demo.genre;
}

/* ---------- ADD MOVIE FUNCTION ---------- */
function addCustomMovieFromModal() {
  const movieId = document.getElementById('movieSearchInput').value.trim();
  
  if (!movieId) {
    alert('Please enter an IMDb ID');
    return;
  }
  
  if (!movieId.startsWith('tt')) {
    alert('IMDb ID should start with "tt" (e.g., tt4154796)');
    return;
  }
  
  const existingBlock = editor.BlockManager.get(`movie-${movieId}`);
  if (existingBlock) {
    alert('This movie block already exists!');
    return;
  }
  
  const newMovieBlock = {
    id: `movie-${movieId}`,
    label: `Movie: ${movieId}`,
    category: 'Movie API',
    content: `<div class="movie-card omdb-movie" data-movie-id="${movieId}" style="background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:15px;margin:10px;max-width:300px;">
                <img class="movie-poster" src="${PLACEHOLDER_SVG}" alt="Loading" style="width:100%;border-radius:4px;">
                <div class="movie-title" style="font-weight:bold;margin:10px 0;font-size:18px;">Loading Movie...</div>
                <div class="movie-info" style="color:#666;margin-bottom:10px;font-size:14px;">
                  <span class="movie-year">-</span> • 
                  <span class="movie-rating">-</span>
                </div>
                <div class="movie-description" style="color:#777;line-height:1.4;">Fetching data for ${movieId}...</div>
                <div class="movie-genre" style="margin-top:10px;font-size:12px;color:#999;"></div>
              </div>`
  };
  
  editor.BlockManager.add(newMovieBlock.id, newMovieBlock);
  closeMovieSearch();
  showNotification(` Movie block added! Drag it from the "Movie API" category.`);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 70px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 10003;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/* ---------- MODAL FUNCTIONS ---------- */
function showMovieSearch() {
  const modal = document.getElementById('movieSearchModal');
  modal.style.display = 'flex';
  
  setTimeout(() => {
    document.getElementById('movieSearchInput').focus();
  }, 100);
}

function closeMovieSearch() {
  const modal = document.getElementById('movieSearchModal');
  modal.style.display = 'none';
}

function useExample(imdbId) {
  document.getElementById('movieSearchInput').value = imdbId;
}

/* ---------- OTHER FUNCTIONS ---------- */
function showPreview() {
  const html = editor.getHtml();
  const css = editor.getCss();
  
  const previewWindow = window.open('', '_blank');
  previewWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Preview - Movie Site</title>
      <style>${css}</style>
    </head>
    <body style="margin:0; padding:20px; font-family:Arial, sans-serif;">
      ${html}
    </body>
    </html>
  `);
  previewWindow.document.close();
}

function exportHTML() {
  const html = editor.getHtml();
  const css = editor.getCss();
  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Movie Site</title>
  <style>${css}</style>
</head>
<body>${html}</body>
</html>`;
  
  const blob = new Blob([fullHtml], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'movie-site.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ---------- EVENT LISTENERS ---------- */
document.addEventListener('click', function(event) {
  const modal = document.getElementById('movieSearchModal');
  if (event.target === modal) {
    closeMovieSearch();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeMovieSearch();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('movieSearchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addCustomMovieFromModal();
      }
    });
  }
});

// Add CSS animations
if (!document.querySelector('#notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}