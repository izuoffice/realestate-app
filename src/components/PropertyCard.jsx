import './PropertyCard.css'

// 物件1件分の情報を表示するカード
function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h2 className="property-name">{property.name}</h2>
      <p className="property-rent">家賃: {property.rent.toLocaleString()}円 / 月</p>
      <p className="property-area">エリア: {property.area}</p>
      <p className="property-layout">間取り: {property.layout}</p>

      <div className="property-card-actions">
        <button type="button" onClick={() => onEdit(property)}>
          編集
        </button>
        <button type="button" className="property-delete-button" onClick={() => onDelete(property.id)}>
          削除
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
