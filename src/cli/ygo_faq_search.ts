#!/usr/bin/env node
import { searchFAQ } from '../search-faq.js'

const args = process.argv.slice(2)

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: ygo_faq_search <params_json> [options]

Search FAQ database by various criteria.

Search Examples:
  ygo_faq_search '{"faqId":10}'
  ygo_faq_search '{"cardId":6808,"limit":5}'
  ygo_faq_search '{"cardName":"青眼*","limit":10}'
  ygo_faq_search '{"cardFilter":{"race":"dragon","levelValue":"8"},"limit":5}'
  ygo_faq_search '{"question":"*シンクロ召喚*"}'
  ygo_faq_search '{"answer":"効果を無効化"}'

Output Options:
  --fcol a,b,c        FAQ columns (faqId,question,answer,updatedAt)
  --col a,b,c         Card columns (cardId,name,atk,def,race,text,etc.)
  --format FORMAT     Output format: json|csv|tsv|jsonl (default: json)
  --random            Randomly select from results
  --range start-end   Filter by FAQ ID range
  --all               Return all results (with --range)

Examples with Options:
  ygo_faq_search '{"cardId":6808}' --fcol faqId,question
  ygo_faq_search '{"cardId":6808}' --col name,atk,def
  ygo_faq_search '{"cardId":6808}' --fcol faqId,updatedAt --col name
  ygo_faq_search '{"cardName":"青眼*"}' --format csv
  ygo_faq_search '{"cardFilter":{"race":"dragon"}}' --random --limit 5

Parameters (JSON):
  faqId         - Search by FAQ ID
  cardId        - Search by card ID (finds FAQs mentioning this card)
  cardName      - Search by card name (supports wildcards with *)
  cardFilter    - Search by card specs (e.g., {"race":"dragon","levelValue":"8"})
  question      - Search in question text (supports wildcards)
  answer        - Search in answer text (supports wildcards)
  limit         - Maximum results (default: 50)
  flagAllowWild - Enable wildcard search (default: true)
`)
  process.exit(0)
}

const params = JSON.parse(args[0])

// Import search function dynamically to access formatOutput
import('../search-faq.js').then(async (module) => {
  const { searchFAQ } = module
  
  // Parse CLI options (delegate to search-faq.ts for now)
  // Just pass through to node dist/search-faq.js with all args
  const { spawn } = await import('child_process')
  const path = await import('path')
  const url = await import('url')
  
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const searchScript = path.join(__dirname, '../search-faq.js')
  
  const child = spawn('node', [searchScript, ...process.argv.slice(2)], { 
    stdio: 'inherit' 
  })
  
  child.on('close', (code) => {
    process.exit(code || 0)
  })
}).catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
