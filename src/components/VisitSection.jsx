import { useEffect, useRef, useState } from "react";
import KakaoMap from "./KakaoMap.jsx";

function StoreIcon({ type }) {
  const paths = {
    address: (
      <>
        <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z" />
    ),
    hours: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    parking: (
      <path d="M5 17V9l2-5h10l2 5v8M5 10h14M4 17h16M7 17v3M17 17v3M7 13h2M15 13h2" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

const fields = [
  ["address", "매장 위치", "[상세 주소 확인 후 입력]"],
  ["phone", "연락처", "[매장 전화번호 확인 후 입력]"],
  ["hours", "영업시간", "[영업시간·휴무일 확인 후 입력]"],
  ["parking", "주차 안내", "[주차 가능 여부 확인 후 입력]"],
];

export default function VisitSection({ content }) {
  const [message, setMessage] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const phoneValid =
    typeof content.phone === "string" &&
    /^[\d+\s()-]{7,22}$/.test(content.phone);
  async function copyAddress() {
    let nextMessage;
    try {
      await navigator.clipboard.writeText(content.address);
      nextMessage = "매장 주소를 복사했어요.";
    } catch {
      nextMessage = "복사가 지원되지 않아 주소를 직접 선택해 주세요.";
    }
    clearTimeout(timer.current);
    setMessage(nextMessage);
    timer.current = setTimeout(() => setMessage(""), 3500);
  }
  return (
    <section className="visit-section" id="visit" aria-labelledby="visit-title">
      <div className="section-wrap visit-inner">
        <div className="visit-heading">
          <p className="eyebrow">OUR PLACE</p>
          <h2 id="visit-title">
            맛있는 시간이
            <br />
            쌓이는 곳.
          </h2>
          <p>
            {content.area}
            <br />
            <span>쌍둥이닭갈비의 새로운 이름, 이둥이네 닭갈비</span>
          </p>
        </div>
        <figure className="store-photo">
          <img
            src="assets/store-interior.jpg"
            width="2048"
            height="1536"
            loading="lazy"
            alt="따뜻한 조명과 나무 테이블이 있는 매장에서 손님들이 닭갈비를 즐기는 모습"
          />
          <figcaption>
            <strong>함께 둘러앉는, 우리의 매장.</strong>
            <span>쌍둥이닭갈비 매장 내부</span>
          </figcaption>
        </figure>
        <div className="visit-grid">
          <KakaoMap content={content} />
          <div className="store-details">
            <div className="store-title">
              <h3>{content.brand}</h3>
              <span>SINCE {content.since}</span>
            </div>
            {content.storeInfoSource && (
              <p className="store-source">{content.storeInfoSource}</p>
            )}
            <dl>
              {fields.map(([field, label, placeholder]) => {
                const value =
                  typeof content[field] === "string" && content[field].trim()
                    ? content[field]
                    : "";
                return (
                  <div key={field}>
                    <dt>
                      <StoreIcon type={field} />
                      {label}
                    </dt>
                    <dd>
                      {field === "address" && <span>{content.area}</span>}
                      <span
                        id={`${field}-value`}
                        className={value ? undefined : "pending"}
                      >
                        {value || placeholder}
                      </span>
                      {field === "address" && value && (
                        <button
                          type="button"
                          className="copy-address"
                          onClick={copyAddress}
                        >
                          주소 복사
                        </button>
                      )}
                      {field === "phone" && phoneValid && (
                        <a
                          className="call-link"
                          href={"tel:" + content.phone.replace(/[^+\d]/g, "")}
                        >
                          매장에 전화하기 ↗
                        </a>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <details className="visit-faq">
              <summary>
                방문 전에 확인해 주세요 <span aria-hidden="true">+</span>
              </summary>
              <p>
                메뉴와 가격은 제공해 주신 메뉴판, 주소·영업시간·주차는 2026년
                7월 25일 블로그 후기를 참고했습니다. 최신 정보는 매장 확인
                전이며, 전화번호는 매장 확인 후 연결하며, 지도는 카카오맵의 기존
                매장 위치를 표시합니다.
              </p>
              <p>
                후기에는 넓은 테이블 간격과 가족 외식·단체 모임에 대한 평가가
                소개되어 있습니다. 단체 예약 조건, 주말 브레이크타임, 평일
                라스트오더와 주차 요금은 별도 확인 예정입니다.
              </p>
            </details>
          </div>
        </div>
      </div>
      <div className="toast" role="status" hidden={!message}>
        {message}
      </div>
    </section>
  );
}
