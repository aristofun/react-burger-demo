import React, {useEffect, useState} from "react";

/**
 * Universal HTTP error hook for axios
 * @param httpClient
 * @returns {[unknown, errorShown]}
 */
export default (httpClient) => {
  const [ error, setError ] = useState(null);

  const reqIC = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const respIC = httpClient.interceptors.response.use(null, err => {
    setError(err);
  });

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqIC);
      httpClient.interceptors.response.eject(respIC);
    }
  }, [ reqIC, respIC ]);

  const errorShown = () => {
    setError(null);
  };

  return [ error, errorShown ];
}