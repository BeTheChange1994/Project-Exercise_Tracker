import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [muscle, setMuscle] = useState('')
    const [title, setTitle] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [exp, setExp] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = {muscle, title, sets, reps, exp}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setMuscle('')
            setTitle('')
            setSets('')
            setReps('')
            setExp('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Muscle Group:</label>
            <input 
                type="text"
                onChange={(e) => setMuscle(e.target.value)}
                value={muscle}
                className={emptyFields.includes('muscle') ? 'error' : ''}
            />

            <label>Exercise title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Sets:</label>
            <input 
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets}
                className={emptyFields.includes('sets') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <label>Exp Reward:</label>
            <input 
                type="number"
                onChange={(e) => setExp(e.target.value)}
                value={exp}
                className={emptyFields.includes('exp') ? 'error' : ''}
            />

            <button> Add Workout</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default WorkoutForm