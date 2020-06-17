import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;
  border-radius: 10px;
`;
export const Loading = () => (
  <LoadingContainer>
    <ReactLoading
      type="spin"
      color="#32c02f"
      height={50}
      width={50}
      className="loading"
    />
  </LoadingContainer>
);
