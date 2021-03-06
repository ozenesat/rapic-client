import styled from 'styled-components';
import { themeGet } from 'styled-system';
import illustration from 'common/src/assets/image/app/features.png';
const Section = styled.div`
  background-image: url(${illustration});
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 100px 0 120px;
  @media screen and (max-width: 1440px) {
    padding: 50px 0 70px;
  }

  @media screen and (max-width: 480px) {
    padding: 30px 0 50px;
  }
`;

export const ServiceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1px;
  @media screen and (max-width: 411px) and (max-height: 823px) and (orientation: landscape) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (width: 1366px) and (max-height: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .react-reveal {
    border: 0px solid ${themeGet('colors.border')};
    box-sizing: content-box;
    width: 100%;
    height: 100%;
  }
  .serviceItem {
    padding: 50px 30px 60px;
    min-height: max-content;
    @media screen and (max-width: 480px) {
      padding: 25px 25px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    transition: 0.3s ease 0s;
    position: relative;
    &::before {
      background-color: #fff;
      position: absolute;
      content: '';
      right: -1px;
      bottom: -1px;
      left: -1px;
      top: -1px;
      z-index: -1;
      opacity: 0;
      transition: 0.3s ease 0s;
    }
    &:hover {
      box-shadow: 0px 20px 50px rgba(59, 90, 136, 0.05);
      padding: 50px 30px 10px;
      cursor: pointer;
      &::before {
        opacity: 0.9;
      }
    }
    .thumbnail {
      margin-bottom: 25px;
      text-align: center;
    }
    .title {
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      line-height: 30px;
      color: #000;
      @media screen and (max-width: 480px) {
        text-align: center;
      }
    }
    .content {
      text-align: center;
    }
    .excerpt {
      font-size: 18px;
      line-height: 21px;
      color: #475b5b;
      @media screen and (max-width: 480px) {
        text-align: center;
      }
    }
    .learn_more {
      @media screen and (max-width: 480px) {
        text-align: center;
      }
    }
    .learn_more a {
      font-weight: 500;
      font-size: 15px;
      line-height: 42px;
      display: inline-flex;
      align-items: center;
      color: ${themeGet('colors.linkColor')};
      @media screen and (max-width: 480px) {
        text-align: center;
      }
      i {
        line-height: 1;
        margin-left: 2px;
        transition: 0.3s ease 0s;
      }
      &:hover i {
        margin-left: 7px;
      }
    }
  }
`;

export default Section;
