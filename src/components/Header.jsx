import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo.jsx";

const links = [
  ["#menu", "메뉴 소개"],
  ["#visit", "매장 안내"],
  ["#story", "이둥이네 이야기"],
  ["franchise.html", "가맹 안내"],
  ["meal-kit.html", "밀키트"],
];

export default function Header({ page = "home" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1181px)");
    const onResize = (e) => {
      if (e.matches) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    media.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      media.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);
  useEffect(() => {
    if (page !== "home" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    ["story", "menu", "visit"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [page]);
  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <a
          className="brand"
          href={page === "home" ? "#home" : "index.html"}
          aria-label="이둥이네 닭갈비, since 2015, 처음으로"
        >
          <BrandLogo />
        </a>
        {page === "home" ? (
          <>
            <nav className="desktop-nav" aria-label="주요 메뉴">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className={[
                    href === active && "is-current",
                    href === "meal-kit.html" && "shop-nav",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {label}
                  {href === "meal-kit.html" && <small>판매 준비 중</small>}
                </a>
              ))}
            </nav>
            <button
              ref={toggle}
              type="button"
              className="nav-toggle icon-button"
              aria-label={open ? "탐색 메뉴 닫기" : "탐색 메뉴 열기"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </>
        ) : (
          <nav className="subpage-nav" aria-label="페이지 이동">
            <a href="index.html#menu">메뉴 소개</a>
            <a href="index.html#visit">매장 안내</a>
            <a
              href="franchise.html"
              aria-current={page === "franchise" ? "page" : undefined}
            >
              가맹 안내
            </a>
            <a
              href="meal-kit.html"
              aria-current={page === "meal-kit" ? "page" : undefined}
            >
              밀키트
            </a>
          </nav>
        )}
      </div>
      {page === "home" && (
        <nav
          className="mobile-nav"
          id="mobile-nav"
          aria-label="모바일 메뉴"
          hidden={!open}
        >
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              {href === "meal-kit.html" ? " · 판매 준비 중" : ""} <span>↗</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
