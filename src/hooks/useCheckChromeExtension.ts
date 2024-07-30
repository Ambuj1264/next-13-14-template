import { useState, useEffect } from "react";

type ExtensionCheckResult = "installed" | "not-installed" | "checking";

const useCheckChromeExtension = (
  extensionId: string,
  resourcePath: string = "/index.html",
): [ExtensionCheckResult] => {
  const [result, setResult] = useState<ExtensionCheckResult>("checking");

  useEffect(() => {
    fetch(`chrome-extension://${extensionId}${resourcePath}`)
      .then((response) => {
        if (response.ok) {
          setResult("installed");
        } else {
          setResult("not-installed");
        }
      })
      .catch(() => {
        setResult("not-installed");
      });
  }, [extensionId, resourcePath]);

  return [result];
};

export default useCheckChromeExtension;
