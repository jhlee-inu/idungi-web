import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import FranchisePage from "./pages/FranchisePage.jsx";
import MealKitPage from "./pages/MealKitPage.jsx";

export default function App() {
  const filename = window.location.pathname.split("/").pop();
  const page =
    filename === "franchise.html"
      ? "franchise"
      : filename === "meal-kit.html"
        ? "meal-kit"
        : "home";
  useEffect(() => {
    if (page !== "home" || !window.location.hash) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!target) return;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView();
    root.style.scrollBehavior = previousBehavior;
  }, [page]);
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>
      <Header page={page} />
      {page === "franchise" ? (
        <FranchisePage />
      ) : page === "meal-kit" ? (
        <MealKitPage />
      ) : (
        <HomePage />
      )}
      <Footer page={page} />
      {page === "home" && (
        <div className="mobile-bottom">
          <a href="#menu">
            메뉴 둘러보기 <span>↗</span>
          </a>
          <a href="#visit">
            매장 안내 <span>↗</span>
          </a>
        </div>
      )}
    </>
  );
}
