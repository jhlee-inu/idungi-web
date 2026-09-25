export default function PreparationPage({ config }) {
  const { story, preparation } = config;
  return (
    <main id="main">
      <section className="sub-hero section-wrap">
        <a href="index.html" className="sub-back">← 이둥이네 홈</a>
        <p className="eyebrow">{config.eyebrow}</p>
        <h1>{config.title[0]}<br /><em>{config.title[1]}</em></h1>
        <p className="sub-description">{config.description}</p>
        <span className="status-chip">{config.status}</span>
        <div className="sub-hero-links">
          <a className="text-link" href="index.html#menu">매장 메뉴 ↗</a>
          <a className="text-link" href="index.html#visit">매장 안내 ↗</a>
        </div>
      </section>
      <section className={`sub-band${story.image ? " kit-band" : ""}`}>
        <div className="section-wrap sub-story">
          {story.image ? (
            <figure className="kit-photo">
              <img src={story.image.src} width={story.image.width} height={story.image.height} alt={story.image.alt} />
              <figcaption>{story.image.caption}</figcaption>
            </figure>
          ) : (
            <div>
              <span className="tiny-label">{story.eyebrow}</span>
              <h2>{story.title[0]}<br />{story.title[1]}</h2>
            </div>
          )}
          <div>
            {story.image && (
              <>
                <span className="tiny-label">{story.eyebrow}</span>
                <h2>{story.title[0]}<br />{story.title[1]}</h2>
              </>
            )}
            {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {story.link && <a className="text-link" href={story.link.href}>{story.link.label}</a>}
          </div>
        </div>
      </section>
      <section className="section-wrap preparation">
        <p className="eyebrow">{preparation.eyebrow}</p>
        <h2>{preparation.title[0]}<br />{preparation.title[1]}</h2>
        <div className="preparation-grid">
          {preparation.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.status}</strong>
            </article>
          ))}
        </div>
        <details className="visit-faq">
          <summary>{preparation.question}<span aria-hidden="true">+</span></summary>
          <p>{preparation.answer}</p>
        </details>
        <a className="button primary" href={preparation.cta.href}>
          {preparation.cta.label} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
