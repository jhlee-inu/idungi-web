export default function FranchisePage() {
  return (
    <main id={"main"}>
      <section className={"sub-hero section-wrap"}>
        <a href={"index.html"} className={"sub-back"}>
          {"← 이둥이네 홈"}
        </a>
        <p className={"eyebrow"}>{"THE NEXT CHAPTER"}</p>
        <h1>
          {"함께 이어갈"}
          <br />
          <em>{"이둥이네."}</em>
        </h1>
        <p className={"sub-description"}>
          {
            "한대앞에서 시작해 새솔동으로 이어온 이야기. 다음 이야기를 함께할 파트너를 위한 공간을 준비합니다."
          }
        </p>
        <span className={"status-chip"}>
          {"가맹 안내 준비 중 · 현재 상담 접수 전"}
        </span>
      </section>
      <section className={"sub-band"}>
        <div className={"section-wrap sub-story"}>
          <div>
            <span className={"tiny-label"}>{"OUR BEGINNING"}</span>
            <h2>
              {"한대앞의 시작."}
              <br />
              {"새솔동에서 이어가는 오늘."}
            </h2>
          </div>
          <div>
            <p>
              {"쌍둥이닭갈비는 한대앞에서 시작했습니다."}
              <br />
              {"새솔동으로 매장을 옮긴 뒤에도 운영을 이어가고 있습니다."}
            </p>
            <p>
              {"이둥이네 닭갈비라는 새로운 이름으로,"}
              <br />
              {"앞으로 함께할 파트너를 위한 가맹 안내를 준비합니다."}
            </p>
            <a className={"text-link"} href={"index.html#menu"}>
              {"메뉴와 매장 알아보기 ↗"}
            </a>
          </div>
        </div>
      </section>
      <section className={"section-wrap preparation"}>
        <p className={"eyebrow"}>{"PARTNERSHIP"}</p>
        <h2>
          {"함께하기 위한 정보를"}
          <br />
          {"차근차근 준비하고 있습니다."}
        </h2>
        <div className={"preparation-grid"}>
          <article>
            <span>{"01"}</span>
            <h3>{"가맹 조건"}</h3>
            <p>{"모집 지역·매장 기준·계약 조건"}</p>
            <strong>{"[확정 후 안내]"}</strong>
          </article>
          <article>
            <span>{"02"}</span>
            <h3>{"창업 비용과 지원"}</h3>
            <p>{"비용 항목·교육·운영 지원 범위"}</p>
            <strong>{"[확정 후 안내]"}</strong>
          </article>
          <article>
            <span>{"03"}</span>
            <h3>{"상담 창구"}</h3>
            <p>{"가맹 전용 연락처와 상담 접수"}</p>
            <strong>{"[연락처 등록 예정]"}</strong>
          </article>
        </div>
        <details className={"visit-faq"}>
          <summary>
            {"지금 가맹 상담을 신청할 수 있나요?"}
            <span aria-hidden={"true"}>{"+"}</span>
          </summary>
          <p>
            {
              "아직 상담 접수를 시작하지 않았습니다. 가맹 안내와 문의 창구가 준비되면 이 페이지에서 안내할 예정입니다. 현재 신청서를 받거나 연락처를 수집하지 않습니다."
            }
          </p>
        </details>
        <a className={"button primary"} href={"index.html#story"}>
          {"브랜드 이야기 보기 "}
          <span>{"↗"}</span>
        </a>
      </section>
    </main>
  );
}
