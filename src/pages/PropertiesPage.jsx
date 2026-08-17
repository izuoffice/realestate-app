import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { createProperty, deleteProperty, fetchProperties, updateProperty } from '../services/properties'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'
import './PropertiesPage.css'

function PropertiesPage() {
  const { user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadProperties()
  }, [])

  // Supabaseから物件一覧を取得する
  const loadProperties = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage('物件の取得に失敗しました: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClick = () => {
    setEditingProperty(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setIsFormOpen(true)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingProperty(null)
  }

  // 新規登録・編集どちらもこのフォームから呼ばれる
  const handleSubmitForm = async (values) => {
    setSubmitting(true)
    setErrorMessage('')
    try {
      if (editingProperty) {
        await updateProperty(editingProperty.id, values)
      } else {
        await createProperty({ ...values, userId: user.id })
      }
      setIsFormOpen(false)
      setEditingProperty(null)
      await loadProperties()
    } catch (error) {
      setErrorMessage('保存に失敗しました: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    setErrorMessage('')
    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((property) => property.id !== id))
    } catch (error) {
      setErrorMessage('削除に失敗しました: ' + error.message)
    }
  }

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

      {errorMessage && <p className="properties-error">{errorMessage}</p>}

      {isFormOpen ? (
        <PropertyForm
          initialValues={editingProperty}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
          submitting={submitting}
        />
      ) : (
        <button type="button" className="property-add-button" onClick={handleCreateClick}>
          物件を新規登録
        </button>
      )}

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="properties-empty">登録されている物件はありません</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertiesPage
