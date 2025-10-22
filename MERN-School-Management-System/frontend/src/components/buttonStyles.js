import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #e63946;
    color: white;
    margin-left: 6px;
    &:hover {
      background-color: #f08080;
      border-color: #e74c3c;
      box-shadow: 0px 4px 10px rgba(255, 0, 0, 0.4);
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #222222;
    color: white;
    margin-left: 6px;
    &:hover {
      background-color: #3d3d3d;
      border-color: #3d3d3d;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #8b0000;
    color: white;
    &:hover {
      background-color: #e74c3c;
      border-color: #b22222;
      box-shadow: 0px 4px 10px rgba(255, 99, 71, 0.4);
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #1e3a8a;
    color: white;
    &:hover {
      background-color: #2563eb;
      border-color: #1d4ed8;
      box-shadow: 0px 4px 10px rgba(0, 119, 255, 0.4);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background-color: #6b21a8;
    color: white;
    &:hover {
      background-color: #9d4edd;
      border-color: #7e22ce;
      box-shadow: 0px 4px 10px rgba(160, 32, 240, 0.4);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background-color: #a78bfa;
    color: white;
    &:hover {
      background-color: #c084fc;
      border-color: #8b5cf6;
      box-shadow: 0px 4px 10px rgba(138, 43, 226, 0.4);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #14532d;
    color: white;
    &:hover {
      background-color: #22c55e;
      border-color: #16a34a;
      box-shadow: 0px 4px 10px rgba(34, 197, 94, 0.4);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #4b2e1e;
    color: white;
    &:hover {
      background-color: #6f4e37;
      border-color: #4e342e;
      box-shadow: 0px 4px 10px rgba(150, 75, 0, 0.4);
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background-color: #4c51bf;
    color: white;
    &:hover {
      background-color: #5a67d8;
      border-color: #3c366b;
      box-shadow: 0px 4px 10px rgba(75, 0, 130, 0.4);
    }
  }
`;
