import { db, tx, id } from '$lib/instantdb/db';
import slugify from 'slugify';

const editJournalEntry = (existingPostId: any, draftState: any) => {
	db.transact([
		tx['journal-entries'][existingPostId].update({
			title: draftState.title,
			text: draftState.text,
			updatedAt: new Date().toISOString(),
			slug: draftState.slug || slugify(draftState.title, { lower: true }),
			excerpt: draftState.excerpt
		})
	]);
};

const addJournalEntry = async (draftState: any, userId: string) => {
	const slug = draftState.slug || slugify(draftState.title, { lower: true });
	db.transact([
		tx['journal-entries'][id()]
			.update({
				title: draftState.title,
				text: draftState.text,
				updatedAt: new Date().toISOString(),
				slug,
				excerpt: draftState.excerpt
			})
			.link({
				author: userId
			})
	]);
	return { slug };
};

export { editJournalEntry, addJournalEntry };
