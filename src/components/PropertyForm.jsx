import { useEffect, useState } from 'react'
import './PropertyForm.css'

const EMPTY_FORM = { name: '', rent: '', area: '', layout: '' }

// 物件の新規登録・編集で共通利用するフォーム
function PropertyForm({ initialValues, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initialValues ?? EMPTY_FORM)

  // 編集対象が切り替わったらフォームの値を入れ替える
  useEffect(() => {
    setForm(initialValues ?? EMPTY_FORM)
  }, [initialValues])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      name: form.name,
      rent: Number(form.rent),
      area: form.area,
      layout: form.layout,
    })
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>{initialValues ? '物件を編集' : '物件を新規登録'}</h2>

      <label>
        物件名
        <input type="text" value={form.name} onChange={handleChange('name')} required />
      </label>

      <label>
        家賃（円）
        <input
          type="number"
          value={form.rent}
          onChange={handleChange('rent')}
          min="0"
          required
        />
      </label>

      <label>
        エリア
        <input type="text" value={form.area} onChange={handleChange('area')} required />
      </label>

      <label>
        間取り
        <input
          type="text"
          value={form.layout}
          onChange={handleChange('layout')}
          placeholder="例: 1LDK"
          required
        />
      </label>

      <div className="property-form-actions">
        <button type="button" onClick={onCancel} disabled={submitting}>
          キャンセル
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  )
}

export default PropertyForm
