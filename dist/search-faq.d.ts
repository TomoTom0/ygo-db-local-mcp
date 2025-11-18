#!/usr/bin/env node
import { FAQSearchResult } from './types/faq.js';
interface SearchFAQParams {
    faqId?: number;
    cardId?: number;
    cardName?: string;
    cardFilter?: Record<string, any>;
    question?: string;
    answer?: string;
    limit?: number;
    flagAllowWild?: boolean;
}
export declare function searchFAQ(params: SearchFAQParams): Promise<FAQSearchResult[]>;
export {};
//# sourceMappingURL=search-faq.d.ts.map