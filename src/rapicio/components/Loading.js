import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 10px;
`;
export const Loading = () => (
  <LoadingContainer>
    <ReactLoading
      type="balls"
      color="#32c02f"
      height={100}
      width={100}
      className="loading"
    />
  </LoadingContainer>
);
