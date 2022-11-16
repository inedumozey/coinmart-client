import { style } from "@mui/system";
import styled, { createGlobalStyle, css } from "styled-components";

const ScrollBar = () => css`
  &::-webkit-scrollbar-thumb {
    background-color: #e5e3e3;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
    background-color: #F0F4F5;
  }
  &::-webkit-scrollbar-corner {
    background-color: #00415D30;
  }
  &::-webkit-scrollbar {
    width: .7rem;
    height: .7rem;
  }
  & {
    -ms-overflow-style: auto;
    scrollbar-color:#00415D30;
    scrollbar-width: thin;
  }
`

const GlobalStyle = createGlobalStyle`
    :root{
        --blue: #007bff;
        --blue-deep: #6861ce;
        --purple: #6f42c1;
        --pink: #e83e8c;
        --red: #dc3545;
        --orange: #fd7e14;
        --yellow: #E6922E;
        --green: #28a745;
        --teal: #20c997;
        --cyan: #17a2b8;
        --white: #fff;
        --gray: #6c757d;
        --gray-dark: #343a40;
        --gray-light: #bdbdbd40;
        --gray-pale: #f7f7f7;
        --text: #000000bf;
        --primary: #007bff;
        --secondary: #6c757d;
        --success: #28a745;
        --info: #17a2b8;
        --warning: #ffc107;
        --danger: #dc3545;
        --light: #f8f9fa;
        --dark: #343a40;
        --breakpoint-xs: 0;
        --breakpoint-sm: 576px;
        --breakpoint-md: 768px;
        --breakpoint-lg: 992px;
        --breakpoint-xl: 1200px;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
    
    body{
        transition: background .3s ease-in;
        position: relative;
        min-height: 100vh;
        min-height: auto;
        overflow-x: hidden;
        color: #000000bf;
        font-size: .9rem;
        

        .bs-container {
          padding: 0;
          margin: 0;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
    

        ${ScrollBar()}

        .swiper-button-next, .swiper-button-prev {
            color: var(--major-cclicked={clicked} index={index} isActive={isActive}olor-purest);
        };

        a {
            color: inherit;
            text-decoration: none;

            &:hover {
                opacity:.6
            }
        };
        
        .link {
            padding: 0;
            border: none;
            color: #fff;
        }

        .active-icon{
            border: 2px solid var(--bright-color)
        }
    }
`

export {
  GlobalStyle,
  ScrollBar,
};