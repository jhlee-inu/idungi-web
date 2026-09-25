import { useEffect, useRef } from "react";
import MenuImage from "./MenuImage.jsx";

export default function MenuDialog({ menu, onClose, triggerRef }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    if (!menu) return;
    const element = dialog.current;
    const trigger = triggerRef.current;
    element.showModal();
    document.body.classList.add("dialog-open");
    closeButton.current?.focus();
    return () => {
      element.close();
      document.body.classList.remove("dialog-open");
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [menu, triggerRef]);
  if (!menu) return null;
  const price =
    typeof menu.price === "number" && Number.isFinite(menu.price)
      ? `${menu.price.toLocaleString("ko-KR")}원${menu.priceUnit ? " / " + menu.priceUnit : ""}`
      : "[가격 확인 후 입력]";
  function closeBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose();
  }
  return (
    <dialog
      ref={dialog}
      className="menu-dialog"
      id="menu-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeBackdrop}
    >
      <button
        ref={closeButton}
        className="dialog-close icon-button"
        type="button"
        aria-label="메뉴 상세 닫기"
        onClick={onClose}
      >
        ×
      </button>
      <div className="dialog-image">
        <MenuImage menu={menu} />
        <span>
          {menu.imageCaption || "AI 연출 이미지 · 실제 메뉴와 다를 수 있습니다"}
        </span>
      </div>
      <div className="dialog-copy">
        <span className="eyebrow">{menu.label}</span>
        <h2 id="dialog-title">{menu.name}</h2>
        <p>{menu.detail}</p>
        <dl className="menu-facts">
          <div>
            <dt>가격</dt>
            <dd>{price}</dd>
          </div>
          <div>
            <dt>판매·구성</dt>
            <dd>
              {menu.priceSource ||
                (menu.confirmed ? "판매 메뉴" : "매장 확인 예정")}
            </dd>
          </div>
        </dl>
        <p className="allergy-note">
          알레르기 유발 재료와 원산지는 확인 후 안내합니다.
        </p>
        <a href="#visit" className="button primary" onClick={onClose}>
          매장 정보 확인하기 <span>↗</span>
        </a>
      </div>
    </dialog>
  );
}
