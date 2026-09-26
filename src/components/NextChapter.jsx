export default function NextChapter() {
  return (
    <section
      className={"brand-next section-wrap"}
      aria-labelledby={"next-title"}
    >
      <div className={"next-intro"}>
        <p className={"eyebrow"}>{"THE NEXT CHAPTER"}</p>
        <h2 id={"next-title"}>{"매장에서, 그리고 그 너머로."}</h2>
      </div>
      <a className={"next-card franchise-card"} href={"franchise.html"}>
        <span className={"tiny-label"}>{"PARTNERSHIP · 준비 중"}</span>
        <h3>
          {"이둥이네를 함께"}
          <br />
          {"이어갈 파트너."}
        </h3>
        <p>{"가맹 안내와 상담 창구를 준비합니다."}</p>
        <span className={"next-link"}>{"가맹 안내 보기 ↗"}</span>
      </a>
      <a className={"next-card kit-card"} href={"meal-kit.html"}>
        <span className={"tiny-label"}>{"AT HOME · 출시 예정"}</span>
        <h3>
          {"우리 집에서도,"}
          <br />
          {"이둥이네."}
        </h3>
        <p>{"밀키트 판매 페이지를 준비합니다."}</p>
        <span className={"next-link"}>{"밀키트 준비 소식 ↗"}</span>
      </a>
    </section>
  );
}
