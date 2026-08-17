import { useAuth } from '../contexts/AuthContext'
import './PropertiesPage.css'

// 物件一覧のダミーデータ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンライズ渋谷', rent: 128000, area: '東京都渋谷区' },
  { id: 2, name: 'グリーンヒルズ横浜', rent: 98000, area: '神奈川県横浜市' },
  { id: 3, name: 'パークサイド新宿', rent: 152000, area: '東京都新宿区' },
  { id: 4, name: 'リバーサイド大阪', rent: 76000, area: '大阪府大阪市' },
  { id: 5, name: 'ヒルトップ福岡', rent: 68000, area: '福岡県福岡市' },
  { id: 6, name: 'セントラル名古屋', rent: 89000, area: '愛知県名古屋市' },
]

function PropertiesPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="properties-page">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="properties-header-right">
          <span className="properties-user">{user?.email}</span>
          <button type="button" onClick={signOut}>
            ログアウト
          </button>
        </div>
      </header>

      <div className="properties-grid">
        {DUMMY_PROPERTIES.map((property) => (
          <div className="property-card" key={property.id}>
            <h2 className="property-name">{property.name}</h2>
            <p className="property-rent">家賃: {property.rent.toLocaleString()}円 / 月</p>
            <p className="property-area">エリア: {property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertiesPage
