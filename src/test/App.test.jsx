import { StrictMode } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
import MenuSection from "../components/MenuSection.jsx";
import VisitSection from "../components/VisitSection.jsx";
import content from "../data/content.json";

describe("restaurant journeys after React migration", () => {
  it("filters signature dishes and rice, announces counts and restores all", async () => {
    const user = userEvent.setup();
    render(<MenuSection content={content} />);
    expect(screen.getByRole("status").textContent).toContain("전체 메뉴 5개");
    await user.click(
      screen.getByRole("button", { name: "마무리 볶음밥", exact: true }),
    );
    expect(
      screen.queryByRole("button", { name: "원조 닭갈비 자세히 보기" }),
    ).toBeNull();
    expect(screen.getByRole("button", { name: /볶음밥 자세히/ })).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain("곁들임 메뉴 1개");
    await user.click(
      screen.getByRole("button", { name: "닭갈비", exact: true }),
    );
    expect(screen.queryByRole("button", { name: /볶음밥 자세히/ })).toBeNull();
    expect(screen.getByRole("status").textContent).toContain("닭갈비 메뉴 4개");
    await user.click(screen.getByRole("button", { name: "대표 메뉴" }));
    expect(screen.getByRole("button", { name: /볶음밥 자세히/ })).toBeTruthy();
  });

  it("opens each menu with its own price, closes and returns focus", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <MenuSection content={content} />
      </StrictMode>,
    );
    for (const menu of content.menus) {
      const trigger = screen.getByRole("button", {
        name: menu.id === "rice" ? /볶음밥 자세히/ : `${menu.name} 자세히 보기`,
      });
      await user.click(trigger);
      const dialog = screen.getByRole("dialog");
      expect(
        within(dialog).getByRole("heading", { name: menu.name }),
      ).toBeTruthy();
      expect(
        within(dialog).getByText(
          new RegExp(`${menu.price.toLocaleString("ko-KR")}원`),
          { selector: "dd" },
        ),
      ).toBeTruthy();
      expect(document.body.classList.contains("dialog-open")).toBe(true);
      await user.click(
        within(dialog).getByRole("button", { name: "메뉴 상세 닫기" }),
      );
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(document.activeElement).toBe(trigger);
      expect(document.body.classList.contains("dialog-open")).toBe(false);
    }
  });

  it("handles native Escape cancellation and visit link without leaving scroll locked", async () => {
    const user = userEvent.setup();
    render(<MenuSection content={content} />);
    const trigger = screen.getByRole("button", {
      name: "원조 닭갈비 자세히 보기",
    });
    await user.click(trigger);
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: true, cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    await user.click(trigger);
    await user.click(
      within(screen.getByRole("dialog")).getByRole("link", {
        name: /매장 정보 확인/,
      }),
    );
    expect(document.body.classList.contains("dialog-open")).toBe(false);
  });

  it("keeps all 27 menu prices and ordering notes", async () => {
    const user = userEvent.setup();
    const { container } = render(<MenuSection content={content} />);
    await user.click(screen.getByText("전체 메뉴 보기"));
    expect(container.querySelectorAll(".catalog dd")).toHaveLength(27);
    expect(container.querySelectorAll(".order-notes li")).toHaveLength(
      content.orderNotes.length,
    );
    const groups = container.querySelectorAll(".catalog-group");
    expect(groups[0].open).toBe(true);
    await user.click(groups[0].querySelector("summary"));
    expect(groups[0].open).toBe(false);
  });

  it("toggles mobile navigation and dismisses it with Escape and section links", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: "탐색 메뉴 열기" });
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    await user.keyboard("{Escape}");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
    await user.click(toggle);
    await user.click(
      within(screen.getByRole("navigation", { name: "모바일 메뉴" })).getByRole(
        "link",
        { name: /매장 안내/ },
      ),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("copies address, displays feedback and keeps unconfirmed phone unavailable", async () => {
    const user = userEvent.setup();
    const copy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<VisitSection content={content} />);
    await user.click(screen.getByRole("button", { name: "주소 복사" }));
    expect(copy).toHaveBeenCalledWith(content.address);
    expect(screen.getByRole("status").textContent).toContain("복사했어요");
    expect(screen.queryByRole("link", { name: /매장에 전화/ })).toBeNull();
    expect(screen.getByTitle(/카카오맵/).getAttribute("src")).toBe(
      "kakao-map.html",
    );
    for (const link of screen.getAllByRole("link", { name: /길찾기/ })) {
      expect(link.getAttribute("href")).toBe(content.mapDirectionsUrl);
    }
  });

  it("puts menu and visit information before the brand story", () => {
    render(<App />);
    const sections = Array.from(document.querySelectorAll("main > section"));
    expect(sections.map((section) => section.id).slice(0, 4)).toEqual([
      "home",
      "menu",
      "visit",
      "story",
    ]);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("이둥이네 닭갈비");
  });

  it("lands on a section linked from another page", () => {
    window.history.replaceState({}, "", "/index.html#visit");
    const scroll = vi.fn();
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: scroll,
    });
    try {
      render(<App />);
      expect(scroll).toHaveBeenCalledOnce();
    } finally {
      delete Element.prototype.scrollIntoView;
    }
  });

  it("shows the restaurant interiors and park view in the visit section", () => {
    render(<VisitSection content={content} />);
    expect(
      screen.getByAltText("창가 좌석과 테이블이 보이는 매장 내부").getAttribute("src"),
    ).toBe("assets/restaurant_empty.jpg");
    expect(
      screen.getByAltText("철판 테이블과 셀프 코너가 보이는 매장 내부").getAttribute("src"),
    ).toBe("assets/restaurant_empty2.jpg");
    expect(
      screen.getByAltText("매장 창가에서 내려다보이는 수노을공원 풍경").getAttribute("src"),
    ).toBe("assets/restaurant_view.jpg");
  });

  it("reports clipboard failure and enables only a valid phone number", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("denied"),
    );
    render(<VisitSection content={{ ...content, phone: "031-123-4567" }} />);
    await user.click(screen.getByRole("button", { name: "주소 복사" }));
    expect(screen.getByRole("status").textContent).toContain("직접 선택");
    expect(
      screen.getByRole("link", { name: /매장에 전화/ }).getAttribute("href"),
    ).toBe("tel:0311234567");
  });

  it.each([
    ["/franchise.html", /함께 이어갈/, "가맹 안내"],
    ["/meal-kit.html", /우리 집에서도/, "밀키트"],
  ])(
    "loads the independent %s entry with the shared navigation",
    (path, title, current) => {
      window.history.replaceState({}, "", path);
      render(<App />);
      expect(
        screen.getByRole("heading", { level: 1, name: title }),
      ).toBeTruthy();
      expect(
        screen
          .getByRole("link", { name: current, exact: true })
          .getAttribute("aria-current"),
      ).toBe("page");
      expect(screen.queryByRole("button", { name: /주문|결제/ })).toBeNull();
      expect(screen.getByRole("link", { name: "매장 메뉴 ↗" }).getAttribute("href"))
        .toBe("index.html#menu");
    },
  );
});
