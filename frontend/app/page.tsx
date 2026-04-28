import Image from "next/image";
import { API_BASE, getContent } from "@/lib/api";
import ScrollReveal from "@/components/ScrollReveal";
import InteractiveImage from "@/components/InteractiveImage";

export default async function HomePage() {
  const data = await getContent();
  const showcase = data.gallery.slice(0, 3);

  return (
    <main className="site-main">
      <section className="hero section">
        <div className="container hero-grid">
          <ScrollReveal className="hero-copy">
            <p className="eyebrow">{data.hero.badge || "Cyber Skills Lab"}</p>
            <h1>{data.hero.title}</h1>
            <p className="hero-text">{data.hero.subtitle}</p>
            <div className="hero-actions">
              <a href={data.hero.ctaHref} className="btn btn-primary">
                {data.hero.ctaText}
              </a>
              <a href="#contact" className="btn btn-outline">
                Talk to Team
              </a>
            </div>
            <p className="hero-phone">Call: {data.hero.phone}</p>
          </ScrollReveal>

          <ScrollReveal className="hero-panel" delay={120}>
            <div className="scanline" />
            <h3>Training Control Hub</h3>
            <p>Live mentorship, project-based training, and placement-focused curriculum for IT and programming students.</p>
            <div className="stats-grid">
              <div className="stat-card">
                <strong>{data.courses.length}+</strong>
                <span>Active Tracks</span>
              </div>
              <div className="stat-card">
                <strong>24/7</strong>
                <span>Lab Access</span>
              </div>
              <div className="stat-card">
                <strong>Hands-On</strong>
                <span>Learning</span>
              </div>
              <div className="stat-card">
                <strong>Career</strong>
                <span>Focused</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-highlight-grid" id="about">
          <ScrollReveal className="about-shell">
            <h2>{data.about.title}</h2>
            <p>{data.about.description}</p>
            <p className="muted">{data.about.location}</p>
          </ScrollReveal>
          <ScrollReveal className="highlight-shell" delay={120}>
            <h2>Netsoft Computer Education Academy</h2>
            <p className="highlight-lead">A trusted institute in Chitradurga for quality computer education and distance learning.</p>
            <p>Committed to shaping every student&apos;s future through quality training and guidance.</p>
            <p>Let us support your learning journey and success ahead.</p>
            <p className="highlight-signoff">
              Warm regards, <strong>Mufassir</strong> | <strong>9916574927</strong>
            </p>
            <p className="muted">Chitradurga, 1st Floor beside Neelankeshwara Temple, CTA - 577501</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="courses">
        <div className="container">
          <div className="section-head">
            <h2>Our Courses</h2>
            <p>Industry-ready training tracks built with practical learning and real project guidance.</p>
          </div>
          <div className="course-grid">
          {data.courses.map((course, index) => (
            <ScrollReveal key={course.id} delay={(index % 6) * 70}>
              <article className="tile">
              <small>{course.category}</small>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
            </ScrollReveal>
          ))}
          </div>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="container">
          <div className="section-head">
            <h2>Campus Moments</h2>
            <p>Click any image to focus and preview it in a larger view.</p>
          </div>
          <div className="gallery-grid">
          {data.gallery.map((item, index) => (
            <ScrollReveal key={item.id} delay={(index % 8) * 60}>
              <div className="gallery-card">
              <InteractiveImage
                src={item.image_url.startsWith("http") ? item.image_url : `${API_BASE}${item.image_url}`}
                alt={item.title}
                width={480}
                height={320}
                className="gallery-image"
              />
              <p>{item.title}</p>
            </div>
            </ScrollReveal>
          ))}
          </div>
        </div>
      </section>

      {showcase.length > 0 && (
        <section className="section">
          <div className="container image-strip">
            {showcase.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 100}>
                <InteractiveImage
                  src={item.image_url.startsWith("http") ? item.image_url : `${API_BASE}${item.image_url}`}
                  alt={item.title}
                  width={420}
                  height={280}
                  className="strip-image"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <section className="section" id="contact">
        <ScrollReveal className="container contact-shell">
          <h2>{data.contact.title}</h2>
          <p>{data.contact.address}</p>
          <p className="contact-line">
            <strong>{data.contact.phone}</strong> | {data.contact.email}
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
