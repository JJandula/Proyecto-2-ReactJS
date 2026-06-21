export default function DealerCard({ dealer }) {
  return (
    <div className="dealer-card">
      <h3 className="dealer-card__brand">{dealer.brand}</h3>
      <div className="dealer-card__info">
        <div className="dealer-card__row">
          <span className="dealer-card__icon">📍</span>
          <span>{dealer.address}</span>
        </div>
        <div className="dealer-card__row">
          <span className="dealer-card__icon">📞</span>
          <span>{dealer.phone}</span>
        </div>
        <div className="dealer-card__row">
          <span className="dealer-card__icon">🕐</span>
          <span>{dealer.hours}</span>
        </div>
      </div>
    </div>
  );
}
