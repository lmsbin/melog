import { CommandHandler } from '@/shared/command';
import commandExecutor from '@/shared/command/commandExecutor';

export const SEARCH_CHARACTER_COMMAND = 'SEARCH_CHARACTER_COMMAND';
export type SearchCharacterPayload = {
	query: string;
	navigate: (url: string) => void;
};
export const searchCharacterHandler: CommandHandler<
	SearchCharacterPayload
> = async (payload) => {
	if (!payload) return;

	const query = payload.query.trim();
	if (!query) return;

	const url = `/search?q=${encodeURIComponent(query)}`;
	payload.navigate(url);
};

commandExecutor.register(SEARCH_CHARACTER_COMMAND, searchCharacterHandler);
