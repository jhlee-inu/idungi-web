export default function KakaoMap({ content }) {
  return (
    <div className="location-panel kakao-panel">
      <div className="location-top">
        <span>KAKAOMAP · 매장 위치</span>
      </div>
      {/* Kakao's document.write loader stays in an isolated static document. */}
      <iframe
        className="kakao-map-frame"
        src="kakao-map.html"
        title={`${content.mapPlaceName} 카카오맵 — 꽃내음1길 25`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="map-copy">
        <h3>새솔동에서 만나요.</h3>
        <p>
          카카오맵에는 기존 상호인
          <br />
          <strong>{content.mapPlaceName}</strong>으로 표시됩니다.
        </p>
        <div className="map-actions">
          <a
            className="button kakao-button"
            href={content.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            카카오맵에서 보기 <span aria-hidden="true">↗</span>
          </a>
          <a
            className="map-directions"
            href={content.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            길찾기 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="map-help">
          지도가 표시되지 않으면 카카오맵에서 바로 확인해 주세요.
        </p>
      </div>
    </div>
  );
}
