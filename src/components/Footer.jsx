export default function Footer({ page = "home" }) {
  const home = page === "home";
  return (
    <footer>
      <div className="footer-top">
        <a href={home ? "#home" : "index.html"} className="footer-brand">
          이둥이네 <span>닭갈비</span>
          <small>SINCE 2015</small>
        </a>
        <p>
          {home
            ? "오늘도, 맛있는 시간 되세요."
            : "한대앞에서 시작해, 새솔동으로."}
        </p>
        {home && (
          <a className="back-top" href="#home" aria-label="맨 위로 이동">
            ↑
          </a>
        )}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} 이둥이네 닭갈비</span>
        <span>이둥이네 닭갈비 · 가맹·밀키트 준비 중</span>
      </div>
    </footer>
  );
}
