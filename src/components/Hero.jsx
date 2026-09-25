import BrandStory from "./BrandStory.jsx";

export default function Hero() {
  return (
    <section
      className={"brand-section"}
      id={"home"}
      aria-labelledby={"hero-title"}
    >
      <div className={"hero"}>
        <figure className={"hero-photo"}>
          <img
            src={"assets/dakgalbi.webp"}
            alt={"철판 닭갈비 AI 연출 이미지. 실제 메뉴 사진이 아닙니다."}
            width={"1536"}
            height={"1024"}
            fetchPriority={"high"}
          />
          <figcaption>
            {"AI 연출 이미지 · 실제 메뉴 사진이 아닙니다"}
          </figcaption>
        </figure>
        <div className={"hero-copy"}>
          <p className={"eyebrow"}>{"이둥이네 닭갈비 · SINCE 2015"}</p>
          <h1 id={"hero-title"}>
            {"지글지글, 한 판."}
            <br />
            <strong>{"함께라서 맛있는 시간."}</strong>
          </h1>
          <p className={"hero-description"}>
            {"한대앞에서 시작해 새솔동으로."}
            <br />
            {"함께 둘러앉아 즐기는 철판 닭갈비,"}
            <br className={"mobile-only"} />
            {" 이둥이네입니다."}
          </p>
          <div className={"hero-actions"}>
            <a className={"button primary"} href={"#menu"}>
              {"메뉴 둘러보기 "}
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
            <a className={"hero-story-link"} href={"#story"}>
              {"우리의 이야기"}
            </a>
          </div>
          <p className={"hero-brand-note"}>
            {"쌍둥이닭갈비에서 이어가는 새로운 이름"}
          </p>
        </div>
      </div>
      <div className={"hero-paths"}>
        <a href={"#visit"}>
          <span>{"VISIT"}</span>
          <strong>{"새솔동 매장 안내"}</strong>
          <b aria-hidden={"true"}>{"↗"}</b>
        </a>
        <a href={"franchise.html"}>
          <span>{"PARTNERSHIP"}</span>
          <strong>{"가맹 안내"}</strong>
          <b aria-hidden={"true"}>{"↗"}</b>
        </a>
        <a href={"meal-kit.html"}>
          <span>{"AT HOME"}</span>
          <strong>
            {"밀키트 "}
            <small>{"판매 준비 중"}</small>
          </strong>
          <b aria-hidden={"true"}>{"↗"}</b>
        </a>
      </div>

      <BrandStory />
    </section>
  );
}
