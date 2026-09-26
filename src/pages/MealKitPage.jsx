import PreparationPage from "../components/PreparationPage.jsx";

const config = {
  eyebrow: "COMING TO YOUR HOME",
  title: ["우리 집에서도,", "이둥이네."],
  description: "매장에서 즐기던 닭갈비를 집에서도. 이둥이네 밀키트의 다음 소식을 이곳에서 전할 예정입니다.",
  status: "판매 준비 중 · 출시 일정 미정",
  story: {
    eyebrow: "AT YOUR TABLE",
    title: ["집에서도 펼쳐질", "맛있는 한 판."],
    image: {
      src: "assets/dakgalbi.webp",
      width: 1536,
      height: 1024,
      alt: "닭갈비 AI 연출 이미지, 실제 밀키트 구성 아님",
      caption: "AI 연출 이미지 · 실제 밀키트 구성이 아닙니다",
    },
    paragraphs: [
      "이둥이네 닭갈비를 집에서도 즐길 수 있도록 밀키트 판매 페이지를 준비할 계획입니다.",
      "상품 구성과 판매 일정이 정해지면 이곳에서 자세히 소개하겠습니다.",
    ],
  },
  preparation: {
    eyebrow: "COMING LATER",
    title: ["판매를 시작하기 전에,", "꼭 필요한 정보를 준비할게요."],
    items: [
      { title: "상품 안내", description: "구성·중량·가격·원재료·보관 방법", status: "[상품 확정 후 안내]" },
      { title: "배송 안내", description: "배송 지역·배송비·출고 일정", status: "[배송 정책 준비 중]" },
      { title: "구매와 고객 문의", description: "주문·결제·문의·교환 및 반품 안내", status: "[판매 시작 후 연결]" },
    ],
    question: "지금 주문하거나 예약 구매할 수 있나요?",
    answer: "아직 판매·예약 주문을 받지 않습니다. 출시일, 상품 구성과 가격은 미정이며, 판매가 준비되면 구매 경로를 안내하겠습니다.",
    cta: { href: "index.html#menu", label: "매장 메뉴 먼저 보기" },
  },
};

export default function MealKitPage() {
  return <PreparationPage config={config} />;
}
