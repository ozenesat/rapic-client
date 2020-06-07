import styled from 'styled-components';

const Title = styled.span`
  font-family: DM Sans;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 17px;

  button: active {
    opacity: 0.6;
  }

  .project-name {
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: DM Sans;
  }

  .project-description {
    height: 40%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #create-project {
    margin-right: 20px;
    background-color: #32c02f;
  }
  #cancel {
    background-color: #69767e;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '50%',
  },
};

export { Title, Content, Section, ButtonWrapper, ModalStyles };
