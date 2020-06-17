import { Text, RadioWrapper } from "pagestyles/projects/auth/auth.style";

import Radio from "common/src/components/Radio";

function AccessLevel({ onChange, authMethod }) {
  return (
    <>
      <Text>Control access to your Rapic API endpoints: </Text>
      <RadioWrapper>
        <Radio
          labelText="Public"
          className="radio"
          isChecked={authMethod === "public" || authMethod === "undefined"}
          onChange={() => onChange("public")}
        />
        <Radio
          labelText="Authenticated"
          className="radio"
          isChecked={authMethod === "authenticated"}
          onChange={() => onChange("authenticated")}
        />
        <Radio
          labelText="Owner"
          className="radio"
          isChecked={authMethod === "owner"}
          onChange={() => onChange("owner")}
        />
      </RadioWrapper>
    </>
  );
}

export default AccessLevel;
