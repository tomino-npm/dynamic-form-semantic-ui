import { css } from '../common';

export const flexed = css`
  flex: auto !important;
  margin-right: 8px !important;
`;

export const compact = css`
  margin-bottom: 0px !important;
`;

export const caret = css`
  margin-right: -10px !important;
  padding-right: 0px !important;
`;

export const paneContent = css`
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  background-color: #ebfaff;
  height: 100%;
`;

export const propertyFields = css`
  .properties .menu {
    margin-bottom: 0px !important;
  }
  .properties input {
    padding: 6px !important;
  }
  .properties .fields {
    margin-bottom: 3px !important;
  }
`;

export const flexibleContent = css`
  display: flex;
  flex-direction: column;
`;

export const controlsMenu = css`
  .controls {
    overflow: auto;
    padding: 6px 12px 6px 12px;
    margin-top: 0px !important;
  }

  .controls .item {
    margin: 0px !important;
    padding: 0px !important;
  }

  .controls .item div div {
    transform: scale(0.8);
  }

  .controls .header.item {
    padding: 12px 0px 6px 0px !important;
  }
`;

export const editorPane = css`
  .grid {
    padding: 12px;
  }

  .grid .fields .field {
    border-right: dashed 1px #aaa !important;
    border-bottom: dashed 1px #aaa !important;
    border-top: dashed 1px #aaa !important;
    padding: 0px !important;
  }

  .grid .fields .field:first-child {
    border-left: dashed 1px #aaa !important;
  }
`;

export const editorGrid = css`
  .grid .Resizer {
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .grid .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .grid .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .grid .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .grid .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .grid .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .grid .Resizer.disabled {
    cursor: not-allowed;
  }
  .grid .Resizer.disabled:hover {
    border-color: transparent;
  }
`;

export const propertyLabel = css`
  .property {
    text-align: right;
  }

  .property label {
    margin-top: 6px !important;
  }
`;

export const searchItem = css`
  width: 100%;
`;
