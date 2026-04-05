import { useState, useEffect, useRef } from 'react'
import { WORDS, GROUPS, GROUP_SIZE, type Word } from './data'

const STORAGE_KEY = 'woorden-spel-v1'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Serialisation ────────────────────────────────────────────────────────────

interface SavedState {
  wordOrder: number[]
  foundIds: number[]
  foundGroups: [number, number[]][]
  mistakes: number
  groupsCompleted: number
  expandedGroups: number[]
}

interface GameState {
  words: Word[]
  foundIds: Set<number>
  foundGroups: Map<number, number[]>
  selected: number[]
  errorIds: Set<number>
  mistakes: number
  groupsCompleted: number
}

function saveToStorage(state: GameState, expanded: Set<number>) {
  const saved: SavedState = {
    wordOrder: state.words.map(w => w.id),
    foundIds: [...state.foundIds],
    foundGroups: [...state.foundGroups.entries()],
    mistakes: state.mistakes,
    groupsCompleted: state.groupsCompleted,
    expandedGroups: [...expanded],
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
}

function loadFromStorage(): { game: GameState; expanded: Set<number> } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const saved: SavedState = JSON.parse(raw)

    // Re-order words according to saved order
    const wordMap = new Map(WORDS.map(w => [w.id, w]))
    const words = saved.wordOrder
      .map(id => wordMap.get(id))
      .filter((w): w is Word => w !== undefined)

    // Validate: all words must be present
    if (words.length !== WORDS.length) return null

    return {
      game: {
        words,
        foundIds: new Set(saved.foundIds),
        foundGroups: new Map(saved.foundGroups),
        selected: [],
        errorIds: new Set(),
        mistakes: saved.mistakes,
        groupsCompleted: saved.groupsCompleted,
      },
      expanded: new Set(saved.expandedGroups),
    }
  } catch {
    return null
  }
}

function freshState(): { game: GameState; expanded: Set<number> } {
  return {
    game: {
      words: shuffle(WORDS),
      foundIds: new Set(),
      foundGroups: new Map(),
      selected: [],
      errorIds: new Set(),
      mistakes: 0,
      groupsCompleted: 0,
    },
    expanded: new Set(),
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export default function App() {
  const loaded = loadFromStorage() ?? freshState()
  const [state, setState] = useState<GameState>(loaded.game)
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(loaded.expanded)
  const [errorGroupId, setErrorGroupId] = useState<number | null>(null)

  // Save to localStorage whenever relevant state changes (skip ephemeral fields)
  const saveRef = useRef({ state, expandedGroups })
  saveRef.current = { state, expandedGroups }

  useEffect(() => {
    saveToStorage(state, expandedGroups)
  }, [state.foundIds, state.foundGroups, state.mistakes, state.groupsCompleted, expandedGroups]) // eslint-disable-line react-hooks/exhaustive-deps

  const isWon = state.groupsCompleted === GROUPS.length

  // ── Helpers ────────────────────────────────────────────────────────────────

  function applyMatch(
    prev: GameState,
    idsToAdd: number[],
    groupId: number
  ): GameState {
    const newFoundIds = new Set(prev.foundIds)
    idsToAdd.forEach(id => newFoundIds.add(id))

    const newFoundGroups = new Map(prev.foundGroups)
    const groupWords = [...(newFoundGroups.get(groupId) ?? []), ...idsToAdd]
    newFoundGroups.set(groupId, groupWords)

    let finalFoundIds = newFoundIds
    let finalFoundGroups = newFoundGroups

    // Auto-complete last word when 24/25 found
    if (groupWords.length === GROUP_SIZE - 1) {
      const last = prev.words.find(w => w.groupId === groupId && !newFoundIds.has(w.id))
      if (last) {
        finalFoundIds = new Set(newFoundIds)
        finalFoundIds.add(last.id)
        finalFoundGroups = new Map(newFoundGroups)
        finalFoundGroups.set(groupId, [...groupWords, last.id])
      }
    }

    const newGroupsCompleted = prev.groupsCompleted +
      ((finalFoundGroups.get(groupId)?.length ?? 0) >= GROUP_SIZE ? 1 : 0)

    return {
      ...prev,
      foundIds: finalFoundIds,
      foundGroups: finalFoundGroups,
      selected: [],
      groupsCompleted: newGroupsCompleted,
    }
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleWordClick(word: Word) {
    setState(prev => {
      if (prev.foundIds.has(word.id) || prev.errorIds.size > 0) return prev

      if (prev.selected.includes(word.id)) {
        return { ...prev, selected: prev.selected.filter(id => id !== word.id) }
      }

      const newSelected = [...prev.selected, word.id]
      if (newSelected.length < 2) return { ...prev, selected: newSelected }

      const [idA, idB] = newSelected
      const wordA = prev.words.find(w => w.id === idA)!
      const wordB = prev.words.find(w => w.id === idB)!

      if (wordA.groupId === wordB.groupId) {
        return applyMatch(prev, [idA, idB], wordA.groupId)
      } else {
        return { ...prev, selected: [], errorIds: new Set([idA, idB]), mistakes: prev.mistakes + 1 }
      }
    })
  }

  function handleGroupClick(groupId: number) {
    if (state.errorIds.size > 0 || state.selected.length !== 1) return
    const wordId = state.selected[0]
    const word = state.words.find(w => w.id === wordId)!

    if (word.groupId === groupId) {
      setState(prev => applyMatch(prev, [wordId], groupId))
    } else {
      setState(prev => ({ ...prev, selected: [], errorIds: new Set([wordId]), mistakes: prev.mistakes + 1 }))
      setErrorGroupId(groupId)
      setTimeout(() => setErrorGroupId(null), 400)
    }
  }

  useEffect(() => {
    if (state.errorIds.size === 0) return
    const t = setTimeout(() => setState(prev => ({ ...prev, errorIds: new Set() })), 400)
    return () => clearTimeout(t)
  }, [state.errorIds])

  function toggleGroup(id: number) {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleNewGame() {
    localStorage.removeItem(STORAGE_KEY)
    const { game, expanded } = freshState()
    setState(game)
    setExpandedGroups(expanded)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const remaining = state.words.filter(w => !state.foundIds.has(w.id))
  const firstSelected = state.selected.length === 1
    ? state.words.find(w => w.id === state.selected[0])
    : null
  const visibleGroups = GROUPS.filter(g => (state.foundGroups.get(g.id)?.length ?? 0) > 0)

  return (
    <>
      {isWon && (
        <div className="win-overlay">
          <div className="win-card">
            <h2>Gewonnen! 🎉</h2>
            <p>Je hebt alle 25 groepen gevonden met {state.mistakes} {state.mistakes === 1 ? 'fout' : 'fouten'}.</p>
            <button onClick={handleNewGame}>Opnieuw spelen</button>
          </div>
        </div>
      )}

      <div className="header">
        <h1>Woordenspel <span>— 25 groepen van 25</span></h1>
        <div className="stats">
          <span>Groepen: <strong>{state.groupsCompleted}/25</strong></span>
          <span>Woorden: <strong>{state.foundIds.size}/625</strong></span>
          <span>Fouten: <strong>{state.mistakes}</strong></span>
          <button className="new-game-btn" onClick={handleNewGame}>Nieuw spel</button>
        </div>
      </div>

      <div className="selected-hint">
        {firstSelected
          ? <>Geselecteerd: <strong>{firstSelected.word}</strong> — klik een tweede woord of een groep rechts</>
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
        </div>

        <div className="sidebar">
          <h2>Gevonden groepen</h2>
          {visibleGroups.length === 0 && (
            <div className="hint">Nog geen groepen gevonden</div>
          )}
          {visibleGroups.map(group => {
            const foundInGroup = state.foundGroups.get(group.id) ?? []
            const isComplete = foundInGroup.length >= GROUP_SIZE
            const isExpanded = expandedGroups.has(group.id)
            const groupWords = foundInGroup
              .map(id => state.words.find(w => w.id === id)!)
              .filter(Boolean)

            return (
              <div key={group.id} className="group-progress">
                <div
                  className={[
                    'group-header',
                    firstSelected && !isComplete ? 'group-header-target' : '',
                    errorGroupId === group.id ? 'group-header-error' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    background: group.color + (isComplete ? '44' : '22'),
                    borderBottom: isExpanded ? `1px solid ${group.color}44` : 'none',
                  }}
                  onClick={() => firstSelected && !isComplete ? handleGroupClick(group.id) : toggleGroup(group.id)}
                >
                  <span className="group-name">
                    <span className="group-dot" style={{ background: group.color }} />
                    {group.name}
                  </span>
                  <span className="group-count">
                    {foundInGroup.length}/{GROUP_SIZE}{isComplete ? ' ✓' : ''}
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
        </div>
      </div>
    </>
  )
}
