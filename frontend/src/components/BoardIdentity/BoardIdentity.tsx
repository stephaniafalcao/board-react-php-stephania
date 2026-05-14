import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Rocket,
  BarChart3,
  Columns3,
  Megaphone,
  Bug,
  Palette,
} from 'lucide-react'

import { ButtonColor } from '../ButtonColor/ButtonColor'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import { SecondaryTitleForm } from '../SecondaryTitleForm/SecondaryTitleForm'
import './board-identity.css'

const colors = ['#0052CC', '#F59E0B', '#10B981', '#F43F5E', '#6366F1', '#111827']

type IconName = 'rocket' | 'chart' | 'kanban' | 'megaphone' | 'bug' | 'palette'

const icons: Array<{ name: IconName; Icon: LucideIcon }> = [
  { name: 'rocket', Icon: Rocket },
  { name: 'chart', Icon: BarChart3 },
  { name: 'kanban', Icon: Columns3 },
  { name: 'megaphone', Icon: Megaphone },
  { name: 'bug', Icon: Bug },
  { name: 'palette', Icon: Palette },
]

export function BoardIdentity() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedIcon, setSelectedIcon] = useState<IconName>('kanban')

  return (
    <div className="board-identity">
      <input type="hidden" name="themeColor" value={selectedColor} />
      <input type="hidden" name="boardIcon" value={selectedIcon} />

      <SecondaryTitleForm>Board Identity</SecondaryTitleForm>

      <div className="identity-group">
        <span className="identity-label">Theme Color</span>

        <div className="color-list">
          {colors.map((color) => (
            <ButtonColor
              key={color}
              color={color}
              selected={selectedColor === color}
              type="button"
              aria-label={`Select color ${color}`}
              aria-pressed={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="identity-group">
        <span className="identity-label">Board Icon</span>

        <div className="icon-list">
          {icons.map(({ name, Icon }) => (
            <ButtonIcon
              key={name}
              icon={Icon}
              selected={selectedIcon === name}
              label={`Select ${name} icon`}
              onClick={() => setSelectedIcon(name)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
