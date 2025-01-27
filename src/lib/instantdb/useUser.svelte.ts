import { InstantClient, type Query } from '@instantdb/core';
import { untrack } from 'svelte';

type UserState = {
	isLoading: boolean;
	user: any | undefined;
	userData: any | undefined;
	error: { message: string } | undefined;
};

const defaultUserState: UserState = {
	isLoading: true,
	user: undefined,
	userData: undefined,
	error: undefined
};

// @ts-ignore
export function useUser<Schema>(db: InstantClient<Schema>) {
	let state = $state(defaultUserState);

	$effect(() => {
		const authUnsubscribe = db.subscribeAuth((authResult) => {
			untrack(() => {
				if (authResult.user) {
					state = {
						...state,
						isLoading: true,
						user: authResult.user
					};

					const query: Query = {
						users: {
							$: {
								where: {
									userId: authResult.user.id
								}
							},
							todos: {}
						}
					};

					// @ts-ignore
					const queryUnsubscribe = db.subscribeQuery(query, (queryResult) => {
						untrack(() => {
							state = {
								isLoading: false,
								user: authResult.user,
								userData: queryResult.data?.users?.[0],
								error: undefined
							};
						});
					});

					return () => {
						queryUnsubscribe();
					};
				} else {
					state = {
						isLoading: false,
						user: undefined,
						userData: undefined,
						error: authResult.error
					};
				}
			});
		});

		return () => {
			authUnsubscribe();
		};
	});

	return {
		get state() {
			return state;
		}
	};
}
