// Inspired by react-hot-toast library
import { useState, useCallback, useEffect, type ReactNode } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToastProps = {
	id: string
	title?: string
	description?: string
	action?: React.ReactNode
	variant?: "default" | "destructive"
}



const actionTypes = {
	ADD_TOAST: "ADD_TOAST",
	UPDATE_TOAST: "UPDATE_TOAST",
	DISMISS_TOAST: "DISMISS_TOAST",
	REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
	count = (count + 1) % Number.MAX_VALUE
	return count.toString()
}

type State = {
	toasts: ToastProps[]
}

type Action =
	| {
			type: typeof actionTypes.ADD_TOAST
			toast: ToastProps
		}
	| {
			type: typeof actionTypes.UPDATE_TOAST
			toast: Partial<ToastProps> & Pick<ToastProps, "id">
		}
	| {
			type: typeof actionTypes.DISMISS_TOAST
			toastId?: ToastProps["id"]
		}
	| {
			type: typeof actionTypes.REMOVE_TOAST
			toastId?: ToastProps["id"]
		}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
	if (toastTimeouts.has(toastId)) {
		return
	}

	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId)
		dispatch({
			type: actionTypes.REMOVE_TOAST,
			toastId: toastId,
		})
	}, TOAST_REMOVE_DELAY)

	toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case actionTypes.ADD_TOAST:
			return {
				...state,
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			}

		case actionTypes.UPDATE_TOAST:
			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === action.toast.id ? { ...t, ...action.toast } : t
				),
			}

		case actionTypes.DISMISS_TOAST: {
			const { toastId } = action

			if (toastId) {
				addToRemoveQueue(toastId)
			} else {
				state.toasts.forEach((toast) => {
					addToRemoveQueue(toast.id)
				})
			}

			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === toastId || toastId === undefined
						? {
								...t,
							}
						: t
				),
			}
		}

		case actionTypes.REMOVE_TOAST:
			if (action.toastId === undefined) {
				return {
					...state,
					toasts: [],
				}
			}
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId),
			}
	}
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
	memoryState = reducer(memoryState, action)
	listeners.forEach((listener) => {
		listener(memoryState)
	})
}

type Toast = {
	title?: string
	description?: string
	action?: React.ReactNode
	variant?: "default" | "destructive"
}

function toast({ ...props }: Toast) {
	const id = genId()

	const update = (props: ToastProps) =>
		dispatch({
			type: actionTypes.UPDATE_TOAST,
			toast: { ...props, id },
		})
	const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

	dispatch({
		type: actionTypes.ADD_TOAST,
		toast: {
			...props,
			id,
		},

	})

	return {
		id: id,
		dismiss,
		update,
	}
}

function useToast() {
	const [state, setState] = useState<State>(memoryState)

	useEffect(() => {
		listeners.push(setState)
		return () => {
			const index = listeners.indexOf(setState)
			if (index > -1) {
				listeners.splice(index, 1)
			}
		}
	}, [state])

	return {
		...state,
		toast,
		dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
	}
}

export { useToast, toast }