import PreparationPage from "../components/PreparationPage.jsx";

const config = {
  eyebrow: "THE NEXT CHAPTER",
  title: ["함께 이어갈", "이둥이네."],
  description: "한대앞에서 시작해 새솔동으로 이어온 이야기. 다음 이야기를 함께할 파트너를 위한 공간을 준비합니다.",
  status: "가맹 안내 준비 중 · 현재 상담 접수 전",
  story: {
    eyebrow: "OUR BEGINNING",
    title: ["한대앞의 시작.", "새솔동에서 이어가는 오늘."],
    paragraphs: [
      "쌍둥이닭갈비는 한대앞에서 시작했습니다. 새솔동으로 매장을 옮긴 뒤에도 운영을 이어가고 있습니다.",
      "이둥이네 닭갈비라는 새로운 이름으로, 앞으로 함께할 파트너를 위한 가맹 안내를 준비합니다.",
    ],
    link: { href: "index.html#menu", label: "메뉴와 매장 알아보기 ↗" },
  },
  preparation: {
    eyebrow: "PARTNERSHIP",
    title: ["함께하기 위한 정보를", "차근차근 준비하고 있습니다."],
    items: [
      { title: "가맹 조건", description: "모집 지역·매장 기준·계약 조건", status: "[확정 후 안내]" },
      { title: "창업 비용과 지원", description: "비용 항목·교육·운영 지원 범위", status: "[확정 후 안내]" },
      { title: "상담 창구", description: "가맹 전용 연락처와 상담 접수", status: "[연락처 등록 예정]" },
    ],
    question: "지금 가맹 상담을 신청할 수 있나요?",
    answer: "아직 상담 접수를 시작하지 않았습니다. 가맹 안내와 문의 창구가 준비되면 이 페이지에서 안내할 예정입니다. 현재 신청서를 받거나 연락처를 수집하지 않습니다.",
    cta: { href: "index.html#story", label: "브랜드 이야기 보기" },
  },
};

export default function FranchisePage() {
  return <PreparationPage config={config} />;
}
