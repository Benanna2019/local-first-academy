import { init, tx, id } from '@instantdb/core';

export type Todo = {
	id: string;
	name: string;
	completed: boolean;
	createdAt: string;
	updatedAt?: string;
};

export const db = init({ appId: '4c94c37c-e7ae-4a45-8d33-9f6cccf3b943' });

export { tx, id };
