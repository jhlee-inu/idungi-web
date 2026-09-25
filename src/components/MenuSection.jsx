import { useRef, useState } from "react";
import MenuDialog from "./MenuDialog.jsx";
import MenuImage from "./MenuImage.jsx";
import MenuCatalog from "./MenuCatalog.jsx";
import GuestStory from "./GuestStory.jsx";

const filters = [
  ["all", "대표 메뉴"],
  ["dakgalbi", "닭갈비"],
  ["side", "마무리 볶음밥"],
];

export default function MenuSection({ content }) {
  const [filter, setFilter] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const triggerRef = useRef(null);
  const dakgalbi = content.menus.filter((menu) => menu.category === "dakgalbi");
  const rice = content.menus.find((menu) => menu.id === "rice");
  const count =
    filter === "all"
      ? dakgalbi.length + Number(Boolean(rice))
      : filter === "side"
        ? Number(Boolean(rice))
        : dakgalbi.length;
  function selectMenu(menu, event) {
    triggerRef.current = event.currentTarget;
    setSelectedMenu(menu);
  }
  return (
    <section
      className="menu-section section-wrap"
      id="menu"
      aria-labelledby="menu-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">OUR SIGNATURE</p>
          <h2 id="menu-title">오늘은 어떤 닭갈비?</h2>
        </div>
        <p className="heading-aside">
          취향대로 골라보세요.
          <br />
          메뉴를 누르면 자세히 볼 수 있어요.
        </p>
      </div>
      <div className="menu-tools">
        <div className="filters" role="group" aria-label="메뉴 종류 선택">
          {filters.map(([value, label]) => (
            <button
              key={value}
              className={`filter${filter === value ? " active" : ""}`}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="menu-small-note">사진은 AI 연출 이미지입니다.</span>
      </div>
      <div className="signature-layout" hidden={filter === "side"}>
        <figure className="signature-photo">
          <img
            src="assets/dakgalbi.webp"
            width="1536"
            height="1024"
            loading="lazy"
            alt="철판 닭갈비를 표현한 공통 AI 연출 이미지"
          />
          <figcaption>
            닭갈비 공통 AI 연출 이미지 · 실제 메뉴 사진이 아닙니다
          </figcaption>
        </figure>
        <div className="menu-grid">
          {dakgalbi.map((menu) => (
            <button
              key={menu.id}
              type="button"
              className="menu-card"
              aria-label={`${menu.name} 자세히 보기`}
              onClick={(event) => selectMenu(menu, event)}
            >
              <div className="card-content">
                <span className="signature-label">{menu.label}</span>
                <div className="card-title-line">
                  <h3>{menu.name}</h3>
                  <span className="card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <p className="card-description">{menu.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {rice && (
        <div className="rice-feature" hidden={filter === "dakgalbi"}>
          <div className="rice-photo">
            <MenuImage menu={rice} />
            <span>AI 연출 이미지 · 실제 메뉴 사진이 아닙니다</span>
          </div>
          <div className="rice-copy">
            <p className="eyebrow">THE FINISH</p>
            <h3>마지막 한 숟갈까지, 볶음밥.</h3>
            <p>닭갈비를 즐긴 뒤, 철판 위에 남은 맛으로 마무리하는 한 끼.</p>
            <button
              type="button"
              className="text-link rice-detail"
              onClick={(event) => selectMenu(rice, event)}
            >
              볶음밥 자세히 보기 ↗
            </button>
          </div>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {filter === "all"
          ? "전체"
          : filter === "dakgalbi"
            ? "닭갈비"
            : "곁들임"}{" "}
        메뉴 {count}개를 표시합니다.
      </p>
      <MenuCatalog content={content} />
      <GuestStory />
      <div className="menu-footnote">
        <span className="spark" aria-hidden="true">
          ✳
        </span>
        <p>
          맛있는 한 끼를 함께할 준비.
          <br />
          <strong>매장 정보도 미리 확인해 보세요.</strong>
        </p>
        <a href="#visit" className="text-link">
          매장 안내 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <MenuDialog
        menu={selectedMenu}
        onClose={() => setSelectedMenu(null)}
        triggerRef={triggerRef}
      />
    </section>
  );
}
