import { useState, useCallback, useEffect } from 'react'
import { WORDS, GROUPS, GROUP_SIZE, type Word } from './data'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface GameState {
  words: Word[]
  foundIds: Set<number>
  foundGroups: Map<number, number[]> // groupId -> [wordIds found]
  selected: number[]   // up to 2 word ids
  errorIds: Set<number>
  mistakes: number
  groupsCompleted: number
}

function initialState(): GameState {
  return {
    words: shuffle(WORDS),
    foundIds: new Set(),
    foundGroups: new Map(),
    selected: [],
    errorIds: new Set(),
    mistakes: 0,
    groupsCompleted: 0,
  }
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState)
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set())

  const isWon = state.groupsCompleted === GROUPS.length

  const handleWordClick = useCallback((word: Word) => {
    setState(prev => {
      if (prev.foundIds.has(word.id)) return prev
      if (prev.errorIds.size > 0) return prev

      const alreadySelected = prev.selected.includes(word.id)

      // Deselect if clicking selected word
      if (alreadySelected) {
        return { ...prev, selected: prev.selected.filter(id => id !== word.id) }
      }

      const newSelected = [...prev.selected, word.id]

      // Only 1 selected so far
      if (newSelected.length < 2) {
        return { ...prev, selected: newSelected }
      }

      // 2 selected — evaluate
      const [idA, idB] = newSelected
      const wordA = prev.words.find(w => w.id === idA)!
      const wordB = prev.words.find(w => w.id === idB)!

      if (wordA.groupId === wordB.groupId) {
        // Correct match
        const newFoundIds = new Set(prev.foundIds)
        newFoundIds.add(idA)
        newFoundIds.add(idB)

        const newFoundGroups = new Map(prev.foundGroups)
        const groupWords = [...(newFoundGroups.get(wordA.groupId) ?? []), idA, idB]
        newFoundGroups.set(wordA.groupId, groupWords)

        let newGroupsCompleted = prev.groupsCompleted
        let extraFoundIds = newFoundIds
        let extraFoundGroups = newFoundGroups

        // If this group now has GROUP_SIZE-1 found, auto-complete the last word
        if (groupWords.length === GROUP_SIZE - 1) {
          const remaining = prev.words.find(
            w => w.groupId === wordA.groupId && !newFoundIds.has(w.id)
          )
          if (remaining) {
            extraFoundIds = new Set(newFoundIds)
            extraFoundIds.add(remaining.id)
            extraFoundGroups = new Map(newFoundGroups)
            extraFoundGroups.set(wordA.groupId, [...groupWords, remaining.id])
          }
        }

        if ((extraFoundGroups.get(wordA.groupId)?.length ?? 0) >= GROUP_SIZE) {
          newGroupsCompleted++
        }

        return {
          ...prev,
          foundIds: extraFoundIds,
          foundGroups: extraFoundGroups,
          selected: [],
          groupsCompleted: newGroupsCompleted,
        }
      } else {
        // Wrong match — flash error then clear
        return { ...prev, selected: [], errorIds: new Set([idA, idB]), mistakes: prev.mistakes + 1 }
      }
    })
  }, [])

  // Clear error state after animation
  useEffect(() => {
    if (state.errorIds.size === 0) return
    const t = setTimeout(() => {
      setState(prev => ({ ...prev, errorIds: new Set() }))
    }, 400)
    return () => clearTimeout(t)
  }, [state.errorIds])

  function toggleGroup(id: number) {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const remaining = state.words.filter(w => !state.foundIds.has(w.id))
  const firstSelectedWord = state.selected.length === 1
    ? state.words.find(w => w.id === state.selected[0])
    : null

  return (
    <>
      {isWon && (
        <div className="win-overlay">
          <div className="win-card">
            <h2>Gewonnen! 🎉</h2>
            <p>Je hebt alle 25 groepen gevonden met {state.mistakes} {state.mistakes === 1 ? 'fout' : 'fouten'}.</p>
            <button onClick={() => setState(initialState())}>Opnieuw spelen</button>
          </div>
        </div>
      )}

      <div className="header">
        <h1>Woordenspel <span>— 25 groepen van 25</span></h1>
        <div className="stats">
          <span>Groepen: <strong>{state.groupsCompleted}/25</strong></span>
          <span>Woorden: <strong>{state.foundIds.size}/625</strong></span>
          <span>Fouten: <strong>{state.mistakes}</strong></span>
        </div>
      </div>

      <div className="selected-hint">
        {firstSelectedWord
          ? <>Geselecteerd: <strong>{firstSelectedWord.word}</strong> — klik een tweede woord uit dezelfde groep</>
          : 'Klik twee woorden uit dezelfde categorie om ze te koppelen'}
      </div>

      <div className="layout">
        <div className="word-grid-wrapper">
          <div className="word-grid">
            {remaining.map(word => (
              <button
                key={word.id}
                className={[
                  'word-btn',
                  state.selected.includes(word.id) ? 'selected' : '',
                  state.errorIds.has(word.id) ? 'error' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleWordClick(word)}
              >
                {word.word}
              </button>
            ))}
          </div>
          {remaining.length === 0 && !isWon && (
            <div className="hint">Laden…</div>
          )}
        </div>

        <div className="sidebar">
          <h2>Gevonden groepen</h2>
          {GROUPS.map(group => {
            const foundInGroup = state.foundGroups.get(group.id) ?? []
            if (foundInGroup.length === 0) return null
            const isComplete = foundInGroup.length >= GROUP_SIZE
            const isExpanded = expandedGroups.has(group.id)
            const groupWords = foundInGroup
              .map(id => state.words.find(w => w.id === id)!)
              .filter(Boolean)

            return (
              <div key={group.id} className="group-progress">
                <div
                  className="group-header"
                  style={{ background: group.color + '22', borderBottom: isExpanded ? `1px solid ${group.color}44` : 'none' }}
                  onClick={() => toggleGroup(group.id)}
                >
                  <span className="group-name">
                    <span className="group-dot" style={{ background: group.color }} />
                    {group.name}
                  </span>
                  <span className="group-count">
                    {foundInGroup.length}/{GROUP_SIZE} {isComplete ? '✓' : ''}
                  </span>
                </div>
                {isExpanded && (
                  <div className="group-words">
                    {groupWords.map(w => (
                      <span
                        key={w.id}
                        className="group-word-chip"
                        style={{ background: group.color + '33', color: group.color }}
                      >
                        {w.word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {state.foundGroups.size === 0 && (
            <div className="hint">Nog geen groepen gevonden</div>
          )}
        </div>
      </div>
    </>
  )
}
