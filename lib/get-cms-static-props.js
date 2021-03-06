import config from '../config'

export default async (Page, extraProps) => {
  const WP_URL = process.env.WP_URL || config.wpApiEndpoint
  const ReactDOMServer = require('react-dom/server')
  const fetch = require('node-fetch')

  const props = { __next_ssg_data: {}, ...extraProps }
  const pendingPromises = {}

  while (true) {
    global.__next_ssg_requests = []
    ReactDOMServer.renderToStaticMarkup(<Page  {...props} />)

    // all data dependencies resolved
    if (!global.__next_ssg_requests.length) break

    // dedupe requests
    const endpoints = Array.from(new Set(global.__next_ssg_requests))

    try {
      // fetch data and set the data, render again
      await Promise.race(endpoints.map((endpoint) => {
        if (!pendingPromises[endpoints]) {
          pendingPromises[endpoint] = fetch(WP_URL + endpoint)
            .then(res => {
              if (!res.ok) {
                delete pendingPromises[endpoint]
                throw res.status
              }
              return res.json()
            })
            .then(data => {
              props.__next_ssg_data[endpoint] = data
              delete pendingPromises[endpoint]
            })
        }
        return pendingPromises[endpoint]
      }))
    } catch (err) {
      // errored when fetching data
      // return the error page
      return { __next_ssg_error: err }
    }
  }

  return props
}
