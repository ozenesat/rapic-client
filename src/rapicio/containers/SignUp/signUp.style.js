import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from 'styled-system';
import illustration from 'common/src/assets/image/app/home2.gif';

const Section = styled.section`
  background-image: url(${illustration});
  background-color: transparent;
  background-size: 37%;
  background-position: right center;
  background-repeat: no-repeat;
  min-height: 70vh;
  @media only screen and (max-width: 1440px) {
    min-height: auto;
    background-size: 45%;
  }
  @media only screen and (max-width: 1024px) {
    background-size: 35%;
  }
  @media only screen and (max-width: 999px) {
    background: transparent;
    background-image: none;
    min-height: auto;
  }
`;

export const ContentWrapper = styled.div``;

export const Illustration = styled.div``;

export const BannerContent = styled.div`
  max-width: 38%;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 150px;
  @media only screen and (max-width: 1600px) {
    max-width: 38%;
  }
  @media only screen and (max-width: 1400px) {
    padding-top: 60px;
    padding-bottom: 100px;
  }
  @media only screen and (max-width: 1024px) {
    max-width: 44%;
  }
  @media only screen and (max-width: 999px) {
    max-width: 100%;
    padding-top: 30px;
    padding-bottom: 80px;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
  h1 {
    font-family: Imprima;
    font-size: 48px;
    line-height: 70px;
    font-weight: 700;
    color: ${themeGet('colors.menu', '#02073e')};
    margin-bottom: 24px;
    letter-spacing: -1px;
    margin-top: 0;
    @media only screen and (max-width: 1440px) {
      font-size: 40px;
      margin-bottom: 15px;
      line-height: 55px;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      font-size: 24px;
      line-height: 44px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 28px;
      margin-bottom: 20px;
    }

    @media only screen and (max-width: 768px) {
      font-size: 34px;
      margin-bottom: 10px;
      text-align: center;
    }
    @media only screen and (max-width: 480px) {
      font-size: 23px;
      margin-bottom: 20px;
      line-height: 40px;
    }
  }
  .banner-caption {
    color: ${themeGet('colors.paragraph', '#02073E')};
    font-size: 18px;
    line-height: 33px;
    font-weight: 400;
    margin-bottom: 0;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 1024px) {
      line-height: 33px;
    }
    @media only screen and (max-width: 768px) {
      margin-bottom: 30px;
      text-align: center;
    }
    @media only screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
  .banner-thanks {
    color: ${themeGet('colors.rapicGreen', '#02073E')};
    font-size: 18px;
    line-height: 33px;
    font-weight: 400;
    margin-bottom: 0;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 1024px) {
      line-height: 33px;
    }
    @media only screen and (max-width: 768px) {
      margin-bottom: 30px;
      text-align: center;
    }
    @media only screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const Subscribe = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  @media only screen and (max-width: 1440px) {
    margin-top: 30px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 80%;
    margin: 0 auto;
  }
  @media only screen and (max-width: 480px) {
    max-width: 100%;
    margin: 0 auto;
    flex-direction: column;
  }

  @media only screen and (max-width: 480px) {
    align-items: center;
  }
  .reusecore__input {
    width: 100%;
  }
  .field-wrapper {
    margin-right: 15px;
    @media only screen and (max-width: 480px) {
      margin-right: 0px;
    }
    input {
      font-family: DM Sans;
      font-size: 16px;
      min-height: 60px;
      padding: 0 24px;
      border-radius: 8px;
      margin-bottom: 0.25em;
      ::placeholder {
        color: ${rgba('#02073E', 0.4)};
        opacity: 1; /* Firefox */
      }
      &:focus {
        border-color: #ff7b00;
      }

      @media only screen and (max-width: 1280px) {
        min-height: 50px;
      }
    }
  }
  button {
    max-width: 10em;
    border-radius: 8px;
    margin-top: 1em;

    @media only screen and (max-width: 480px) {
      margin-top: 15px;
    }
  }
  h3 {
    margin-top: 1em;
  }
`;

export const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  img {
    &:not(:last-child) {
      margin-right: 23px;
    }

    @media only screen and (max-width: 480px) {
      max-width: 27%;
    }
  }
`;

const EyeButton = styled.button`
  width: 43px;
  height: 40px;
  border: 0;
  padding: 0;
  margin: 0;
  top: 0;
  right: 0;
  position: absolute;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  > span {
    width: 12px;
    height: 12px;
    display: block;
    border: solid 1px ${themeGet('colors.textColor', '#484848')};
    border-radius: 75% 15%;
    transform: rotate(45deg);
    position: relative;

    &:before {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      left: 3px;
      top: 3px;
      position: absolute;
      border: solid 1px ${themeGet('colors.textColor', '#484848')};
    }
  }

  &.eye-closed {
    > span {
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 20px;
        left: calc(50% - 1px / 2);
        top: -4px;
        position: absolute;
        background-color: ${themeGet('colors.textColor', '#484848')};
        transform: rotate(-12deg);
      }
    }
  }
`;

export { EyeButton };

export default Section;
