export default function BrandStory() {
  return (
    <div className={"story-strip"} id={"story"}>
      <div className={"story-intro"}>
        <span className={"tiny-label"}>{"OUR STORY · SINCE 2015"}</span>
        <h2>
          {"한대앞에서 시작해,"}
          <br />
          {"새솔동으로 이어온 맛."}
        </h2>
      </div>
      <div className={"story-copy"}>
        <p>
          <strong>{"한대앞에서 시작한 쌍둥이닭갈비."}</strong>
          <br />
          {"새솔동으로 자리를 옮겨 지금도 손님을 맞이하고 있습니다."}
        </p>
        <p className={"muted"}>
          {"그 이야기를 이어갈 새로운 이름,"}
          <br />
          <strong>{"이둥이네 닭갈비"}</strong>
          {"를 준비합니다."}
        </p>
      </div>
      <div className={"story-signature"}>
        <span
          className={"story-lockup"}
          role={"img"}
          aria-label={"철판 위 두 마리 닭, 이둥이네 닭갈비 · since 2015"}
        >
          <span className={"brand-lockup"} aria-hidden={"true"}>
            <span className={"logo-symbol"}></span>
            <span className={"logo-wordmark"}></span>
          </span>
        </span>
        <span>{"SINCE 2015 · 이둥이네 닭갈비"}</span>
      </div>
    </div>
  );
}
