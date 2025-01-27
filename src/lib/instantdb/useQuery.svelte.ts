import { coerceQuery, InstantClient, type Exactly, type Query } from '@instantdb/core';
import { untrack } from 'svelte';

const defaultState = {
	isLoading: true,
	data: undefined,
	pageInfo: undefined,
	error: undefined
};

function useQuery<Q extends Query, Schema>(
	// @ts-ignore
	_core: InstantClient<Schema>,
	_query: Exactly<Query, Q> | null
) {
	const query = _query ? coerceQuery(_query) : null;
	// @ts-expect-error
	let state: LifecycleSubscriptionState<Q, Schema> = $state(defaultState);
	$effect(() => {
		// @ts-ignore
		const unsubscribe = _core.subscribeQuery<Q>(query, (result) => {
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

export { useQuery };
