import { db } from './db';
import { useQuery } from './useQuery.svelte';
export const userByAuthIdQuery = (authId: string) => {
	return {
		query: {
			users: {
				$: {
					where: {
						userId: authId
					}
				},
				todos: {}
			}
		}
	};
};

export const journalEntryQuery = (slug: string) => {
	return {
		query: {
			'journal-entries': {
				$: {
					where: {
						slug
					}
				}
			}
		}
	};
};

export const journalEntryBySlugAndFilterQuery = (slug: string, filter: 'published' | 'draft') => {
	return {
		query: {
			'journal-entries': {
				$: {
					where: {
						slug,
						status: filter
					}
				}
			}
		}
	};
};

export const editJournalEntryQuery = (id: string, data: Partial<JournalEntry>) => {
	return {
		tx: {
			'journal-entries': {
				[id]: data
			}
		}
	};
};

export const addJournalEntryQuery = (data: Omit<JournalEntry, 'id'>) => {
	return {
		tx: {
			'journal-entries': {
				$: {
					add: data
				}
			}
		}
	};
};

// Type definition for JournalEntry (you can move this to a separate types file if preferred)
interface JournalEntry {
	createdAt: string;
	excerpt?: string;
	featureImage?: string;
	published: boolean;
	publishedAt?: string;
	slug: string;
	text: string;
	title: string;
	updatedAt: string;
}
