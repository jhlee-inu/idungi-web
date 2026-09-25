export default function VisitGallery() {
  return (
    <section className="visit-photos" aria-labelledby="visit-photos-title">
      <div className="visit-photos-heading">
        <p className="eyebrow">INSIDE & OUT</p>
        <h3 id="visit-photos-title">매장 둘러보기</h3>
      </div>
      <figure className="store-photo">
        <img
          src="assets/store-interior.jpg"
          width="2048"
          height="1536"
          loading="lazy"
          alt="손님들이 식사하는 쌍둥이닭갈비 매장 내부"
        />
        <figcaption>
          <strong>함께 둘러앉는, 우리의 매장.</strong>
          <span>쌍둥이닭갈비 매장 내부</span>
        </figcaption>
      </figure>
      <div className="visit-gallery" role="group" aria-label="매장과 주변 풍경">
        <figure>
          <img
            src="assets/restaurant_empty.jpg"
            width="5712"
            //height="4284"
            loading="lazy"
            decoding="async"
            alt="창가 좌석과 테이블이 보이는 매장 내부"
          />
          <figcaption>창가로 이어지는 매장 좌석</figcaption>
        </figure>
        <figure>
          <img
            src="assets/restaurant_empty2.jpg"
            width="5712"
            //height="4284"
            loading="lazy"
            decoding="async"
            alt="철판 테이블과 셀프 코너가 보이는 매장 내부"
          />
          <figcaption>함께 둘러앉기 좋은 공간</figcaption>
        </figure>
        <figure className="park-view">
          <img
            src="assets/restaurant_view.jpg"
            width="5712"
            height="4284"
            loading="lazy"
            decoding="async"
            alt="매장 창가에서 내려다보이는 수노을공원 풍경"
          />
          <figcaption>매장 창가에서 보이는 수노을공원</figcaption>
        </figure>
      </div>
    </section>
  );
}
