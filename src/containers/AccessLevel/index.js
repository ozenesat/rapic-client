import { Text, RadioWrapper } from "pagestyles/projects/auth/auth.style";

import Radio from "common/src/components/Radio";

function AccessLevel({ onChange, authMethod, endPoint }) {
  // Purpose of this if statement is to check if this radio belongs to endPoint or Project
  if(endPoint) {
    return (
      <>
      <Text>Control access to your Rapic API endpoints: </Text>
      <RadioWrapper value={authMethod}>
        <Radio
          labelText="Anyone"
          className="radio"
          isChecked={authMethod === "ANYONE" || authMethod === "PUBLIC"}
          onChange={() => onChange("ANYONE")}
        />
        <Radio
          labelText="Owner"
          className="radio"
          isChecked={authMethod === "AUTHENTICATED"}
          onChange={() => onChange("AUTHENTICATED")}
        />
      </RadioWrapper>
    </>
    );
    // else means project here.
  } else {
    return (
      <>
        <Text>Control access to your Rapic API endpoints: </Text>
        <RadioWrapper>
          <Radio
            labelText="Public"
            className="radio"
            isChecked={authMethod === "ANYONE" || authMethod === "PUBLIC"}
            onChange={() => onChange("ANYONE")}
          />
          <Radio
            labelText="JWT Authentication"
            className="radio"
            isChecked={authMethod === "AUTHENTICATED"}
            onChange={() => onChange("AUTHENTICATED")}
          />
        </RadioWrapper>
      </>
    );
  }
}

export default AccessLevel;
