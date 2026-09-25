export default function MealKitPage() {
  return (
    <main id={"main"}>
      <section className={"sub-hero section-wrap"}>
        <a href={"index.html"} className={"sub-back"}>
          {"← 이둥이네 홈"}
        </a>
        <p className={"eyebrow"}>{"COMING TO YOUR HOME"}</p>
        <h1>
          {"우리 집에서도,"}
          <br />
          <em>{"이둥이네."}</em>
        </h1>
        <p className={"sub-description"}>
          {
            "매장에서 즐기던 닭갈비를 집에서도. 이둥이네 밀키트의 다음 소식을 이곳에서 전할 예정입니다."
          }
        </p>
        <span className={"status-chip"}>{"판매 준비 중 · 출시 일정 미정"}</span>
      </section>
      <section className={"sub-band kit-band"}>
        <div className={"section-wrap sub-story"}>
          <div className={"kit-photo"}>
            <img
              src={"assets/dakgalbi.webp"}
              width={"1536"}
              height={"1024"}
              alt={"닭갈비 AI 연출 이미지, 실제 밀키트 구성 아님"}
            />
            <span>{"AI 연출 이미지 · 실제 밀키트 구성이 아닙니다"}</span>
          </div>
          <div>
            <span className={"tiny-label"}>{"AT YOUR TABLE"}</span>
            <h2>
              {"집에서도 펼쳐질"}
              <br />
              {"맛있는 한 판."}
            </h2>
            <p>
              {"이둥이네 닭갈비를 집에서도 즐길 수 있도록"}
              <br />
              {"밀키트 판매 페이지를 준비할 계획입니다."}
            </p>
            <p>
              {"상품 구성과 판매 일정이 정해지면"}
              <br />
              {"이곳에서 자세히 소개하겠습니다."}
            </p>
          </div>
        </div>
      </section>
      <section className={"section-wrap preparation"}>
        <p className={"eyebrow"}>{"COMING LATER"}</p>
        <h2>
          {"판매를 시작하기 전에,"}
          <br />
          {"꼭 필요한 정보를 준비할게요."}
        </h2>
        <div className={"preparation-grid"}>
          <article>
            <span>{"01"}</span>
            <h3>{"상품 안내"}</h3>
            <p>{"구성·중량·가격·원재료·보관 방법"}</p>
            <strong>{"[상품 확정 후 안내]"}</strong>
          </article>
          <article>
            <span>{"02"}</span>
            <h3>{"배송 안내"}</h3>
            <p>{"배송 지역·배송비·출고 일정"}</p>
            <strong>{"[배송 정책 준비 중]"}</strong>
          </article>
          <article>
            <span>{"03"}</span>
            <h3>{"구매와 고객 문의"}</h3>
            <p>{"주문·결제·문의·교환 및 반품 안내"}</p>
            <strong>{"[판매 시작 후 연결]"}</strong>
          </article>
        </div>
        <details className={"visit-faq"}>
          <summary>
            {"지금 주문하거나 예약 구매할 수 있나요?"}
            <span aria-hidden={"true"}>{"+"}</span>
          </summary>
          <p>
            {
              "아직 판매·예약 주문을 받지 않습니다. 출시일, 상품 구성과 가격은 미정이며, 판매가 준비되면 구매 경로를 안내하겠습니다."
            }
          </p>
        </details>
        <a href={"index.html#menu"} className={"button primary"}>
          {"매장 메뉴 먼저 보기 "}
          <span>{"↗"}</span>
        </a>
      </section>
    </main>
  );
}
