import { Text, RadioWrapper } from "pagestyles/projects/auth/auth.style";

import Radio from "common/src/components/Radio";

function AccessLevel({ onChange, authMethod, endPoint }) {

  if(endPoint) {
    return (
      <>
      <Text>Control access to your Rapic API endpoints: </Text>
      <RadioWrapper>
        <Radio
          labelText="Anyone"
          className="radio"
          isChecked={authMethod === "public" || authMethod === "undefined"}
          onChange={() => onChange("public")}
        />
        <Radio
          labelText="Owner"
          className="radio"
          isChecked={authMethod === "authenticated"}
          onChange={() => onChange("authenticated")}
        />
      </RadioWrapper>
    </>
    );
  } else {
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
            labelText="JWT Authentication"
            className="radio"
            isChecked={authMethod === "authenticated"}
            onChange={() => onChange("authenticated")}
          />
        </RadioWrapper>
      </>
    );
  }
}

export default AccessLevel;
