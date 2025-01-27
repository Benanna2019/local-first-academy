import { InstantClient, type User } from '@instantdb/core';
import { untrack } from 'svelte';

type AuthState = {
	isLoading: boolean;
	user: User | undefined;
	error: { message: string } | undefined;
};

const defaultAuthState: AuthState = {
	isLoading: true,
	user: undefined,
	error: undefined
};

// @ts-ignore
function useAuth<Schema>(_core: InstantClient<Schema>) {
	let state = $state(defaultAuthState);

	$effect(() => {
		const unsubscribe = _core.subscribeAuth((result) => {
			untrack(() => {
				state = {
					isLoading: false,
					...result
				};
			});
		});

		return () => {
			unsubscribe();
		};
	});

	return {
		get state() {
			return state;
		}
	};
}

export { useAuth };
