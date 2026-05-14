import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'

import { Button } from '../Button/Button'
import { BoardIdentity } from '../BoardIdentity/BoardIdentity'
import { Input } from '../Input/Input'
import { Label } from '../Label/Label'
import { TextArea } from '../TextArea/TextArea'
import './form-new-board.css'

const apiUrl = import.meta.env.VITE_API_URL ?? '/api'

export function FormNewBoard() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [boardName, setBoardName] = useState('')
  const isSubmitDisabled = boardName.trim() === ''

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const name = boardName.trim()
    const description = String(formData.get('description') ?? '').trim()
    const themeColor = String(formData.get('themeColor') ?? '').trim()
    const icon = String(formData.get('boardIcon') ?? '').trim()

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      
      const response = await fetch(`${apiUrl}/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || null,
          themeColor,
          icon,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        const details =
          body &&
          typeof body === 'object' &&
          'details' in body &&
          body.details &&
          typeof body.details === 'object'
            ? Object.values(body.details as Record<string, unknown>).find(
                (value) => typeof value === 'string'
              )
            : null
        const errorMessage =
          typeof details === 'string'
            ? details
            : body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
              ? body.error
            : 'Unable to create board.'

        throw new Error(errorMessage)
      }

      await mutate(`${apiUrl}/boards`)
      navigate('/boards')
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to create board.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/boards')
  }

  const handleFormChange = () => {
    if (submitError !== null) {
      setSubmitError(null)
    }
  }

  return  (
    <form className="create-board-form" onSubmit={handleSubmit} onChange={handleFormChange}>
          <div className="form-group">
            <Label htmlFor="name">
              Board Name <span>*</span>
            </Label>

            <Input
              id="name"
              name="name"
              value={boardName}
              type="text"
              placeholder="e.g. Q4 Marketing Strategy"
              onChange={(event) => {
                setBoardName(event.currentTarget.value)
              }}
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="description">
              Description <small>(optional)</small>
            </Label>

            <TextArea
              id="description"
              name="description"
              placeholder="What is the goal of this board?"
            />
          </div>

          <div className="divider" />

          <BoardIdentity />

          <div className="divider" />

          <div className="form-actions">
            <Button type="submit" disabled={isSubmitting || isSubmitDisabled}>
              {isSubmitting ? 'Creating...' : 'Create Board'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>

          {submitError && <p className="form-error">{submitError}</p>}
    </form>
  )
}
