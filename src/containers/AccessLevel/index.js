import { useState } from "react";
import { useRouter } from "next/router";
import { Text, RadioWrapper } from "pagestyles/projects/auth/auth.style";

import Radio from "common/src/components/Radio";

function AccessLevel({ onChange, authMethod }) {
  const [authType, changeAuthType] = useState(convertAuthType(authMethod));

  function convertAuthType(type) {
    const types = {
      undefined: 1,
      public: 1,
      authenticated: 2,
      owner: 3,
    };
    return types[type];
  }

  function handleChange(value) {
    onChange(value);
    changeAuthType(convertAuthType(value));
  }

  return (
    <>
      <Text>Control access to your Rapic API endpoints: </Text>
      <RadioWrapper>
        <Radio
          labelText="Public"
          className="radio"
          isChecked={authType === 1}
          onChange={() => handleChange("public")}
        />
        <Radio
          labelText="Authenticated"
          className="radio"
          isChecked={authType === 2}
          onChange={() => handleChange("authenticated")}
        />
        <Radio
          labelText="Owner"
          className="radio"
          isChecked={authType === 3}
          onChange={() => handleChange("owner")}
        />
      </RadioWrapper>
    </>
  );
}

export default AccessLevel;
