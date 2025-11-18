#!/usr/bin/env node
import { searchFAQ } from '../search-faq.js'

const args = process.argv.slice(2)

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: ygo_faq_search <params_json> [options]

Search FAQ database by various criteria.

Examples:
  ygo_faq_search '{"faqId":10}'
  ygo_faq_search '{"cardId":6808,"limit":5}'
  ygo_faq_search '{"cardName":"青眼の白龍","limit":5}'
  ygo_faq_search '{"cardName":"青眼*","limit":10}'
  ygo_faq_search '{"cardFilter":{"race":"dragon","levelValue":"8"},"limit":5}'
  ygo_faq_search '{"question":"シンクロ召喚"}'
  ygo_faq_search '{"answer":"効果を無効化"}'
  ygo_faq_search '{"question":"*墓地*","limit":10}'

Parameters (JSON):
  faqId         - Search by FAQ ID
  cardId        - Search by card ID (finds FAQs mentioning this card)
  cardName      - Search by card name (supports wildcards with *)
  cardFilter    - Search by card specs (e.g., {"race":"dragon","levelValue":"8"})
  question      - Search in question text (supports wildcards)
  answer        - Search in answer text (supports wildcards)
  limit         - Maximum results (default: 50)
  flagAllowWild - Enable wildcard search (default: true)

Returns:
  JSON array of FAQ records with embedded card information
`)
  process.exit(0)
}

const params = JSON.parse(args[0])

searchFAQ(params)
  .then(results => {
    console.log(JSON.stringify(results, null, 2))
  })
  .catch(err => {
    console.error('Error:', err.message)
    process.exit(1)
  })
