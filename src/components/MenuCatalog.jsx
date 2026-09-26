export default function MenuCatalog({ content }) {
  return (
    <details className="full-menu" id="full-menu">
      <summary>
        <span className="full-menu-open">전체 메뉴 보기</span>
        <span className="full-menu-close">전체 메뉴 접기</span>
        <span className="full-menu-hint">
          가격 · 사리 · 사이드 · 주류 · 음료
        </span>
        <span className="full-menu-icon" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="catalog-wrap">
        <div className="catalog-heading">
          <h3>전체 메뉴와 가격</h3>
          <p>{content.menuNotice}</p>
        </div>
        <div className="catalog">
          {content.catalog.map((group, index) => (
            <details
              key={group.title}
              className="catalog-group"
              open={index < 2}
            >
              <summary>
                {group.title}
                <span aria-hidden="true">+</span>
              </summary>
              <dl>
                {group.items.map((item) => (
                  <div key={item.name}>
                    <dt>
                      {item.name}
                      {item.unit && <small>{item.unit}</small>}
                    </dt>
                    <dd>{item.price.toLocaleString("ko-KR")}원</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
        <div className="order-notes">
          <h3>주문 전에 확인해 주세요</h3>
          <ul>
            {content.orderNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}
