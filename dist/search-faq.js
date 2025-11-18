#!/usr/bin/env node
import { loadFAQIndex, getCardsByIds, extractCardReferences } from './utils/faq-loader.js';
function matchesQuery(text, normalized, query, flagAllowWild) {
    if (!query)
        return true;
    if (flagAllowWild && query.includes('*')) {
        const regex = new RegExp(query.split('*').map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*'), 'i');
        return regex.test(normalized);
    }
    return normalized.includes(query.toLowerCase());
}
async function enrichFAQWithCards(faq) {
    const questionRefs = extractCardReferences(faq.question);
    const answerRefs = extractCardReferences(faq.answer);
    const allCardIds = Array.from(new Set([
        ...questionRefs.map(r => r.cardId),
        ...answerRefs.map(r => r.cardId)
    ]));
    const cardsMap = await getCardsByIds(allCardIds);
    const questionCards = questionRefs
        .map(ref => cardsMap.get(ref.cardId))
        .filter(c => c !== undefined);
    const answerCards = answerRefs
        .map(ref => cardsMap.get(ref.cardId))
        .filter(c => c !== undefined);
    return {
        ...faq,
        questionCards,
        answerCards,
        allCardIds
    };
}
export async function searchFAQ(params) {
    const { faqId, cardId, question, answer, limit = 50, flagAllowWild = true } = params;
    const index = await loadFAQIndex();
    const results = [];
    if (faqId !== undefined) {
        const faq = index.byId.get(faqId);
        if (faq) {
            const enriched = await enrichFAQWithCards(faq);
            results.push({ faq: enriched });
        }
        return results;
    }
    if (cardId !== undefined) {
        const faqIds = index.byCardId.get(cardId) || [];
        for (const id of faqIds.slice(0, limit)) {
            const faq = index.byId.get(id);
            if (faq) {
                const enriched = await enrichFAQWithCards(faq);
                results.push({ faq: enriched });
            }
        }
        return results;
    }
    for (const [id, faq] of index.byId.entries()) {
        if (results.length >= limit)
            break;
        const norm = index.normalized.get(id);
        if (!norm)
            continue;
        let matches = true;
        if (question) {
            matches = matches && matchesQuery(faq.question, norm.question, question, flagAllowWild);
        }
        if (answer) {
            matches = matches && matchesQuery(faq.answer, norm.answer, answer, flagAllowWild);
        }
        if (matches) {
            const enriched = await enrichFAQWithCards(faq);
            results.push({ faq: enriched });
        }
    }
    return results;
}
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Usage: node search-faq.js <params_json>');
        console.error('Example: node search-faq.js \'{"cardId":6808}\'');
        console.error('Example: node search-faq.js \'{"question":"シンクロ召喚"}\'');
        process.exit(1);
    }
    try {
        const params = JSON.parse(args[0]);
        const results = await searchFAQ(params);
        console.log(JSON.stringify(results, null, 2));
    }
    catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}
//# sourceMappingURL=search-faq.js.map