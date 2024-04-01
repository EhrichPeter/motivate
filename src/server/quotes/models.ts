import { Tables } from '../../../types/supabase';

export type Quote = Tables<'quotes'>;

export type QuoteWithBookMark = Quote & { bookmarked: boolean };
