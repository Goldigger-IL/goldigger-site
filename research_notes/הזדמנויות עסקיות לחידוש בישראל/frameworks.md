# Evaluation frameworks from four sources (Gurley, Graham, Mauboussin & Callahan, S&P DJI) — extraction and consolidated scoring checklist

> **READ THIS FIRST — access status.** None of the four primary documents could be opened in this session. All four hosts were refused by the session's network policy, and the web-search budget ran out part-way through. What follows is therefore split into two evidence grades, and every item carries one of them:
>
> - **[S] = search-excerpt.** Text or facts that a web search returned in this session, either as a quoted fragment of the primary document or from a named secondary page. These are short fragments relayed by a search tool, not a reading of the full document.
> - **[R] = researcher recall, NOT verified in this session.** Content the researcher knows from prior familiarity with the text but could not check against the source today. Wording may be inexact. Treat as a to-verify list, not as a quotation.
>
> Nothing below was read end-to-end from a primary source. Page numbers are not given because no page was seen.
>
> **Citation caveat.** The search tool returned fragments together with a list of result pages, and often did not say which page a given fragment came from. Where that happened the citation names the most likely page or pages from that result list; the link shows where to look, not a page the researcher opened.

---

## Key question 5 (placed first because it governs everything else): which versions were accessed, and how

### Takeaway
Zero of the four primary documents were fetched; the notes rest on search-engine excerpts ([S]) plus clearly separated unverified recall ([R]). To get a faithful extraction, four hosts must be allowed in the session's network settings and the extraction re-run.

### Cited Findings
- Direct download (curl) of all four URLs failed with a proxy policy refusal ("CONNECT tunnel failed, response 403"); the fetch tool failed for all four with "host ... outside the session's allowed network domains". Hosts that need to be allowed: `abovethecrowd.com`, `irp-cdn.multiscreensite.com`, `www.morganstanley.com`, `www.spglobal.com`. — session tool output, no URL
- The session's environment ("Default") has limited network access with an empty allowed-hosts list, so no mirror or cached copy on any other ordinary website could be fetched either. — session tool output, no URL
- Web search worked for 12 queries, then returned "this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)". Seven planned verification searches (Graham's quantitative criteria and chapter-20 principles, the full Mauboussin checklist, S&P results tables, Gurley factor details) were not performed. — session tool output, no URL
- Search results showed that candidate mirrors exist (not fetched, not verified as identical): a Readwise-hosted copy of the Morgan Stanley PDF — [Readwise copy](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/measuring-the-moat/article_measuringthemoat.pdf); a markdown copy of the Gurley essay — [brandondonnelly.com](https://brandondonnelly.com/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces.md); the 2002 CSFB original of Measuring the Moat — [safalniveshak copy](https://www.safalniveshak.com/wp-content/uploads/2012/07/Measuring-The-Moat-CSFB.pdf); the November 2016 edition — [sorfis copy](https://sorfis.com/wp-content/uploads/2021/09/Measuring-the-Moat-Mauboussin-November-2016-update.pdf); Spanish and Portuguese versions of the S&P paper — [ES](https://www.spglobal.com/spdji/es/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats-es.pdf), [PT](https://www.spglobal.com/spdji/pt/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats-pt.pdf).
- "Measuring the Moat" exists in several editions: a 2002 CSFB study (search result title shows "16 December 2002"), a 2016 edition, and the Counterpoint Global / Morgan Stanley version dated October 15, 2024 by Mauboussin and Callahan. The URL assigned is the 2024 edition. — [Morgan Stanley PDF](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf); [CSFB 2002 copy](https://www.safalniveshak.com/wp-content/uploads/2012/07/Measuring-The-Moat-CSFB.pdf)

### Inferences
- Because [S] items are fragments chosen by a search tool, even they can be out of context; [R] items are the weakest. The consolidated checklist at the end marks each question with its grade so the report writer can decide what to rely on.
- The Mauboussin checklist recalled under [R] comes from the researcher's memory of the Credit Suisse 2013/2016 editions; the 2024 edition's appendix may word or order questions differently.

### Gaps
- The edition of the Intelligent Investor PDF at the assigned URL (e.g. whether it is the revised edition with Jason Zweig's commentary) could not be determined — the file was never opened.
- No quantitative table from any source was seen directly.
- Fix: allow the four hosts above (or the mirrors), then re-run; pdftotext is installed and ready.

---

## Key question 1 — Gurley: the 10 factors, how he explains each, and his examples

### Takeaway
The ten factors, in order, are: (1) New Experience vs. the Status Quo, (2) Economic Advantages vs. the Status Quo, (3) Opportunity for Technology to Add Value, (4) High Fragmentation, (5) Friction of Supplier Sign-Up, (6) Size of the Market Opportunity, (7) Expand the Market, (8) Frequency, (9) Payment Flow, (10) Network Effects. "Take rate / rake" and "friendliness of incumbents" are **not** standalone factors in this list; the brief's example wording does not match the essay on those two points.

### Cited Findings
- [S] The essay is Bill Gurley's November 13, 2012 post on Above the Crowd. Its premise: some industries are much more susceptible to the arrival and success of online marketplaces than others, and a true marketplace needs natural pull on both the consumer and the supplier side. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] The ten-item list and its order (as given in the Takeaway) were confirmed by the search tool against Andrew Chen's roundup and Matt Collins's 2015 summary, both attributing it to the 2012 post. The exact heading wording was not confirmed against the original page. — [Andrew Chen](https://andrewchen.com/marketplace-startups-best-essays/); [Matt Collins](https://www.mattcollins.net/2015/08/7-frameworks-for-evaluating-online-marketplaces)
- [S] Factor 1, New Experience vs. the Status Quo: "Great marketplaces do not simply aggregate a market; they enhance it. They leverage the connective tissue to offer the consumer a user experience that simply was not possible before the arrival of this new intermediary." — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 2, Economic Advantages vs. the Status Quo: with Airbnb, the host's income is "found money" that simply did not exist prior to the marketplace, and in many cases the consumer receives a better price as well (relayed through a secondary summary). — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/); [FourWeekMBA summary](https://fourweekmba.com/two-sided-marketplace/)
- [S] Factor 3, Opportunity for Technology to Add Value: Zillow provides homebuyers with an abundance of data that was historically kept in proprietary systems; facilitating work-flow reduces work for the participants and also increases switching costs. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 4, High Fragmentation: the successful Benchmark investments share a common theme of a fragmented supplier base. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 5, Friction of Supplier Sign-Up: the only confirmed fragment is that in some markets signing up suppliers is relatively easy, i.e. ease of onboarding varies by market. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 6, Size of the Market Opportunity: a proper TAM analysis is imperative, but it is easy to make mistakes looking only at TAM; "As a starter, if all the other factors are negative, it will not matter that the market is large." — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 7, Expand the Market: certain marketplaces do expand the market, by exploring new price points or enhancing convenience or usability. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 8, Frequency: "All things being equal, a higher frequency is obviously better. Yelp, GrubHub, OpenTable, 1stdibs (for the designer) and Uber are all high frequency use cases"; many failed marketplaces attack purchasing cycles that are simply way too infrequent. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 9, Payment Flow: "All things being equal, being part of the payment flow is superior to not being a part of the payment flow." — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [S] Factor 10, Network Effects: the test is "Can the marketplace provide a better experience to customer 'n+1000' than it did to customer 'n'" as a direct function of the added participants. — [Above the Crowd](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)

### Inferences
- The framework is two-sided by construction: each factor is to be judged for both the buyer side and the supplier side (follows from the "natural pull on both sides" premise and the Airbnb example where both sides gain).
- Gurley treats market size as necessary but subordinate: a large TAM does not rescue a market that fails the other nine tests (directly from the factor 6 quote).
- For a non-marketplace business the factors that transfer most directly are 1, 2, 3, 4, 6, 7 and 8; factors 5, 9 and 10 are specific to intermediaries.

### Gaps
- The full explanation and example set for each factor were not read. The following is **[R] unverified recall**, to be checked against [the original](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/):
  - [R] Factor 1 examples: Uber versus hailing a taxi (button press, visible arrival, no payment step at the end) and OpenTable versus telephoning a restaurant (instant confirmed booking at any hour).
  - [R] Factor 2: the strongest marketplaces offer an economic gain to both sides; for suppliers the gain is typically incremental demand or higher utilisation.
  - [R] Factor 3: OpenTable replacing the paper reservation book with its electronic reservation system as the workflow example; Uber's use of smartphone GPS.
  - [R] Factor 4: high fragmentation on both supplier and buyer sides is a major positive; a concentrated supplier base is a negative because large suppliers resist an intermediary and are unwilling to share economics.
  - [R] Factor 5: lower sign-up friction is better (Yelp could list businesses without their action); OpenTable's sign-up was high-friction (installing a system in each restaurant), which slowed growth but later acted as a barrier against competitors.
  - [R] Factor 7: Uber cited as expanding the market beyond existing taxi use, through new use cases.
  - [R] Factor 9: marketplaces in the payment flow (e.g. Uber, Airbnb, GrubHub) can take their fee before the supplier is paid and so sustain a higher rake; those outside it (e.g. OpenTable, Yelp, Zillow) must invoice suppliers, who then see the fee as a cost.
  - [R] Factor 10: Uber's loop — more drivers, shorter pickup times and wider coverage, more riders.
- [R] "Rake" (take rate) is discussed inside the payment-flow factor and at length in a separate, later Gurley post ("A Rake Too Far", 2013), which is outside the four assigned sources. Not verified.
- No source found in this session lists "friendliness of incumbents" as one of the ten factors.
- The essay's concluding remarks, and whether Gurley ranks or weights the factors, were not retrieved.

---

## Key question 2 — Graham: principles relevant to an owner-operator, and his quantitative criteria

### Takeaway
Only the chapter-20 framing was confirmed this session: investment "is most intelligent when it is most businesslike", and the first business principle is "Know what you are doing—know your business." All of Graham's quantitative criteria below are unverified recall [R] because the PDF was unreachable and the search budget ran out before they could be checked.

### Cited Findings
- [S] Chapter 20 is titled "'Margin of Safety' as the Central Concept of Investment". — [Medium chapter summary](https://medium.com/the-intelligent-investor-series/chapter-20-the-margin-of-safety-as-a-central-concept-of-investment-2f617ed997d6); [GuruFocus chapter review](https://www.gurufocus.com/news/707199/the-intelligent-investor-chapter-20-reviewed)
- [S] "Investment is most intelligent when it is most businesslike." — [GuruFocus chapter review](https://www.gurufocus.com/news/707199/the-intelligent-investor-chapter-20-reviewed); [quotation page](https://deautorefinanceloans.blogspot.com/2012/05/benjamin-graham-on-investment.html)
- [S] "And if a person sets out to make profits from security purchases and sales, he is embarking on a business venture of his own, which must be run in accordance with accepted business principles if it is to have a chance of success." — [GuruFocus chapter review](https://www.gurufocus.com/news/707199/the-intelligent-investor-chapter-20-reviewed); [quotation page](https://deautorefinanceloans.blogspot.com/2012/05/benjamin-graham-on-investment.html)
- [S] "The first and most obvious of these principles is, 'Know what you are doing—know your business.'" — [GuruFocus chapter review](https://www.gurufocus.com/news/707199/the-intelligent-investor-chapter-20-reviewed); [quotation page](https://deautorefinanceloans.blogspot.com/2012/05/benjamin-graham-on-investment.html)
- [S] "For the investor this rule should determine the conditions under which he will permit someone else to decide what is done with his money." The search tool attached this sentence to the first principle; the researcher's recall is that it belongs to the second principle (not letting anyone else run your business). Conflict noted, unresolved. — [GuruFocus chapter review](https://www.gurufocus.com/news/707199/the-intelligent-investor-chapter-20-reviewed); [quotation page](https://deautorefinanceloans.blogspot.com/2012/05/benjamin-graham-on-investment.html)
- [S] Chapter 20 closes: "To achieve satisfactory investment results is easier than most people realize; to achieve superior results is harder than it looks." — [GuruFocus chapter review](https://www.gurufocus.com/news/707199/the-intelligent-investor-chapter-20-reviewed); [quotation page](https://deautorefinanceloans.blogspot.com/2012/05/benjamin-graham-on-investment.html)

### Inferences
- Graham's chapter-20 principles are written as rules for running a business and then applied to securities, so they transfer to an owner-operator without translation: know the trade, control who runs it, enter only on arithmetic, act on your own analysis.
- His stock-selection numbers (size, current ratio, earnings record, price multiples) were written for buying listed shares. For an entrepreneur they are usable in two ways only: as a test when **buying** an existing business, and as a picture of what a financially sound business in the target industry looks like. Applying them to a start-up idea is the researcher's adaptation, not Graham's claim.

### Gaps
The following are **[R] unverified recall** of the text, to be checked against [the assigned PDF](https://irp-cdn.multiscreensite.com/cb9165b2/files/uploaded/The%20Intelligent%20Investor%20-%20BENJAMIN%20GRAHAM.pdf). Chapter numbers refer to the fourth revised edition as the researcher remembers it.

- [R] **Investment vs. speculation (ch. 1):** "An investment operation is one which, upon thorough analysis promises safety of principal and an adequate return. Operations not meeting these requirements are speculative."
- [R] **Growth is not profit (Introduction):** obvious prospects for physical growth in a business do not translate into obvious profits for investors (airlines given as the example), and experts have no dependable way of selecting the most promising companies in the most promising industries.
- [R] **Defensive vs. enterprising (Introduction, ch. 4):** the defensive investor's chief emphasis is avoiding serious mistakes or losses, then freedom from effort and frequent decisions; the enterprising investor is defined by willingness to devote time and care to selecting securities that are both sound and more attractive than the average. The return sought should depend on the amount of intelligent effort the investor is willing and able to bring to bear, not on how much risk he is willing to run.
- [R] **Defensive investor's four rules for common stocks (ch. 5):** (1) adequate but not excessive diversification, about 10 to 30 issues; (2) each company large, prominent and conservatively financed; (3) a long record of continuous dividend payments; (4) a price limit of 25 times average earnings of the past seven years and 20 times the last twelve months. "Conservatively financed" for an industrial company: common stock at book value at least half of total capitalisation including bank debt.
- [R] **Seven statistical criteria for the defensive investor (ch. 14):**
  1. Adequate size: not less than $100 million annual sales for an industrial company; not less than $50 million total assets for a public utility (1970s dollars).
  2. Sufficiently strong financial condition: current assets at least twice current liabilities; long-term debt not exceeding net current assets (working capital). For utilities, debt not exceeding twice stock equity at book value.
  3. Earnings stability: some earnings for the common stock in each of the past ten years.
  4. Dividend record: uninterrupted payments for at least the past 20 years.
  5. Earnings growth: at least a one-third increase in per-share earnings over the past ten years, using three-year averages at the beginning and end.
  6. Moderate price/earnings ratio: price not more than 15 times average earnings of the past three years.
  7. Moderate ratio of price to assets: price not more than 1.5 times last reported book value; alternatively the product of the earnings multiple and the price-to-book ratio should not exceed 22.5.
- [R] **Enterprising investor's screen (ch. 15):** start from a low earnings multiple (single-digit), then require: (1) current assets at least 1.5 times current liabilities and debt not more than 110% of net current assets (industrials); (2) no deficit in the last five years; (3) some current dividend; (4) last year's earnings above those of a base year several years earlier; (5) price less than 120% of net tangible assets.
- [R] **Bargain definition (ch. 7):** an issue is not a true bargain unless the indicated value is at least 50% more than the price. Enterprising policies must be both inherently sound and not popular on Wall Street.
- [R] **Mr. Market (ch. 8):** the investor is cast as part-owner of a private business whose partner, Mr. Market, quotes a price every day at which he will buy or sell; the owner is free to ignore him. Price fluctuations have one significant meaning for the true investor: an opportunity to buy wisely when prices fall sharply and sell wisely when they advance a great deal. An investor who lets himself be stampeded by unjustified declines turns his basic advantage into a basic disadvantage. Graham also suggests favouring purchases priced not more than about one-third above tangible asset value.
- [R] **Not overpaying for growth (ch. 11):** value = current normal earnings × (8.5 + 2 × expected annual growth rate), the growth rate being that expected over the next seven to ten years; Graham presents it with caution. Factors he lists as governing the capitalisation rate: general long-term prospects, management, financial strength and capital structure, dividend record, current dividend rate.
- [R] **Margin of safety (ch. 20):** the secret of sound investment distilled into three words is "margin of safety". For bonds it is past earnings well in excess of interest requirements (a railroad should have earned total fixed charges better than five times before income tax over a period of years), or enterprise value well above debt (a business owing $10 million and worth $30 million can shrink two-thirds before bondholders lose). For stocks it is earning power considerably above the going bond rate (his illustration: 9% earning power on price against a 4% bond rate leaves a 5% annual margin, which over ten years may aggregate 50% of the price paid). "The margin of safety is always dependent on the price paid." Its function is "rendering unnecessary an accurate estimate of the future." It must be demonstrable by figures, persuasive reasoning and reference to actual experience. It is tied to diversification.
- [R] **Where losses come from (ch. 20):** the chief losses come from buying low-quality securities at times of favourable business conditions, when buyers take current good earnings for "earning power" and assume prosperity is synonymous with safety. The danger of a growth-stock programme is that the market sets prices not adequately protected by a conservative projection of future earnings.
- [R] **The four business principles (ch. 20), items 2 to 4:**
  2. "Do not let anyone else run your business, unless (1) you can supervise his performance with adequate care and comprehension or (2) you have unusually strong reasons for placing implicit confidence in his integrity and ability."
  3. "Do not enter upon an operation—that is, manufacturing or trading in an item—unless a reliable calculation shows that it has a fair chance to yield a reasonable profit. In particular, keep away from ventures in which you have little to gain and much to lose." Operations for profit should be based "not on optimism but on arithmetic."
  4. "Have the courage of your knowledge and experience. If you have formed a conclusion from the facts and if you know your judgment is sound, act on it—even though others may hesitate or differ." You are neither right nor wrong because the crowd disagrees with you; you are right because your data and reasoning are right.
- [R] First principle's elaboration: do not try to make "business profits" out of securities unless you know as much about security values as you would need to know about the value of merchandise you proposed to manufacture or deal in.
- Not retrieved at all: Graham's bond/preferred coverage table by industry (ch. 11), and any Zweig commentary, if this edition contains it.

---

## Key question 3 — Mauboussin & Callahan, "Measuring the Moat": structure and checklist

### Takeaway
The paper frames a moat as two-dimensional — the size of the positive ROIC-minus-WACC spread and how long it lasts — and works from industry analysis down to firm-specific sources of added value (production, consumer and government advantages), ending in a value-creation checklist. Roughly half the checklist was confirmed by search excerpts; the rest is unverified recall of an earlier edition.

### Cited Findings
- [S] Edition: Counterpoint Global Insights, "Measuring the Moat: Assessing the Magnitude and Sustainability of Value Creation", Mauboussin and Callahan, dated October 15, 2024. — [Morgan Stanley PDF](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf)
- [S] Core framing: strategy explains how a company achieves sustainable value creation; one dimension measures the magnitude of the positive spread between ROIC and WACC, the other how long the company can earn that spread. — [Morgan Stanley PDF](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf)
- [S] Fade: high returns on investment and rapid investment growth are associated with sharp declines in subsequent returns on investment; as markets mature rivals often pursue share gains, which is zero-sum; best practices diffuse over time. — [Morgan Stanley PDF](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf)
- [S] Sources of added value: "three broad sources of added value: production advantages, consumer advantages, and external advantages", the last being "external (i.e., government) advantages". Production advantages concern cost and are split into process and scale economies. Consumer advantages concern willingness to pay and "generally appear in the form of high gross margins". Network effects arise "when the value of a good or service increases as more people use it". — [Morgan Stanley PDF](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf); [CSFB 2002 copy](https://www.safalniveshak.com/wp-content/uploads/2012/07/Measuring-The-Moat-CSFB.pdf)
- [S] Brands: brands do not confer competitive advantage in and of themselves; they add value only if they raise willingness to pay or lower the cost of providing the product. Customers "hire" brands to do a specific job; brands that do those jobs reliably and cost-effectively thrive. — [Morgan Stanley PDF](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf)
- [S] Asset specificity takes site, physical, dedicated and human forms; assets are specific if they are hard to deploy elsewhere. Complementors are companies that sell a good or service that complements the good or service of another firm. — [CSFB 2002 copy](https://www.safalniveshak.com/wp-content/uploads/2012/07/Measuring-The-Moat-CSFB.pdf); [Readwise copy of 2024 edition](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/measuring-the-moat/article_measuringthemoat.pdf)
- [S] The paper includes a framework for disruption. — [Readwise copy of 2024 edition](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/measuring-the-moat/article_measuringthemoat.pdf)
- [S] **Checklist content confirmed by search excerpts** (topics confirmed; exact question wording mostly not):
  - Opening: stage of the competitive life cycle; whether returns exceed the cost of capital. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - Lay of the Land: each player's share of the industry; each player's level of profitability; historical trends in market share; industry and market-share stability; pricing trends. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - The First Three of the Five Forces: supplier leverage; whether supplier cost increases can be passed to customers; availability of substitutes; switching costs; buyer leverage; how informed buyers are. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - Barriers to Entry: entry and exit rates; asset specificity; minimum efficient production scale; excess capacity; whether incumbents have precommitment contracts. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - Rivalry: pricing coordination; industry concentration; size distribution of firms; similarity of firms in incentives, corporate philosophy and ownership structure; demand variability; high fixed costs; whether the industry is growing. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - Firm Specific: geographic clustering of assets and revenue; purchasing advantages with size; economies of scope; consumer advantages; customer lock-in and switching costs; source and longevity of added value. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - Firm interaction: whether the industry includes complementors. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)
  - Brands: the search tool reported questions on loyalty, status, prestige, habit and lower search costs, but flagged this as likely a third-party paraphrase. — [hurricanecapital reproduction](https://hurricanecapital.wordpress.com/tag/measuring-the-moat/); [Old School Value reproduction](https://www.oldschoolvalue.com/stock-analysis/value-creation-checklist-measuring-the-moat/)

### Inferences
- The checklist is ordered from outside in: industry economics first, then the forces that erode returns, then what the specific firm does differently. For a would-be entrant the first blocks (lay of the land, five forces, barriers, rivalry) answer "is this industry worth entering"; the firm-specific block answers "what moat could I build".
- Because consumer advantages "generally appear in the form of high gross margins", Mauboussin's qualitative category and S&P's gross-margin metric (key question 4) are measuring the same thing from two directions.
- A new entrant reads the barriers block in reverse: every barrier that protects incumbents is a cost the entrant must pay.

### Gaps
The following is **[R] unverified recall**, drawn from the researcher's memory of the Credit Suisse 2013/2016 editions; the 2024 edition at [the assigned URL](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf) may differ in wording, order and additions.

- [R] **Paper structure:** introduction and competitive life cycle; industry analysis — getting the lay of the land (industry map, profit pool, market-share stability, pricing trends, industry classification); industry structure via Porter's five forces; entry and exit; rivalry; disruption and disintegration; firm-specific analysis — a framework for added value, the value chain, sources of added value (production advantages, consumer advantages, government); firm interaction — competition and cooperation (game theory); brands; management skill and luck; bringing it together; Appendix A value-creation checklist; Appendix B profit-pool charts by industry.
- [R] **Industry tools:** an industry map lists all players that affect profitability (including potential entrants); a profit pool plots each player's share of invested capital against its economic return (ROIC minus WACC) to show where value is created and destroyed; market-share stability is measured as the average absolute change in share over a period, with lower meaning more stable; ROIC is decomposed into margin and capital turnover — high margin with low turnover points to a consumer (differentiation) advantage, low margin with high turnover to a production (cost) advantage.
- [R] **Entry and exit:** cites research on U.S. manufacturing showing high churn — on the order of 30 to 45 entrants per 100 firms in a five-year period, with a similar number leaving, and roughly 60% of entrants gone within five years and about 80% within ten. Figures are from memory and need checking.
- [R] **Entry decision:** an entrant weighs the expected reaction of incumbents (driven by asset specificity, minimum efficient scale, excess capacity and incumbent reputation) and the expected payoff given barriers (precommitment contracts, licences and patents, learning-curve benefits, network effects).
- [R] **Disruption and disintegration:** Christensen's low-end and new-market disruption — sustaining innovation overshoots what customers need, opening room for cheaper "good enough" entrants; industries shift from vertically integrated to horizontal/modular structure once performance exceeds the threshold.
- [R] **Consumer advantages listed:** habit and high horizontal differentiation; experience goods; switching costs and customer lock-in; network effects, distinguished as radial (hub-and-spoke) versus interactive.
- [R] **Government:** subsidies, tariffs, quotas, and competitive or environmental regulation as external sources of added value.
- [R] **Appendix A checklist as remembered (to verify line by line):**
  - *Opening:* What stage of the competitive life cycle is the company in? Is the company currently earning a return above its cost of capital? Are returns on capital increasing, decreasing, or stable? Why? What is the trend in the company's investment spending?
  - *Lay of the Land:* What percentage of the industry does each player represent? What is each player's level of profitability? What have the historical trends in market share been? How stable is the industry? How stable is market share? What do pricing trends look like? What class does the industry fall into — fragmented, emerging, mature, declining, international, network, or hypercompetitive?
  - *The First Three of the Five Forces:* How much leverage do suppliers have? Can companies pass supplier increases to customers? Are there substitute products available? Are there switching costs? How much leverage do buyers have? How informed are the buyers?
  - *Barriers to Entry:* What are the entry and exit rates like in the industry? What are the anticipated reactions of incumbents to new entrants? What is the reputation of incumbents? What is the level of asset specificity? What is the minimum efficient production scale? Is there excess capacity in the industry? Is there a way to differentiate the product? What is the anticipated payoff for a new entrant? Do incumbents have precommitment contracts? Do incumbents have licenses or patents? Are there learning curve benefits in the industry?
  - *Rivalry:* Is there pricing coordination? What is the industry concentration? What is the size distribution of firms? How similar are the firms in incentives, corporate philosophy, and ownership structure? Is there demand variability? Are there high fixed costs? Is the industry growing?
  - *Disruption and Disintegration:* Is the industry vulnerable to disruptive innovation? Do new innovations foster product improvements? Is the innovation progressing faster than the market's needs? Have established players passed the performance threshold? Is the industry organized vertically, or has there been a shift to horizontal markets?
  - *Firm Specific:* Does analysis of the value chain reveal where the company does things differently than its rivals? Does the firm have production advantages? Is there instability in the business structure? Is there complexity requiring know-how or coordination capabilities? How quickly are the process costs changing? Does the firm have any patents, copyrights, trademarks, etc.? Are there economies of scale? What does the firm's distribution scale look like? Are assets and revenue clustered geographically? Are there purchasing advantages with size? Are there economies of scope? Are there diverse research profiles? Are there consumer advantages? Is there habit or horizontal differentiation? Do people prefer the product to competing products? Are there lots of product attributes that customers weigh? Can customers only assess the product through trial? Is there customer lock-in? Are there high switching costs? Is the network radial or interactive? What is the source and longevity of added value? Are there external sources of added value (subsidies, tariffs, quotas, and competitive or environmental regulations)?
  - *Firm Interaction — Competition and Cooperation:* Does the industry include complementors? Is the value of the pie growing because of companies that are not competitors, or are new companies taking share from a pie with fixed value?
  - *Brands:* Do customers want to "hire" the brand for the job to be done? Does the brand increase willingness to pay? Do customers have an emotional connection to the brand? Do customers trust the product because of the name? Does the brand imply social status? Can you reduce supplier operating cost with your name?
- Not retrieved: any 2024-edition data (fade charts, entry/exit statistics, industry ROIC spreads, profit-pool exhibits), and any new checklist items the 2024 edition added.

---

## Key question 4 — S&P DJI: quantitative moat metrics, methodology and results

### Takeaway
S&P identifies moat companies with three indicators — sustained high ROIC, sustained high gross margin, and high market share — converts them to z-scores, averages them into an "Economic Moat Score", and takes the top 50 S&P 500 companies, equally weighted. It is a **relative ranking**; no absolute threshold (such as "gross margin above X%") surfaced in any excerpt.

### Cited Findings
- [S] The paper's lead contributor is Rupert Watts, CFA, CAIA, Head of Factors and Dividends. It describes the S&P 500 Economic Moat Index, launched April 2024, which tracks S&P 500 companies identified as having a wide economic moat using a purely quantitative approach. — [S&P DJI paper](https://www.spglobal.com/spdji/en/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats.pdf)
- [S] The paper argues that determining a moat requires a comprehensive approach that goes beyond a single quantitative measure, and that metrics should be looked at over multiple periods. — [S&P DJI paper](https://www.spglobal.com/spdji/en/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats.pdf)
- [S] Three core metrics: high ROIC, high gross margins, high market share. On consistency: many companies can generate high returns in the short term, but doing so consistently indicates a wide moat, so the metrics are analysed over multiple periods. — [Indexology, 15 May 2024](https://www.indexologyblog.com/2024/05/15/identifying-economic-moats-using-a-quantitative-lens-the-sp-500-economic-moat-index/)
- [S] Gross margin: two measures are used — gross margin over the past 12 months and gross margin stability over the last 5 years. Purpose: to assess pricing power, i.e. companies able to charge a premium over the cost of production. — [Indexology, 5 June 2024](https://www.indexologyblog.com/2024/06/05/the-quantitative-metrics-for-identifying-an-economic-moat/)
- [S] Market share: a high share may indicate a strong moat from economies of scale, network effects and brand power, but the metric is most useful combined with others, since high share may not indicate high profitability or sustainable advantage. — [Indexology, 5 June 2024](https://www.indexologyblog.com/2024/06/05/the-quantitative-metrics-for-identifying-an-economic-moat/)
- [S] Index rules: starting universe is the S&P 500 excluding the GICS real estate sector; each security receives an Economic Moat score based on gross margin and the 5-year standard deviation of gross margin, the 5-year average of ROIC, and a market share score; the top 50 by score are selected and equally weighted; rebalanced and reconstituted semi-annually. — [index factsheet copy](https://www.scribd.com/document/907194272/Fs-Sp-500-Economic-Moat-Index-Usd)
- [S] The Economic Moat Score is the average of the three indicator z-scores. — [S&P DJI paper](https://www.spglobal.com/spdji/en/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats.pdf)
- [S] The Market Share Score is sourced from Syntax, a financial data company. For GICS financials, gross margin and its 5-year standard deviation are not calculated and are left out of the score. — [First Trust EMOT page](https://www.ftportfolios.com/Retail/etf/etfSummary.aspx?Ticker=EMOT)
- [S] Formulas, from a secondary summary only: ROIC = net income divided by the average of (total equity + total debt) across two periods, averaged over five years; gross margin = (revenue − cost of goods sold) / revenue. — [Finomenon summary](https://finomenon.us/economic-moat-investing-framework/)
- [S] Quintile tests (rebalanced semi-annually in June and December, like the index): long-term annualised returns rose steadily by quintile, with quintile 5 at 14.38% against 10.56% for quintile 1; for sustained gross margin, volatility fell as margin rose and risk-adjusted return improved from 0.48 (quintile 1) to 0.91 (quintile 5). The excerpt did not state which metric the 14.38%/10.56% pair belongs to. — [Indexology, 5 June 2024](https://www.indexologyblog.com/2024/06/05/the-quantitative-metrics-for-identifying-an-economic-moat/)
- [S] Back-test: over the full period starting June 30, 2013, the index outperformed the S&P 500 by 2.63% annualised; the back-test applies the methodology in effect at launch. — [Indexology, 15 May 2024](https://www.indexologyblog.com/2024/05/15/identifying-economic-moats-using-a-quantitative-lens-the-sp-500-economic-moat-index/)
- [S] A secondary source gives risk-adjusted return of 1.10 for the index against 0.91 for the S&P 500; not verified against S&P material. — [Finomenon summary](https://finomenon.us/economic-moat-investing-framework/)
- [S] Sector make-up: Consumer Staples and Consumer Discretionary have been the largest weights (from the Spanish-language version). — [S&P DJI paper, ES](https://www.spglobal.com/spdji/es/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats-es.pdf)
- [S] Later live figures from S&P's July 2026 factor dashboard: total return of 16.2% over 3 years, 13.0% over 5 years and 16.2% over 10 years (snapshot only; the excerpt did not say whether the figures are annualised). — [S&P factor dashboard](https://www.spglobal.com/spdji/en/documents/performance-reports/dashboard-sp-500-factor.pdf)

### Inferences
- For an entrepreneur the transferable part is the three tests and the insistence on persistence, not the index: does the business (or its best incumbents) show high gross margin now, has that margin been stable for five years, is return on invested capital high on a five-year average, and is share of the relevant market high alongside profitability.
- Since S&P ranks by z-score within the S&P 500, any numeric cut-off applied to Israeli small businesses would be the analyst's own choice and should be presented as such.
- S&P itself warns that market share alone is weak evidence; it should count only when margin and ROIC also hold.
- Back-tested index results are evidence that these traits coincided with better stock returns in U.S. large caps from 2013; they are not evidence about entry success for a new business.

### Gaps
- Not retrieved from the paper: the exact ROIC and market-share formulas as S&P states them, how the two gross-margin measures are combined, the full risk/return table (annualised return, volatility, drawdown by horizon), up/down capture, factor exposures, and turnover. The search tool reported that the paper has back-tested risk/return tables and drawdown exhibits but returned only captions.
- Which metric the 14.38% vs 10.56% quintile spread refers to (most likely sustained ROIC, unconfirmed).
- Authors other than Rupert Watts, and the paper's publication date, were not confirmed.
- The researcher has no reliable recall of this paper beyond the above, so no [R] block is offered.

---

## Consolidated scoring checklist (one page)

### Takeaway
The four sources combine into about forty questions under three headings. Each carries its source tag and evidence grade; the [R] questions should be confirmed against the primary text before the checklist is presented as source-faithful.

### Cited Findings
Source tags: **G#** = Gurley factor number — [essay](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/); **BG** = Graham — [PDF](https://irp-cdn.multiscreensite.com/cb9165b2/files/uploaded/The%20Intelligent%20Investor%20-%20BENJAMIN%20GRAHAM.pdf); **MM** = Mauboussin & Callahan — [paper](https://www.morganstanley.com/im/publication/insights/articles/article_measuringthemoat.pdf); **SP** = S&P DJI — [paper](https://www.spglobal.com/spdji/en/documents/research/research-a-systematic-approach-for-identifying-companies-with-economic-moats.pdf). Grade **S** or **R** as defined at the top.

**A. How attractive is the industry to enter?**

| # | Question to ask about the industry or idea | Source | Grade |
|---|---|---|---|
| A1 | Do today's players earn a return on capital above their cost of capital, and is that return rising, stable or falling? | MM | S |
| A2 | What share of the industry does each player hold, how profitable is each, and where does the profit actually sit? | MM | S |
| A3 | How stable have market shares been, and which way are prices trending? | MM | S |
| A4 | What stage of its life cycle is the industry in (and is it fragmented, emerging, mature or declining)? | MM | S (stage) / R (classes) |
| A5 | Is the industry growing — and is that growth turning into profit for the firms in it, or only into volume? | MM; BG | S; R |
| A6 | Is the supplier base fragmented (and the customer base too)? | G4 | S (supplier) / R (both sides) |
| A7 | Would my offer give customers an experience that was simply not possible before, rather than repackaging what exists? | G1 | S |
| A8 | Does each side — customer and supplier — come out economically ahead of the status quo (better price, "found money")? | G2 | S |
| A9 | Can technology add real value here: opening up data, removing work from participants' workflow? | G3 | S |
| A10 | How large is the addressable market — and do the other answers hold up, given that size alone does not rescue a weak market? | G6 | S |
| A11 | Can the offer expand the market through new price points, convenience or usability, rather than only take share? | G7 | S |
| A12 | How often does the customer buy? Is the purchase cycle frequent enough to build habit and repeat use? | G8 | S |
| A13 | Would I sit in the payment flow, or have to bill participants separately? | G9 | S |
| A14 | How hard is it to sign up suppliers or partners? | G5 | S (thin) |
| A15 | Does a reliable calculation, based on arithmetic rather than optimism, show a fair chance of a reasonable profit? | BG | R |

**B. Can a durable moat be built?**

| # | Question | Source | Grade |
|---|---|---|---|
| B1 | How large could the spread between return on invested capital and cost of capital be, and for how many years could it last? | MM | S |
| B2 | Is there a production (cost) advantage available — from process, or from scale in distribution, purchasing or scope? | MM | S |
| B3 | Is there a consumer advantage — willingness to pay above cost, showing up as high gross margin? | MM | S |
| B4 | Would customers face switching costs or lock-in, form a habit, or save search costs by staying? | MM | S (lock-in, switching) / R (habit, search as paper's terms) |
| B5 | Is there a network effect: will the thousandth-later customer get a better experience than today's customer because others joined? | G10; MM | S |
| B6 | Does a licence, regulation, subsidy, tariff or quota give external (government) protection — and how long will it last? | MM | S (category) / R (list) |
| B7 | What protects against entrants: specialised assets, a large minimum efficient scale, incumbents' long-term contracts, patents or licences, learning-curve gains? | MM | S (first three) / R (rest) |
| B8 | Does the brand raise willingness to pay or lower the cost of supply? If neither, it is not an advantage. | MM | S |
| B9 | Does the product embed itself in the customer's workflow so that leaving becomes costly? | G3 | S |
| B10 | If onboarding suppliers is hard, would that same difficulty protect me once I have done it? | G5 | R |
| B11 | Is gross margin high over the last twelve months and stable over five years (pricing power)? | SP | S |
| B12 | Is return on invested capital high on a five-year average, not just in one good year? | SP | S |
| B13 | Is market share high — and accompanied by high margin and return, since share alone proves little? | SP | S |
| B14 | Are there complementors whose growth enlarges the pie for me? | MM | S |

**C. How risky is it?**

| # | Question | Source | Grade |
|---|---|---|---|
| C1 | What are the entry and exit rates — how many newcomers survive? | MM | S |
| C2 | How will incumbents react to my entry, and what is their reputation for retaliating? Is there excess capacity? | MM | S (excess capacity) / R (reaction, reputation) |
| C3 | How much leverage do suppliers have, and can cost increases be passed to customers? | MM | S |
| C4 | How much leverage do buyers have, how well informed are they, and are there substitutes? | MM | S |
| C5 | How fierce is rivalry: is there pricing discipline, how concentrated is the industry, are fixed costs high, is demand volatile? | MM | S |
| C6 | Is a concentrated group of suppliers able to block or squeeze a newcomer? | G4 | R |
| C7 | Is the industry vulnerable to disruption — are current products overshooting what customers need, or is the value chain breaking apart? | MM | S (framework exists) / R (questions) |
| C8 | Are today's high returns likely to fade — high returns plus rapid investment growth tend to be followed by sharp declines? | MM | S |
| C9 | Do I truly know this business — as well as I would need to know merchandise I proposed to make or sell? | BG | S (principle) / R (elaboration) |
| C10 | Will anyone else run it for me — and if so, can I supervise them with care and comprehension, or do I have unusually strong reasons to trust them? | BG | R |
| C11 | Is this a venture with little to gain and much to lose? | BG | R |
| C12 | Is there a margin of safety: does the plan survive adverse developments without needing an accurate forecast of the future? | BG | R |
| C13 | Is the price I pay (to buy in or to build) low enough relative to demonstrable value — is the cushion shown by figures and experience, not hope? | BG | R |
| C14 | Am I judging earning power from a boom period, mistaking prosperity for safety? | BG | R |
| C15 | Is this investment or speculation — does thorough analysis promise safety of principal and an adequate return? | BG | R |
| C16 | Financial strength: are current assets at least twice current liabilities, and is long-term debt no more than working capital? | BG | R |
| C17 | Earnings record (when buying a business or studying comparables): profit in each of the last ten years, and no reliance on one good year? | BG | R |
| C18 | When buying: is the price no more than about 15 times three-year average earnings and 1.5 times book value (product no more than 22.5)? | BG | R |
| C19 | Would I ever be forced to sell at someone else's price, or can I ignore outside valuations and hold? | BG | R |
| C20 | Have I formed the conclusion from facts and sound reasoning, independent of whether the crowd agrees? | BG | R |

### Inferences
- Suggested use (researcher's convenience, **not from any of the four sources**): score each question 0 (unfavourable), 1 (mixed or unknown), 2 (favourable), and report three sub-totals rather than one number, because Gurley's own text says strength on one dimension (market size) cannot offset weakness on the rest.
- Questions A12–A14, B5 and B10 apply only to marketplace or platform ideas; for other businesses mark them not applicable instead of zero.
- Questions C16–C18 are Graham's tests for buying listed shares; they fit an acquisition of an existing Israeli business or a reading of comparable companies' accounts, and would need new thresholds for a start-up. His dollar size floors are 1970s U.S. figures and should not be carried over.
- None of the four sources addresses Israel; every application to the Israeli market is an extension by the analyst.

### Gaps
- 14 of the 49 questions rest wholly on unverified recall (every Graham question except the "know your business" principle and the shared growth question, plus Gurley's C6 and B10), and a further 9 are partly recalled. They need checking against the primary texts once the hosts are reachable.
- The checklist carries no weights because none of the sources supplies weights that span all four frameworks.
- Whether the 2024 Mauboussin edition adds checklist questions (for example on intangible-heavy businesses) is unknown.
