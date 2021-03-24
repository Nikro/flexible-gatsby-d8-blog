import React, { useState } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
  Configure,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import Input from "./input"
import * as hitComps from "./hitComps"
import { HitsWrapper } from "./styles"

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    state && res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchState: state, searchResults: res }) =>
    res && res.nbHits > 0 && `, ${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

function Search({ indices, collapse, hitsAsGrid }) {
  const [query, setQuery] = useState(``)
  const [setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <Configure hitsPerPage={10} />
      <Input />
      <HitsWrapper show={query && query.length > 0} asGrid={hitsAsGrid}>
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header className={`major`}>
              <h4>{title}<Stats /></h4>
            </header>
            <Results>
              <div className="mini-posts">
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </div>
            </Results>
          </Index>
        ))}
      </HitsWrapper>
    </InstantSearch>
  )
}

export default Search